import React, { Component } from "react";
import { Route } from "react-router-dom";
import ShelfsList from "./ShelfsList";
import BookSearch from "./BookSearch";
import BookDetails from "./BookDetails";
import { shelves } from "../utils/Constants";
import * as BooksAPI from "../utils/BooksAPI";
import "../../res/styles/App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class BooksApp extends Component {
  state = {
    books: []
  };

  /**
   * Callback function to load books when component
   * is inserted into the DOM.
   */
  componentDidMount = () => {
    this.getAllBooks();
  };

  /**
   * Fetch all user books from API
   */
  getAllBooks = () => BooksAPI.getAll().then(books => this.setState({ books }));

  /**
   * Update book's shelf and then update the local books array
   *
   * @param {Object} book - book that should be manipulated
   * @param {String} shelfId - id of the shelf, into which book should be moved
   */
  updateBookShelf = (book, shelfId) => {
    BooksAPI.update(book, shelfId).then(res => {
      this.updateBookList(book, shelfId);
    });
  };

  /**
   * Update, add or remove book from the local books array
   * depending on the selected shelf
   *
   * @param {Object} book - book that should be manipulated
   * @param {String} shelfId - id of the shelf, into which book should be moved
   */
  updateBookList = (book, shelfId) => {
    const books = this.state.books;
    const booksIndex = this.getBooksIndex(book);
    book.shelf = shelfId;
    let messageBody = "Problem occured";

    // If book found
    if (booksIndex !== -1) {
      // If shelf is none
      if (shelfId === "none") {
        messageBody = "removed from shelves";
        // Remove book from array
        books.splice(booksIndex, 1);
      } else {
        messageBody = "moved to";
        // Update book in the array
        books[booksIndex] = book;
      }
    } else {
      if (shelfId !== "none") {
        // If book not found and shelf is not equal to none
        messageBody = "added to";
        // Add book to the array
        books.push(book);
      } else {
        // If book not found and shelf is equal to none
        messageBody = "was not in your books shelf";
      }
    }

    this.setState({ books });
    this.showToast(book, messageBody, shelfId);
  };

  /**
   * Show toast message
   *
   * @param {Object} book - the book object
   * @param {String} messageBody - the main message body
   * @param {String} shelfId - id of the book's shelf
   */
  showToast = (book, messageBody, shelfId) => {
    let title = book.title ? book.title : "Unknown";
    let author = book.authors ? `by ${book.authors[0]}` : "";
    let shelf = this.getShelfNameById(shelfId);
    if (shelf) shelf += " shelf";
    toast(
      <this.ToastMsg
        title={title}
        author={author}
        messageBody={messageBody}
        shelf={shelf}
      />,
      {
        position: toast.POSITION.BOTTOM_CENTER
      }
    );
  };

  /**
   * Toast message to be displayed to the user
   */
  ToastMsg = ({ title, author, messageBody, shelf }) => (
    <div className="toast-message">
      {messageBody === "Problem occured" ? (
        <div>messageBody</div>
      ) : (
        <div>
          <span className="toast-book-title">'{title}'</span>{" "}
          <span className="toast-book-author">{author}</span> {messageBody}{" "}
          <span className="toast-book-shelf">{shelf}</span>
        </div>
      )}
    </div>
  );

  /**
   * Find book instance from array based on its ID
   *
   * @param {Object} book - the book that that is searched for
   * @returns {Number}
   */
  getBooksIndex = book => this.state.books.indexOf(book);

  /**
   * Find book instance from local array or
   * fetch it from API based on its ID
   *
   * @param {String} id - id of the book
   * @returns {Object}
   */
  getBookById = id => {
    let book = this.state.books.find(book => book.id === id);
    if (book) {
      return Promise.resolve(book);
    } else {
      return BooksAPI.get(id);
    }
  };

  /**
   * Obtains the shelf name to which a certain book belongs to.
   *
   * @param {string} bookId - id of the selected book.
   * @returns {Event} string
   */
  getBookShelf = bookId => {
    let foundBook = this.state.books.find(book => book.id === bookId);
    return foundBook ? foundBook.shelf : "none";
  };

  /**
   * Get shlef name by its id
   *
   * @param {string} shelfId - id of the shelf
   * @returns {Event} string
   */
  getShelfNameById = shelfId => {
    let shelf = shelves.find(shelf => shelf.id === shelfId);
    return shelf ? shelf.title : "";
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ShelfsList
              books={this.state.books}
              onChangeShelf={this.updateBookShelf}
            />
          )}
        />

        <Route
          path="/search/:query?"
          render={({ match }) => (
            <BookSearch
              query={match.params.query}
              getBookShelf={this.getBookShelf}
              onChangeShelf={this.updateBookShelf}
            />
          )}
        />

        <Route
          path="/details/:bookId"
          render={props => (
            <BookDetails
              bookId={props.match.params.bookId}
              getBookById={this.getBookById}
              onChangeShelf={this.updateBookShelf}
            />
          )}
        />

        <ToastContainer />
      </div>
    );
  }
}

export default BooksApp;
