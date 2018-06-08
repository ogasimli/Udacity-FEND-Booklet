import React from 'react';
import BooksGrid from './BooksGrid';
import PropTypes from 'prop-types';

/**
 * Stateless component that represents the grid of books.
 */
function BookShelf(props) {
  const { shelf, books, onChangeShelf } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.title}</h2>
      <div className="bookshelf-books">
        <BooksGrid books={books} onChangeShelf={onChangeShelf} />
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

export default BookShelf;
