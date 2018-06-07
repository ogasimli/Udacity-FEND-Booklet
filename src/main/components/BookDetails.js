import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Book from "./Book";

/**
 * Stateless component that represents the grid of books.
 */
class BookDetails extends Component {
  static propTypes = {
    bookId: PropTypes.string.isRequired,
    getBookById: PropTypes.func.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  state = {
    book: {}
  };

  componentDidMount() {
    const { bookId, getBookById } = this.props;
    getBookById(bookId).then(book => this.setState({ book }));
  }

  /**
   * Configure rating stars for the book based on its average rating
   *
   * @param {object} book - the book which rating should be detrmined
   * @return {array}
   */
  generateRatingTags = book => {
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

  render() {
    const book = this.state.book;

    return (
      <div className="container">
        <Header />
        <main>
          <div className="book-details">
            <div className="book-info">
              <Book book={book} onChangeShelf={this.props.onChangeShelf} />
              <ul>
                <li>Number of pages: {book.pageCount}</li>
                <li>
                  Published by {book.publisher || "an unknown entity"} on{" "}
                  {book.publishedDate || "a certain date in history"}
                </li>
              </ul>
              <div className="rating-stars">
                {this.generateRatingTags(book)}
                <div className="review-count">
                  (Based on {book.ratingsCount || 0} reviews)
                </div>
              </div>
            </div>

            <div className="book-summary">{book.description}</div>
          </div>
        </main>
      </div>
    );
  }
}

export default BookDetails;
