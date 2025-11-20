import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import bookService from '../../services/bookService';
import './Recommendations.css';

const Recommendations = ({ history }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = () => {
    const books = bookService.getBooks();
    setAllBooks(books);
    
    const recommended = bookService.getRecommendations();
    setRecommendations(recommended);
  };

  const handleBookClick = (bookId) => {
    history.push(`/book/${bookId}`);
  };

  const getBooksByStatus = (status) => {
    return allBooks.filter(book => book.status === status);
  };

  const getBookCoverStyle = (book) => {
    return {
      backgroundColor: book.color || '#3498DB'
    };
  };

  return (
    <div className="recommendations-container">
      <h1>Recommendations</h1>

      <section className="recommendations-section">
        <h2>📚 Based on Your Reading History</h2>
        {recommendations.length > 0 ? (
          <div className="books-row">
            {recommendations.map(book => (
              <div 
                key={book.id} 
                className="recommendation-card"
                onClick={() => handleBookClick(book.id)}
              >
                <div className="book-cover-small" style={getBookCoverStyle(book)}>
                  <div className="book-title-small">{book.title}</div>
                </div>
                <div className="book-info-small">
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>
                  {book.genre && <span className="genre-tag">{book.genre}</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-recommendations">Start reading books to get personalized recommendations!</p>
        )}
      </section>

      <section className="recommendations-section">
        <h2>🔥 Continue Reading</h2>
        {getBooksByStatus('reading').length > 0 ? (
          <div className="books-row">
            {getBooksByStatus('reading').map(book => (
              <div 
                key={book.id} 
                className="recommendation-card"
                onClick={() => handleBookClick(book.id)}
              >
                <div className="book-cover-small" style={getBookCoverStyle(book)}>
                  {(!book.cover || !book.cover.startsWith('http')) && (
                    <>
                      <div className="book-title-small">{book.title}</div>
                    </>
                  )}
                  <div className="progress-overlay">{book.progress}%</div>
                </div>
                <div className="book-info-small">
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>
                  <div className="mini-progress-bar">
                    <div className="mini-progress-fill" style={{ width: `${book.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-recommendations">No books in progress</p>
        )}
      </section>

      <section className="recommendations-section">
        <h2>⭐ Top Rated Books</h2>
        {allBooks.filter(book => book.rating >= 4).length > 0 ? (
          <div className="books-row">
            {allBooks.filter(book => book.rating >= 4).map(book => (
              <div 
                key={book.id} 
                className="recommendation-card"
                onClick={() => handleBookClick(book.id)}
              >
                <div className="book-cover-small" style={getBookCoverStyle(book)}>
                  <div className="book-title-small">{book.title}</div>
                </div>
                <div className="book-info-small">
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>
                  <div className="rating-small">
                    {'★'.repeat(book.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-recommendations">Rate your books to see top picks here</p>
        )}
      </section>

      <section className="recommendations-section">
        <h2>📖 Your Reading List</h2>
        {getBooksByStatus('toRead').length > 0 ? (
          <div className="books-row">
            {getBooksByStatus('toRead').slice(0, 5).map(book => (
              <div 
                key={book.id} 
                className="recommendation-card"
                onClick={() => handleBookClick(book.id)}
              >
                <div className="book-cover-small" style={getBookCoverStyle(book)}>
                  <div className="book-title-small">{book.title}</div>
                </div>
                <div className="book-info-small">
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>
                  {book.genre && <span className="genre-tag">{book.genre}</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-recommendations">Add books to your reading list</p>
        )}
      </section>
    </div>
  );
};

export default withRouter(Recommendations);
