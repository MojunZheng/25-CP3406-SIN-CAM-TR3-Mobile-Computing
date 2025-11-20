// Local Storage Service - Replace backend API
class LocalStorageService {
  constructor() {
    this.BOOKS_KEY = 'booktracker_books';
    this.WISHLIST_KEY = 'booktracker_wishlist';
    this.USER_KEY = 'booktracker_user';
    this.initializeDefaultData();
  }

  initializeDefaultData() {
    // Initialize default data
    if (!localStorage.getItem(this.BOOKS_KEY)) {
      const defaultBooks = [
        {
          id: 1,
          title: "Sample Book 1",
          author: "Author 1",
          description: "This is a sample book",
          status: "reading",
          progress: 45,
          coverImage: "https://via.placeholder.com/150"
        },
        {
          id: 2,
          title: "Sample Book 2",
          author: "Author 2",
          description: "This is another sample book",
          status: "completed",
          progress: 100,
          coverImage: "https://via.placeholder.com/150"
        }
      ];
      localStorage.setItem(this.BOOKS_KEY, JSON.stringify(defaultBooks));
    }

    if (!localStorage.getItem(this.WISHLIST_KEY)) {
      localStorage.setItem(this.WISHLIST_KEY, JSON.stringify([]));
    }
  }

  // User related
  login(username, password) {
    // Simple local login (no password validation)
    const user = { username, id: Date.now() };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    return user;
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);
  }

  getCurrentUser() {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Book related
  getBooks() {
    const books = localStorage.getItem(this.BOOKS_KEY);
    return books ? JSON.parse(books) : [];
  }

  addBook(book) {
    const books = this.getBooks();
    const newBook = {
      ...book,
      id: Date.now(),
      addedDate: new Date().toISOString()
    };
    books.push(newBook);
    localStorage.setItem(this.BOOKS_KEY, JSON.stringify(books));
    return newBook;
  }

  updateBook(id, updates) {
    const books = this.getBooks();
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
      books[index] = { ...books[index], ...updates };
      localStorage.setItem(this.BOOKS_KEY, JSON.stringify(books));
      return books[index];
    }
    return null;
  }

  deleteBook(id) {
    const books = this.getBooks();
    const filtered = books.filter(book => book.id !== id);
    localStorage.setItem(this.BOOKS_KEY, JSON.stringify(filtered));
    return true;
  }

  // Wishlist related
  getWishlist() {
    const wishlist = localStorage.getItem(this.WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
  }

  addToWishlist(book) {
    const wishlist = this.getWishlist();
    const newItem = {
      ...book,
      id: Date.now(),
      addedDate: new Date().toISOString()
    };
    wishlist.push(newItem);
    localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(wishlist));
    return newItem;
  }

  removeFromWishlist(id) {
    const wishlist = this.getWishlist();
    const filtered = wishlist.filter(item => item.id !== id);
    localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(filtered));
    return true;
  }
}

export default new LocalStorageService();
