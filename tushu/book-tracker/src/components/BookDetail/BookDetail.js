import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import bookService from '../../services/bookService';
import './BookDetail.css';

const BookDetail = ({ match, history }) => {
  const { id } = match.params;
  const [book, setBook] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [editingProgress, setEditingProgress] = useState(false);
  const [currentPageInput, setCurrentPageInput] = useState('');

  useEffect(() => {
    loadBookData();
  }, [id]);

  const loadBookData = () => {
    const bookData = bookService.getBook(id);
    if (bookData) {
      setBook(bookData);
      setCurrentPageInput(bookData.currentPage || 0);
      const bookNotes = bookService.getNotes(id);
      setNotes(bookNotes);
    } else {
      history.push('/');
    }
  };

  const handleBack = () => {
    history.push('/');
  };

  const handleUpdateProgress = () => {
    const newPage = parseInt(currentPageInput);
    if (newPage >= 0 && newPage <= book.totalPages) {
      const updatedBook = bookService.updateBook(id, { currentPage: newPage });
      setBook(updatedBook);
      setEditingProgress(false);
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note = bookService.addNote(id, newNote);
      setNotes([...notes, note]);
      setNewNote('');
      setShowNoteInput(false);
    }
  };

  const handleDeleteBook = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      bookService.deleteBook(id);
      history.push('/');
    }
  };

  const handleRatingChange = (rating) => {
    const updatedBook = bookService.updateBook(id, { rating });
    setBook(updatedBook);
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  const getBookCoverStyle = () => {
    return {
      backgroundColor: book.color || '#3498DB'
    };
  };

  return (
    <div className="book-detail-container">
      <div className="detail-header">
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>
        <h1>Book Details</h1>
        <button className="menu-btn">⋮</button>
      </div>

      <div className="book-detail-content">
        <div className="book-cover-large" style={getBookCoverStyle()}>
          <div className="book-spine-large"></div>
          <div className="book-title-large">{book.title}</div>
          <div className="book-author-large">{book.author}</div>
        </div>

        <div className="book-info-section">
          <h2 className="book-title-detail">{book.title}</h2>
          <p className="book-author-detail">{book.author}</p>
          
          <div className="rating-section">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= book.rating ? 'filled' : ''}`}
                onClick={() => handleRatingChange(star)}
              >
                {star <= book.rating ? '★' : '☆'}
              </span>
            ))}
          </div>

          <div className="progress-section">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${book.progress || 0}%` }}
              ></div>
            </div>
            <p className="progress-text">{book.progress || 0}% progress</p>
          </div>

          <div className="pages-section">
            {editingProgress ? (
              <div className="edit-progress">
                <input
                  type="number"
                  value={currentPageInput}
                  onChange={(e) => setCurrentPageInput(e.target.value)}
                  min="0"
                  max={book.totalPages}
                  className="page-input"
                />
                <span> / {book.totalPages} pages</span>
                <button onClick={handleUpdateProgress} className="save-btn">Save</button>
                <button onClick={() => setEditingProgress(false)} className="cancel-btn">Cancel</button>
              </div>
            ) : (
              <div onClick={() => setEditingProgress(true)} className="pages-display">
                Read {book.currentPage || 0} out of {book.totalPages || 0} pages
                <span className="edit-icon">✏️</span>
              </div>
            )}
          </div>

          {book.description && (
            <div className="description-section">
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>
          )}

          <div className="notes-section">
            <div className="notes-header">
              <h3>Notes</h3>
              <button 
                className="add-note-btn"
                onClick={() => setShowNoteInput(true)}
              >
                Write Notes
              </button>
            </div>

            {showNoteInput && (
              <div className="note-input-section">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Write your notes here..."
                  className="note-textarea"
                  rows="4"
                />
                <div className="note-actions">
                  <button onClick={handleAddNote} className="save-note-btn">Save</button>
                  <button onClick={() => {
                    setShowNoteInput(false);
                    setNewNote('');
                  }} className="cancel-note-btn">Cancel</button>
                </div>
              </div>
            )}

            <div className="notes-list">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <div key={note.id} className="note-item">
                    <p className="note-content">{note.content}</p>
                    <div className="note-meta">
                      <span>Page {note.page}</span>
                      <span>{new Date(note.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-notes">No notes yet</p>
              )}
            </div>
          </div>

          <div className="book-actions">
            <button className="edit-book-btn">Edit Book</button>
            <button className="delete-book-btn" onClick={handleDeleteBook}>Delete Book</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(BookDetail);
