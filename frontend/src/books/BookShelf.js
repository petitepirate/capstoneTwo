import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import BookWormApi from "../api/api";
import UserBookCard from "./UserBookCard";
import LoadingSpinner from "../common/LoadingSpinner";
// import {
//     InputGroup,
//     Input,
//     InputGroupAddon,
//     Button,
//     FormGroup,
//     Label,
//     Spinner
//   } from 'reactstrap';
//   import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.min.css';
//   import axios from 'axios';
//   import BookCard from './BookCard.js';
  import "./BookCard.css";
/** Show page with list of companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */

function BookShelf() {
  console.debug("CompanyList");

  const [books, setBooks] = useState(null);

  useEffect(function getBooksOnMount() {
    console.debug("BookShelf useEffect getBooksOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads companies. */
  async function search(title) {
    let books = await BookWormApi.getBooks(title);
    setBooks(books);
  }

  if (!books) return <LoadingSpinner />;

  return (
      <div className="CompanyList col-md-8 offset-md-2">
        <SearchForm searchFor={search} />
        {books.length
            ? (
                <div className="BookList-list">
                  {books.map(b => (
                      <UserBookCard
                          key={b.id}
                          title={b.title}
                          authors={b.authors}
                          description={b.description}
                          personalReview={b.personalReview}
                          category={b.category}
                          thumbnail={b.thumbnail}
                      />
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
      </div>
  );
}

export default BookShelf;
