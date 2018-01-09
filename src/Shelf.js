
import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Shelf extends Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    shelfName: PropTypes.string.isRequired,
    updateMyBookRequest: PropTypes.func.isRequired
  }

  // input an array of book objects and the shelf name that you want books from
  filterBooksByShelf = (books, shelf) => {
    return books.filter((book) => book.shelf === shelf)
  }

  shelfFormattedNames = {
    'currentlyReading': 'Currently Reading',
    'wantToRead': 'Want to Read',
    'read': 'Read'
  }

  formatShelfName = (shelf) => {
    return this.shelfFormattedNames[shelf]
  }

  render() {

    let currentShelfBooks = this.filterBooksByShelf(this.props.myBooks, this.props.shelfName)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.formatShelfName(this.props.shelfName)}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {currentShelfBooks.map((book, index) => (
              <Book
                key={index}
                book={book}
                updateMyBookRequest={(book, shelf) => {
                  this.props.updateMyBookRequest(book, shelf)
                }}
              />
            ))}

          </ol>
        </div>
      </div>

    )
  }
}

export default Shelf