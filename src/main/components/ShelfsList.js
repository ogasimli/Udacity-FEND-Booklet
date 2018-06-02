import React from "react";
import BookShelf from "./BookShelf";
import PropTypes from "prop-types";

/**
 * Stateless component that represents the grid of books.
 */
function ShelfsList(props) {
  const { books } = props;

  const shelves = [
    { id: "currentlyReading", title: "Currently Reading" },
    { id: "wantToRead", title: "Want to Read" },
    { id: "read", title: "Read" }
  ];

  const shelfsBooks = (shelf, books) =>
    books.filter(book => book.shelf === shelf.id);

  return (
    <div className="list-books-content">
      {shelves.map(shelf => (
        <div key={shelf.id}>
          <BookShelf shelf={shelf} books={shelfsBooks(shelf, books)} />
        </div>
      ))}
    </div>
  );
}

ShelfsList.propTypes = {
  books: PropTypes.array.isRequired
};

export default ShelfsList;
