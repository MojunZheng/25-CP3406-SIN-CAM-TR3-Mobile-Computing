import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../assets/booknest-logo.png';
import './TopNavbar.css';

const TopNavbar = ({ theme, onThemeToggle, location }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="top-navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button 
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="BookNest" className="navbar-logo" />
          </Link>
        </div>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            Library
          </Link>
          <Link to="/add-book" className={`nav-link ${isActive('/add-book')}`}>
            Add Book
          </Link>
          <Link to="/recommendations" className={`nav-link ${isActive('/recommendations')}`}>
            Recommendations
          </Link>
          <Link to="/statistics" className={`nav-link ${isActive('/statistics')}`}>
            Statistics
          </Link>
        </div>

        <div className="navbar-right">
          <button 
            className="theme-toggle"
            onClick={onThemeToggle}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(TopNavbar);