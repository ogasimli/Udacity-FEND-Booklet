import React from "react";
import BookShelf from "./BookShelf";
import PropTypes from "prop-types";

/**
 * Stateless component that represents the grid of books.
 */
function ShelfsList(props) {
  const { books } = props;

  /**
   * Shelves object that holds id and names of our shelf categories
   */
  const shelves = [
    { id: "currentlyReading", title: "Currently Reading" },
    { id: "wantToRead", title: "Want to Read" },
    { id: "read", title: "Read" }
  ];

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
    <div className="list-books">
      <div className="list-books-title">
        <h1>Booklet</h1>
      </div>
      <div className="list-books-content">
        {shelves.map(shelf => (
          <div key={shelf.id}>
            <BookShelf shelf={shelf} books={shelfsBooks(shelf, books)} />
          </div>
        ))}
        <div className="open-search">
          <a onClick={() => {}}>Add a book</a>
        </div>
      </div>
    </div>
  );
}

ShelfsList.propTypes = {
  books: PropTypes.array.isRequired
};

export default ShelfsList;
