import React from 'react';
import PropTypes from 'prop-types';

/**
 * Stateless component that contains options to move a book
 * between shelfs.
 */
function ShelfSelector(props) {
  const { book, onChangeShelf } = props;

  /**
   * Function to pass selected shelf into parent component
   *
   * @param {Event} event - an event which took place in the DOM
   */
  const changeShelf = event => {
    onChangeShelf(book, event.target.value);
  };

  return (
    <div className="book-shelf-changer">
      <select value={book.shelf || 'none'} onChange={changeShelf}>
        <option value="placeholder" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}

ShelfSelector.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

export default ShelfSelector;
