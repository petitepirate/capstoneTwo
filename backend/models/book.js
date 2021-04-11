"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Book {
  /** Create a company (from data), update db, return new company data.
   *
   * data should be { handle, name, description, numEmployees, logoUrl }
   *
   * Returns { handle, name, description, numEmployees, logoUrl }
   *
   * Throws BadRequestError if company already in database.
   * */
 
  static async create({ title, authors, description, personalReview, category, thumbnail }) {
    const duplicateCheck = await db.query(
          `SELECT title
           FROM books
           WHERE title = $1`,
        [handle]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate book: ${title}`);

    const result = await db.query(
          `INSERT INTO books
           (title, authors, description, personalReview, category, thumbnail)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING title, authors, description, personalReview, category, thumbnail`,
        [
          title,
          authors,
          description,
          personalReview,
          category,
          thumbnail
        ],
    );
    const book = result.rows[0];

    return book;
  }

  /** Find all companies (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - minEmployees
   * - maxEmployees
   * - name (will find case-insensitive, partial matches)
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   * */

  static async findAll(searchFilters = {}) {
    let query = `SELECT title,
    authors,
    description,
    personalReview,
    category,
    thumbnail
                 FROM books`;
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

    query += " ORDER BY title";
    const booksRes = await db.query(query, queryValues);
    return booksRes.rows;
  }

  /** Given a company handle, return data about company.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  // static async get(handle) {
  //   const companyRes = await db.query(
  //         `SELECT handle,
  //                 name,
  //                 description,
  //                 num_employees AS "numEmployees",
  //                 logo_url AS "logoUrl"
  //          FROM companies
  //          WHERE handle = $1`,
  //       [handle]);

  //   const company = companyRes.rows[0];

  //   if (!company) throw new NotFoundError(`No company: ${handle}`);

  //   const jobsRes = await db.query(
  //         `SELECT id, title, salary, equity
  //          FROM jobs
  //          WHERE company_handle = $1
  //          ORDER BY id`,
  //       [handle],
  //   );

  //   company.jobs = jobsRes.rows;

  //   return company;
  // }

  /** Update company data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, description, numEmployees, logoUrl}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   */

  // static async update(handle, data) {
  //   const { setCols, values } = sqlForPartialUpdate(
  //       data,
  //       {
  //         numEmployees: "num_employees",
  //         logoUrl: "logo_url",
  //       });
  //   const handleVarIdx = "$" + (values.length + 1);

  //   const querySql = `UPDATE companies 
  //                     SET ${setCols} 
  //                     WHERE handle = ${handleVarIdx} 
  //                     RETURNING handle, 
  //                               name, 
  //                               description, 
  //                               num_employees AS "numEmployees", 
  //                               logo_url AS "logoUrl"`;
  //   const result = await db.query(querySql, [...values, handle]);
  //   const company = result.rows[0];

  //   if (!company) throw new NotFoundError(`No company: ${handle}`);

  //   return company;
  // }

  /** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

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
