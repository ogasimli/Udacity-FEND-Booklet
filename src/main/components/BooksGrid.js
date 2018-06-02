import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

/**
 * Stateless component that represents the grid of books.
 */
function BooksGrid(props) {
  const { books } = props;

  return (
    <ol className="books-grid">
      {books.map(book => (
        <li key={book.id}>
          <Book book={book} />
        </li>
      ))}
    </ol>
  );
}

BooksGrid.propTypes = {
  books: PropTypes.array.isRequired
};

export default BooksGrid;
