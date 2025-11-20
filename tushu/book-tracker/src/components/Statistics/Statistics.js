import React, { useState, useEffect } from 'react';
import bookService from '../../services/bookService';
import './Statistics.css';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = () => {
    const statistics = bookService.getStatistics();
    setStats(statistics);
    
    const allBooks = bookService.getBooks();
    setBooks(allBooks);
  };

  if (!stats) {
    return <div>Loading...</div>;
  }

  const getGenreStats = () => {
    const genreCounts = {};
    books.forEach(book => {
      if (book.genre) {
        genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
      }
    });
    return Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);
  };

  const getReadingStreak = () => {
    const readingBooks = books.filter(b => b.status === 'reading');
    if (readingBooks.length === 0) return 0;
    
    const today = new Date();
    const lastRead = new Date(Math.max(...readingBooks.map(b => new Date(b.lastRead || 0))));
    const daysDiff = Math.floor((today - lastRead) / (1000 * 60 * 60 * 24));
    
    return daysDiff === 0 ? 'Today' : `${daysDiff} days ago`;
  };

  const getMonthlyProgress = () => {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    const monthlyBooks = books.filter(book => {
      if (book.status === 'completed' && book.lastRead) {
        const bookDate = new Date(book.lastRead);
        return bookDate.getMonth() === thisMonth && bookDate.getFullYear() === thisYear;
      }
      return false;
    });
    
    return monthlyBooks.length;
  };

  return (
    <div className="statistics-container">
      <h1>Reading Statistics</h1>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalBooks}</div>
            <div className="stat-label">Total Books</div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.completedBooks}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">📖</div>
          <div className="stat-content">
            <div className="stat-number">{stats.readingBooks}</div>
            <div className="stat-label">Currently Reading</div>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <div className="stat-number">{stats.toReadBooks}</div>
            <div className="stat-label">To Read</div>
          </div>
        </div>
      </div>

      <div className="detailed-stats">
        <div className="stat-section">
          <h2>📊 Reading Progress</h2>
          <div className="progress-stats">
            <div className="progress-item">
              <span className="progress-label">Total Pages Read</span>
              <span className="progress-value">{stats.readPages.toLocaleString()}</span>
            </div>
            <div className="progress-item">
              <span className="progress-label">Total Pages in Library</span>
              <span className="progress-value">{stats.totalPages.toLocaleString()}</span>
            </div>
            <div className="progress-item">
              <span className="progress-label">Completion Rate</span>
              <span className="progress-value">{stats.completionRate}%</span>
            </div>
            <div className="progress-item">
              <span className="progress-label">Books This Month</span>
              <span className="progress-value">{getMonthlyProgress()}</span>
            </div>
            <div className="progress-item">
              <span className="progress-label">Last Read</span>
              <span className="progress-value">{getReadingStreak()}</span>
            </div>
          </div>
        </div>

        <div className="stat-section">
          <h2>🏷️ Genres Distribution</h2>
          <div className="genre-stats">
            {getGenreStats().length > 0 ? (
              getGenreStats().map(([genre, count]) => (
                <div key={genre} className="genre-item">
                  <span className="genre-name">{genre}</span>
                  <div className="genre-bar">
                    <div 
                      className="genre-fill" 
                      style={{ width: `${(count / stats.totalBooks) * 100}%` }}
                    ></div>
                  </div>
                  <span className="genre-count">{count}</span>
                </div>
              ))
            ) : (
              <p className="no-data">No genre data available</p>
            )}
          </div>
        </div>

        <div className="stat-section">
          <h2>🏆 Achievements</h2>
          <div className="achievements">
            <div className={`achievement ${stats.completedBooks >= 1 ? 'unlocked' : ''}`}>
              <span className="achievement-icon">🎯</span>
              <span className="achievement-name">First Book</span>
              <span className="achievement-desc">Complete your first book</span>
            </div>
            <div className={`achievement ${stats.completedBooks >= 5 ? 'unlocked' : ''}`}>
              <span className="achievement-icon">📚</span>
              <span className="achievement-name">Bookworm</span>
              <span className="achievement-desc">Complete 5 books</span>
            </div>
            <div className={`achievement ${stats.completedBooks >= 10 ? 'unlocked' : ''}`}>
              <span className="achievement-icon">🌟</span>
              <span className="achievement-name">Scholar</span>
              <span className="achievement-desc">Complete 10 books</span>
            </div>
            <div className={`achievement ${stats.readPages >= 1000 ? 'unlocked' : ''}`}>
              <span className="achievement-icon">📖</span>
              <span className="achievement-name">Page Turner</span>
              <span className="achievement-desc">Read 1000 pages</span>
            </div>
            <div className={`achievement ${getGenreStats().length >= 5 ? 'unlocked' : ''}`}>
              <span className="achievement-icon">🎨</span>
              <span className="achievement-name">Diverse Reader</span>
              <span className="achievement-desc">Read 5 different genres</span>
            </div>
            <div className={`achievement ${stats.completionRate >= 50 ? 'unlocked' : ''}`}>
              <span className="achievement-icon">💪</span>
              <span className="achievement-name">Committed</span>
              <span className="achievement-desc">50% completion rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
