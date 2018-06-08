import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import BooksGrid from './BooksGrid';
import { ToastContainer } from 'react-toastify';
import * as BooksAPI from '../utils/BooksAPI';
import * as Utils from '../utils/Utils';

class BookSearch extends React.Component {
  static propTypes = {
    query: PropTypes.string,
    getBookShelf: PropTypes.func.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  state = {
    query: '',
    books: []
  };

  /**
   * Callback function to load books when component
   * is inserted into the DOM.
   */
  componentDidMount() {
    const initialQuery = this.props.query;
    if (initialQuery) this.updateQuery(initialQuery);
  }

  /**
   * Update component's state and perform book search
   *
   * @param {string} query - query string
   */
  updateQuery = query => {
    this.setState({ query });
    this.searchBook(query.trim());
  };

  /**
   * Search books based on the query string and update component's
   * state accordingly.
   *
   * @param {string} query - Search term that will be used as a query.
   */
  searchBook = Utils.debounce(query => {
    if (query) {
      BooksAPI.search(query).then(result => {
        if (result && !result.error) {
          let booksWithShelves = result.map(book => {
            book.shelf = this.props.getBookShelf(book.id);
            return book;
          });
          this.setState({ books: booksWithShelves });
        } else {
          this.setState({ books: [] });
        }
      });
    } else {
      this.setState({ books: [] });
    }
  }, 1000);

  render() {
    const { query, books } = this.state;

    return (
      <div className="container">
        <Header />
        <main>
          <div className="search-books">
            <div className="search-books-bar">
              <input
                type="search"
                name="query"
                placeholder="Search by title or author"
                value={query}
                onChange={event => {
                  this.updateQuery(event.target.value);
                }}
              />
            </div>
            <div className="search-books-results">
              {query &&
                (books.length === 0 ? (
                  <p>
                    No results found for <em>"{query}"</em>
                  </p>
                ) : (
                  <p>
                    Showing {books.length} books for <em>"{query}"</em>
                  </p>
                ))}
              <BooksGrid
                books={books}
                onChangeShelf={this.props.onChangeShelf}
              />
            </div>
          </div>
        </main>
        <ToastContainer />
      </div>
    );
  }
}

export default BookSearch;
