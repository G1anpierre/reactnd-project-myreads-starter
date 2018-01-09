import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MyReads from './MyReads'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends Component {
  state = {
    myBooks: [],
    searchBooks: [],
    currentKeyWord: ''
  }

  componentDidMount() {
    // fetch myBooks from the server and update state
    BooksAPI.getAll().then((results) => {
      this.setState({myBooks: results})
    })
  }

  getSearchBooks = (keyword) => {
    if (keyword < 1) {
      this.setState({searchBooks: []})
      return
    }
    BooksAPI.search(keyword, 20).then((results) => {
      if (JSON.stringify(results) !== '{"error":"empty query","items":[]}' &&
       JSON.stringify(results) !== undefined) {
        this.cleanSearchBooksData(results)
        this.setState({searchBooks: results})
      }
    })
  }

  cleanSearchBooksData = (results) => {
    for (let i = 0; i < results.length; i++) {
      results[i].shelf = 'none'
      for (let j = 0; j < this.state.myBooks.length; j++) {
        if (results[i].id === this.state.myBooks[j].id) {
          results[i].shelf = this.state.myBooks[j].shelf
        }
      }
    }
  }

  // input: one book & shelf location
  // all you need is the book id: `{"id": "123"}`
  updateMyBookRequest = (bookObject, shelfString) => {
    BooksAPI.update(bookObject, shelfString).then((postResults) => {
      BooksAPI.getAll().then((books) => {
        this.setState({myBooks: books})
        this.getSearchBooks()
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MyReads
            myBooks={this.state.myBooks}
            updateMyBookRequest={(book, shelf) => {
              this.updateMyBookRequest(book, shelf)
            }}
          />
        )}/>

        <Route exact path="/search" render={() => (
          <SearchBooks
            searchBooks={this.state.searchBooks}
            keyWordTrigger={(keyword) => {
              this.getSearchBooks(keyword)
            }}
            updateMyBookRequest={(book, shelf) => {
              this.updateMyBookRequest(book, shelf)
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp