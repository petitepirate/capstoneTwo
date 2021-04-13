"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Book {
  /** Create a book (from data), update db, return new book data.
   *
   * data should be { title, authors, description, personalReview, category, thumbnail, username }
   *
   * Returns { title, authors, description, personalReview, category, thumbnail, username }
   *
   * Throws BadRequestError if book already in database.
   * */
 
  static async create({ title, authors, description, personalReview, category, thumbnail, username }) {
    const duplicateCheck = await db.query(
          `SELECT title
           FROM books
           WHERE title = $1`,
        [handle]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate book: ${title}`);

    const result = await db.query(
          `INSERT INTO books
           (title, authors, description, personalReview, category, thumbnail, username)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING title, authors, description, personalReview, category, thumbnail, username`,
        [
          title,
          authors,
          description,
          personalReview,
          category,
          thumbnail,
          username
        ],
    );
    const book = result.rows[0];

    return book;
  }

  /** Find all books (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - title
   * - author
   * -category
   * -(will find case-insensitive, partial matches)
   *
   * Returns [{ title, authors, description, personalReview, category, thumbnail, username }, ...]
   * */

  static async findAll(searchFilters = {}) {
    let query = `SELECT b.title,
    b.authors,
    b.description,
    b.personalReview,
    b.category,
    b.thumbnail,
    b.username
                 FROM books b
                  LEFT JOIN users AS u ON u.username = b.username`;

    let whereExpressions = [];
    let queryValues = [];

    //add author search
    const { category, title } = searchFilters;

    // For each possible search term, add to whereExpressions and queryValues so
    // we can generate the right SQL


    if (title) {
      queryValues.push(`%${title}%`);
      whereExpressions.push(`title ILIKE $${queryValues.length}`);
    } 
    if (category) {
      queryValues.push(`%${category}%`);
      whereExpressions.push(`category ILIKE $${queryValues.length}`);
    }
 

    //add author search
    // Finalize query and return results


    const booksRes = await db.query(query, queryValues);
    return booksRes.rows;
  }


  static async findUserBooks(user) {
    let query = `SELECT * FROM books WHERE username LIKE '${user}';`
    const booksRes = await db.query(query);
    return booksRes.rows;
  }
  
//may need to do this off of ID#
  static async remove(title) {
    const result = await db.query(
          `DELETE
           FROM books
           WHERE title = $1
           RETURNING title`,
        [title]);
    const book = result.rows[0];


    if (!book) throw new NotFoundError(`No book: ${title}`);
  }
}


module.exports = Book;
