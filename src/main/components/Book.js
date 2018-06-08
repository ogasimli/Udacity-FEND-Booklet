import React from 'react';
import ShelfSelector from './ShelfSelector';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/**
 * Stateless component that represents a book item and displays its
 * most relevant information: title, authors and a thumbnail image.
 */
function Book(props) {
  const { book, onChangeShelf, location } = props;

  /**
   * Checks if there's a thumbnail available for the book.
   *
   * @param {Object} book - book object
   * @return {boolean}
   */
  const isThumbnailAvailable = book => {
    return book.imageLinks && book.imageLinks.thumbnail;
  };

  const getThumbnail = book => {
    return isThumbnailAvailable(book) ? (
      <div
        className="book-cover"
        style={{
          background: `url('${book.imageLinks.thumbnail}') no-repeat center`,
          backgroundSize: '100% 100%'
        }}
      />
    ) : (
      <div className="book-cover">
        <div className="no-image" />
      </div>
    );
  };

  /**
   * Return formmated string of authors seperated by commas.
   * If array is empty then return 'Unknown'
   *
   * @param {Array} authors - array of author names
   * @return {string}
   */
  const formatAuthors = authors => {
    return authors ? authors.join(',\n') : 'Unknown';
  };

  return (
    <div className="book">
      <div className="book-top">
        {location.pathname.indexOf('/details') >= 0 ? (
          getThumbnail(book)
        ) : (
          <Link to={`/details/${book.id}`}>{getThumbnail(book)}</Link>
        )}

        <ShelfSelector book={book} onChangeShelf={onChangeShelf} />
      </div>

      <div className="book-title">{book.title}</div>
      {location.pathname.indexOf('/details') >= 0 && (
        <div className="book-subtitle">{book.subtitle}</div>
      )}
      <div className="book-authors display-linebreak">
        {formatAuthors(book.authors)}
      </div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(Book);
