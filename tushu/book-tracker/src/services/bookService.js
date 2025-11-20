// Book Management Service
class BookService {
  constructor() {
    this.BOOKS_KEY = 'mybooks_library';
    this.NOTES_KEY = 'mybooks_notes';
    this.READING_HISTORY_KEY = 'mybooks_history';
    this.THEME_KEY = 'mybooks_theme';
    this.initializeDefaultData();
  }

  initializeDefaultData() {
    if (!localStorage.getItem(this.BOOKS_KEY)) {
      const defaultBooks = [
        {
          id: 1,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          cover: "",
          totalPages: 240,
          currentPage: 96,
          progress: 40,
          status: "reading",
          genre: "Classic",
          addedDate: new Date().toISOString(),
          lastRead: new Date().toISOString(),
          description: "A novel set in the Jazz Age that tells the story of the mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan.",
          rating: 0,
          color: "#2C5F7C"
        },
        {
          id: 2,
          title: "Pride and Prejudice",
          author: "Jane Austen",
          cover: "",
          totalPages: 432,
          currentPage: 432,
          progress: 100,
          status: "completed",
          genre: "Romance",
          addedDate: new Date().toISOString(),
          lastRead: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          description: "The romantic clash between the opinionated Elizabeth and her proud beau, Mr. Darcy.",
          rating: 5,
          color: "#7B4B94"
        },
        {
          id: 3,
          title: "1984",
          author: "George Orwell",
          cover: "",
          totalPages: 328,
          currentPage: 0,
          progress: 0,
          status: "toRead",
          genre: "Dystopian",
          addedDate: new Date().toISOString(),
          description: "A dystopian social science fiction novel and cautionary tale.",
          rating: 0,
          color: "#D35545"
        },
        {
          id: 4,
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          cover: "",
          totalPages: 310,
          currentPage: 155,
          progress: 50,
          status: "reading",
          genre: "Fantasy",
          addedDate: new Date().toISOString(),
          lastRead: new Date().toISOString(),
          description: "Bilbo Baggins' adventure with a group of dwarves to reclaim their mountain home.",
          rating: 0,
          color: "#4A7C59"
        },
        {
          id: 5,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          cover: "",
          totalPages: 324,
          currentPage: 0,
          progress: 0,
          status: "toRead",
          genre: "Classic",
          addedDate: new Date().toISOString(),
          description: "The story of racial injustice and childhood innocence.",
          rating: 0,
          color: "#8B6F47"
        },
        {
          id: 6,
          title: "The Catcher in the Rye",
          author: "J.D. Salinger",
          cover: "",
          totalPages: 277,
          currentPage: 0,
          progress: 0,
          status: "toRead",
          genre: "Classic",
          addedDate: new Date().toISOString(),
          description: "The experiences of a teenager expelled from prep school.",
          rating: 0,
          color: "#5D5D5D"
        },
        {
          id: 7,
          title: "Moby Dick",
          author: "Herman Melville",
          cover: "",
          totalPages: 635,
          currentPage: 0,
          progress: 0,
          status: "toRead",
          genre: "Adventure",
          addedDate: new Date().toISOString(),
          description: "The narrative of Captain Ahab's obsessive quest to kill the white whale.",
          rating: 0,
          color: "#4B6584"
        },
        {
          id: 8,
          title: "The Odyssey",
          author: "Homer",
          cover: "",
          totalPages: 541,
          currentPage: 0,
          progress: 0,
          status: "toRead",
          genre: "Epic",
          addedDate: new Date().toISOString(),
          description: "Odysseus' ten-year struggle to return home after the Trojan War.",
          rating: 0,
          color: "#6B5B73"
        },
        {
          id: 9,
          title: "Winnie-the-Pooh",
          author: "A.A. Milne",
          cover: "",
          totalPages: 145,
          currentPage: 145,
          progress: 100,
          status: "completed",
          genre: "Children",
          addedDate: new Date().toISOString(),
          lastRead: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          description: "The adventures of Pooh Bear and his friends in the Hundred Acre Wood.",
          rating: 4,
          color: "#E8B04B"
        }
      ];
      localStorage.setItem(this.BOOKS_KEY, JSON.stringify(defaultBooks));
    }

    if (!localStorage.getItem(this.NOTES_KEY)) {
      localStorage.setItem(this.NOTES_KEY, JSON.stringify({}));
    }

    if (!localStorage.getItem(this.READING_HISTORY_KEY)) {
      localStorage.setItem(this.READING_HISTORY_KEY, JSON.stringify([]));
    }
  }

  // Get all books
  getBooks() {
    const books = localStorage.getItem(this.BOOKS_KEY);
    return books ? JSON.parse(books) : [];
  }

  // Get single book
  getBook(id) {
    const books = this.getBooks();
    return books.find(book => book.id === parseInt(id));
  }

  // Add book
  addBook(book) {
    const books = this.getBooks();
    const newBook = {
      ...book,
      id: Date.now(),
      addedDate: new Date().toISOString(),
      currentPage: 0,
      progress: 0,
      status: 'toRead',
      rating: 0,
      color: this.getRandomColor()
    };
    books.push(newBook);
    localStorage.setItem(this.BOOKS_KEY, JSON.stringify(books));
    return newBook;
  }

  // Update book
  updateBook(id, updates) {
    const books = this.getBooks();
    const index = books.findIndex(book => book.id === parseInt(id));
    if (index !== -1) {
      // Calculate progress
      if (updates.currentPage !== undefined && books[index].totalPages) {
        updates.progress = Math.round((updates.currentPage / books[index].totalPages) * 100);
        
        // Update status
        if (updates.progress === 0) {
          updates.status = 'toRead';
        } else if (updates.progress === 100) {
          updates.status = 'completed';
        } else {
          updates.status = 'reading';
        }
        
        updates.lastRead = new Date().toISOString();
        
        // Add to reading history
        this.addToReadingHistory(id, updates.currentPage);
      }
      
      books[index] = { ...books[index], ...updates };
      localStorage.setItem(this.BOOKS_KEY, JSON.stringify(books));
      return books[index];
    }
    return null;
  }

  // Delete book
  deleteBook(id) {
    const books = this.getBooks();
    const filtered = books.filter(book => book.id !== parseInt(id));
    localStorage.setItem(this.BOOKS_KEY, JSON.stringify(filtered));
    
    // Also delete related notes
    const notes = this.getNotes(id);
    if (notes) {
      this.deleteNotes(id);
    }
    
    return true;
  }

  // Get notes
  getNotes(bookId) {
    const notes = localStorage.getItem(this.NOTES_KEY);
    const allNotes = notes ? JSON.parse(notes) : {};
    return allNotes[bookId] || [];
  }

  // Add note
  addNote(bookId, note) {
    const notes = localStorage.getItem(this.NOTES_KEY);
    const allNotes = notes ? JSON.parse(notes) : {};
    
    if (!allNotes[bookId]) {
      allNotes[bookId] = [];
    }
    
    const newNote = {
      id: Date.now(),
      content: note,
      page: this.getBook(bookId)?.currentPage || 0,
      timestamp: new Date().toISOString()
    };
    
    allNotes[bookId].push(newNote);
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(allNotes));
    return newNote;
  }

  // Delete notes
  deleteNotes(bookId) {
    const notes = localStorage.getItem(this.NOTES_KEY);
    const allNotes = notes ? JSON.parse(notes) : {};
    delete allNotes[bookId];
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(allNotes));
  }

  // Add to reading history
  addToReadingHistory(bookId, page) {
    const history = localStorage.getItem(this.READING_HISTORY_KEY);
    const allHistory = history ? JSON.parse(history) : [];
    
    allHistory.push({
      bookId,
      page,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 100 records
    if (allHistory.length > 100) {
      allHistory.shift();
    }
    
    localStorage.setItem(this.READING_HISTORY_KEY, JSON.stringify(allHistory));
  }

  // Get recommendations
  getRecommendations() {
    const books = this.getBooks();
    const history = localStorage.getItem(this.READING_HISTORY_KEY);
    const allHistory = history ? JSON.parse(history) : [];
    
    // Recommend based on reading history
    const readBookIds = [...new Set(allHistory.map(h => h.bookId))];
    const readBooks = books.filter(book => readBookIds.includes(book.id));
    
    // Get most read genres
    const genreCounts = {};
    readBooks.forEach(book => {
      if (book.genre) {
        genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
      }
    });
    
    const favoriteGenre = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a])[0];
    
    // Recommend unread books of same genre
    const recommendations = books.filter(book => 
      book.status === 'toRead' && 
      book.genre === favoriteGenre
    );
    
    // If no same genre, recommend any unread books
    if (recommendations.length === 0) {
      return books.filter(book => book.status === 'toRead').slice(0, 3);
    }
    
    return recommendations.slice(0, 3);
  }

  // Get statistics
  getStatistics() {
    const books = this.getBooks();
    const totalBooks = books.length;
    const completedBooks = books.filter(book => book.status === 'completed').length;
    const readingBooks = books.filter(book => book.status === 'reading').length;
    const toReadBooks = books.filter(book => book.status === 'toRead').length;
    
    const totalPages = books.reduce((sum, book) => sum + (book.totalPages || 0), 0);
    const readPages = books.reduce((sum, book) => sum + (book.currentPage || 0), 0);
    
    return {
      totalBooks,
      completedBooks,
      readingBooks,
      toReadBooks,
      totalPages,
      readPages,
      completionRate: totalBooks > 0 ? Math.round((completedBooks / totalBooks) * 100) : 0
    };
  }

  // Get random color
  getRandomColor() {
    const colors = [
      '#2C5F7C', // Deep Blue
      '#7B4B94', // Purple
      '#D35545', // Coral Red
      '#4A7C59', // Forest Green
      '#8B6F47', // Brown
      '#5D5D5D', // Gray
      '#4B6584', // Steel Blue
      '#6B5B73', // Mauve
      '#E8B04B', // Golden
      '#A8577E', // Rose
      '#557B83', // Teal
      '#C67F3B'  // Burnt Orange
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Theme management
  getTheme() {
    return localStorage.getItem(this.THEME_KEY) || 'light';
  }

  setTheme(theme) {
    localStorage.setItem(this.THEME_KEY, theme);
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
  }

  toggleTheme() {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    return newTheme;
  }
}

export default new BookService();
