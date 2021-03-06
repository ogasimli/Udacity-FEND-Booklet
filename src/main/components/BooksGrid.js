import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

/**
 * Stateless component that represents the grid of books.
 */
function BooksGrid(props) {
  const { books, onChangeShelf } = props;

  return (
    <ol className="books-grid">
      {books.map(book => (
        <li key={book.id}>
          <Book book={book} onChangeShelf={onChangeShelf} />
        </li>
      ))}
    </ol>
  );
}

BooksGrid.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

export default BooksGrid;
