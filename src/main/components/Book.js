import React from "react";
import ShelfSelector from "./ShelfSelector";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

/**
 * Stateless component that represents a book item and displays its
 * most relevant information: title, authors and a thumbnail image.
 */
function Book(props) {
  const { book, location } = props;

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
        style={{ backgroundImage: `url('${book.imageLinks.thumbnail}')` }}
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
    return authors ? authors.join(",\n") : "Unknown";
  };

  return (
    <div className="book">
      <div className="book-top">
        {location.pathname === "/" ? (
          <Link to={`/details/${book.id}`}>{getThumbnail(book)}</Link>
        ) : (
          getThumbnail(book)
        )}

        <ShelfSelector book={book} onChangeShelf={(book, shelf) => {}} />
      </div>

      <div className="book-title">{book.title}</div>
      {location.pathname !== "/" && (
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
  location: PropTypes.object.isRequired
};

export default withRouter(Book);
