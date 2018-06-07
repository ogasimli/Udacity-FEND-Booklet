import React, { Component } from "react";
import { Route } from "react-router-dom";
import ShelfsList from "./ShelfsList";
import BookSearch from "./BookSearch";
import BookDetails from "./BookDetails";
import * as BooksAPI from "../utils/BooksAPI";
import "../../res/styles/App.css";

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
   * @param {String} shelf - id of the shelf, into which book should be moved
   */
  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      this.updateBookList(book, shelf);
    });
  };

  /**
   * Update, add or remove book from the local books array
   * depending on the selected shelf
   *
   * @param {Object} book - book that should be manipulated
   * @param {String} shelf - id of the shelf, into which book should be moved
   */
  updateBookList = (book, shelf) => {
    const books = this.state.books;
    const booksIndex = this.getBooksIndex(book);
    book.shelf = shelf;

    // If book found
    if (booksIndex !== -1) {
      // If shelf is none
      if (shelf === "none") {
        console.log(
          `"${book.title}" with id "${book.id}" removed from shelves`
        );
        // Remove book from array
        books.splice(booksIndex, 1);
      } else {
        console.log(`"${book.title}" "${book.id}" moved to shelf "${shelf}"`);
        // Update book in the array
        books[booksIndex] = book;
      }
    } else if (shelf !== "none") {
      // If book not found and shelf is not equal to none
      console.log(`"${book.title}" "${book.id}" added to shelf "${shelf}"`);
      // Add book to the array
      books.push(book);
    }

    this.setState({ books });
  };

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
   * @param {string} bookId
   * @returns {Event} string - Name of the shelf for the selected book.
   */
  getBookShelf = bookId => {
    let foundBook = this.state.books.find(book => book.id === bookId);
    return foundBook ? foundBook.shelf : "none";
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
      </div>
    );
  }
}

export default BooksApp;
