
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import PropTypes from 'prop-types'

class MyReads extends Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    updateMyBookRequest: PropTypes.func.isRequired
  }

  render() {

    return (
      <div className="list-books">

        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>

        <div className="list-books-content">
          <Shelf
            shelfName="currentlyReading"
            myBooks={this.props.myBooks}
            updateMyBookRequest={(book, shelf) => {
              this.props.updateMyBookRequest(book, shelf)
            }}
          />

          <Shelf
            shelfName="wantToRead"
            myBooks={this.props.myBooks}
            updateMyBookRequest={(book, shelf) => {
              this.props.updateMyBookRequest(book, shelf)
            }}
          />

          <Shelf
            shelfName="read"
            myBooks={this.props.myBooks}
            updateMyBookRequest={(book, shelf) => {
              this.props.updateMyBookRequest(book, shelf)
            }}
          />
        </div>

        <div className="open-search">
          <Link onClick={() => {this.setState({ showSearchPage: true })}} to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MyReads