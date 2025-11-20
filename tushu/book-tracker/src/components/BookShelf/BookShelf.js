import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import bookService from '../../services/bookService';
import './BookShelf.css';

const BookShelf = ({ history }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    const allBooks = bookService.getBooks();
    setBooks(allBooks);
  };

  const handleBookClick = (bookId) => {
    history.push(`/book/${bookId}`);
  };

  const handleAddBook = () => {
    history.push('/add-book');
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || book.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getBookCoverStyle = (book) => {
    return {
      backgroundColor: book.color || '#3498DB'
    };
  };

  return (
    <div className="bookshelf-container">
      <div className="bookshelf-header">
        <h1>My Library</h1>
        <div className="header-controls">
          <input
            type="text"
            placeholder="Search books..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Books</option>
            <option value="reading">Currently Reading</option>
            <option value="completed">Completed</option>
            <option value="toRead">To Read</option>
          </select>
          <button className="add-book-btn" onClick={handleAddBook}>
            <span className="plus-icon">+</span>
          </button>
        </div>
      </div>

      <div className="books-grid">
        {filteredBooks.map(book => (
          <div 
            key={book.id} 
            className={`book-card ${book.status}`}
            onClick={() => handleBookClick(book.id)}
          >
            <div className="book-cover" style={getBookCoverStyle(book)}>
              <div className="book-spine"></div>
              <div className="book-title-cover">{book.title}</div>
              <div className="book-author-cover">{book.author}</div>
              {book.status === 'reading' && (
                <div className="progress-badge">{book.progress}%</div>
              )}
              {book.status === 'completed' && (
                <div className="completed-badge">✓</div>
              )}
            </div>
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              {book.rating > 0 && (
                <div className="book-rating">
                  {'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="empty-state">
          <p>No books found</p>
          <button className="add-first-book-btn" onClick={handleAddBook}>
            Add your first book
          </button>
        </div>
      )}
    </div>
  );
};

export default withRouter(BookShelf);
