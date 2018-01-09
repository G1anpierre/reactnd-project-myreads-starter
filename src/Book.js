import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateMyBookRequest: PropTypes.func.isRequired
  }

  state = {
    value: this.props.book.shelf
  }

  handleChange = (event) => {
    this.props.updateMyBookRequest(this.props.book, event.target.value)
    this.setState({value: event.target.value})
  }

  addShelfColor = (shelf) => {
    if (shelf === 'currentlyReading') {
      return 'green'
    } else if (shelf === 'wantToRead') {
      return 'yellow'
    } else if (shelf === 'read') {
      return 'red'
    } else {
      return ''
    }
  }

  getBookImage = (book) => {
    if (book.imageLinks) {
      if (book.imageLinks.smallThumbnail) {
        return `'${book.imageLinks.thumbnail}'`
      } else if (book.imageLinks.thumbnail) {
        return `'${book.imageLinks.thumbnail}'`
      } else {
        return ''
      }
    } else {
      console.log('image failed to load')
    }
    return ''
  }

  render() {
    return (
      <li key={this.props.book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.getBookImage(this.props.book)})`, backgroundColor: this.addShelfColor(this.props.book.shelf)}}></div>
            <div className="book-shelf-changer">
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>

          <div className="book-title">{this.props.book.title}</div>

          <div className="book-authors">
            {this.props.book.authors && (
              this.props.book.authors.join(', ')
            )}
          </div>
        </div>
      </li>
    )
  }
}

export default Book