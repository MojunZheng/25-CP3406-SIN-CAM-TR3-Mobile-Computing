import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import bookService from '../../services/bookService';
import './AddBook.css';

const AddBook = ({ history }) => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    totalPages: '',
    genre: '',
    description: '',
    cover: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!bookData.title || !bookData.author) {
      alert('Please enter at least title and author');
      return;
    }

    const newBook = {
      ...bookData,
      totalPages: parseInt(bookData.totalPages) || 0
    };

    const addedBook = bookService.addBook(newBook);
    history.push(`/book/${addedBook.id}`);
  };

  const handleCancel = () => {
    history.push('/');
  };

  return (
    <div className="add-book-container">
      <div className="add-book-header">
        <button className="back-btn" onClick={handleCancel}>
          ← Back
        </button>
        <h1>Add New Book</h1>
      </div>

      <form className="add-book-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="totalPages">Total Pages</label>
            <input
              type="number"
              id="totalPages"
              name="totalPages"
              value={bookData.totalPages}
              onChange={handleChange}
              placeholder="Number of pages"
              min="1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              name="genre"
              value={bookData.genre}
              onChange={handleChange}
            >
              <option value="">Select genre</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Biography">Biography</option>
              <option value="History">History</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Classic">Classic</option>
              <option value="Thriller">Thriller</option>
              <option value="Horror">Horror</option>
              <option value="Poetry">Poetry</option>
              <option value="Children">Children</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="cover">Cover Image URL</label>
          <input
            type="url"
            id="cover"
            name="cover"
            value={bookData.cover}
            onChange={handleChange}
            placeholder="https://example.com/book-cover.jpg"
          />
          <small>Leave empty for auto-generated cover</small>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={bookData.description}
            onChange={handleChange}
            placeholder="Enter book description..."
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(AddBook);
