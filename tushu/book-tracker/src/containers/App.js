import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import bookService from "../services/bookService";
import "./App.css";

import TopNavbar from "../components/TopNavbar/TopNavbar";
import BookShelf from "../components/BookShelf/BookShelf";
import BookDetail from "../components/BookDetail/BookDetail";
import AddBook from "../components/AddBook/AddBook";
import Recommendations from "../components/Recommendations/Recommendations";
import Statistics from "../components/Statistics/Statistics";

const App = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Initialize theme
    const savedTheme = bookService.getTheme();
    setTheme(savedTheme);
    document.body.className = savedTheme === 'dark' ? 'dark-mode' : '';
  }, []);

  const handleThemeToggle = () => {
    const newTheme = bookService.toggleTheme();
    setTheme(newTheme);
  };

  return (
    <div className="app">
      <TopNavbar theme={theme} onThemeToggle={handleThemeToggle} />
      <main className="main-content">
        <Switch>
          <Route path="/" exact component={BookShelf} />
          <Route path="/book/:id" component={BookDetail} />
          <Route path="/add-book" component={AddBook} />
          <Route path="/recommendations" component={Recommendations} />
          <Route path="/statistics" component={Statistics} />
        </Switch>
      </main>
    </div>
  );
};

export default withRouter(App);
