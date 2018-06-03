import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Stateless component that represents the grid of books.
 */
function BookDetails(props) {
  const { book } = props;

  /**
   * Configure rating stars for the book based on its average rating
   *
   * @param {object} book - the book which rating should be detrmined
   * @return {array}
   */
  const generateRatingTags = book => {
    const avgRating = book.averageRating || 0;

    let highlightStar = [];
    let tag;
    for (let i = 0; i < 5; i++) {
      if (avgRating > i) {
        tag = <i key={i} className="fas fa-star" />;
      } else {
        tag = <i key={i} className="far fa-star" />;
      }
      highlightStar.push(tag);
    }

    return highlightStar;
  };

  return (
    <div className="list-books">
      <header className="list-books-title">
        <Link className="back-button" to="/">
          <i className="fas fa-arrow-left" />
        </Link>
        <h1>Booklet</h1>
      </header>
      <div className="book-details">
        <div className="book-info">
          <Book book={book} />
          <ul>
            <li>Number of pages: {book.pageCount}</li>
            <li>
              Published by {book.publisher || "an unknown entity"} on{" "}
              {book.publishedDate || "a certain date in history"}
            </li>
          </ul>
        </div>

        <div className="book-summary">{book.description}</div>

        <div className="rating-stars">
          {generateRatingTags(book)}
          <div className="review-count">
            (Based on {book.ratingsCount || 0} reviews)
          </div>
        </div>
      </div>
    </div>
  );
}

BookDetails.propTypes = {
  book: PropTypes.object.isRequired
};

export default BookDetails;
