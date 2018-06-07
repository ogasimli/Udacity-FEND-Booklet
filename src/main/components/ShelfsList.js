import React from "react";
import Header from "./Header";
import BookShelf from "./BookShelf";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { shelves } from "../utils/Constants";

/**
 * Stateless component that represents the grid of books.
 */
function ShelfsList(props) {
  const { books, onChangeShelf } = props;

  /**
   * Function returns books belonging to a particular shelf
   *
   * @param {Object} shelf - shelf object that is required to filter books
   * @param {array} books - books list that should be filtered out
   * @returns {array}
   */
  const shelfsBooks = (shelf, books) =>
    books.filter(book => book.shelf === shelf.id);

  return (
    <div className="container">
      <Header />
      <main>
        <div className="list-books-content">
          {shelves.map(shelf => (
            <div key={shelf.id}>
              <BookShelf
                shelf={shelf}
                books={shelfsBooks(shelf, books)}
                onChangeShelf={onChangeShelf}
              />
            </div>
          ))}
          <div className="open-search">
            <Link to={"/search"}>Add a book</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

ShelfsList.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

export default ShelfsList;
