"use strict";

/** Routes for books. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Book = require("../models/book");
const bookNewSchema = require("../schemas/bookNew.json");
// const bookUpdateSchema = require("../schemas/bookUpdate.json");
const bookSearchSchema = require("../schemas/bookSearch.json");

const router = express.Router({ mergeParams: true });


/** POST / { book } => { book }

 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, bookNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const book = await Book.create(req.body);
    return res.status(201).json({ book });
  } catch (err) {
    return next(err);
  }
});

/** GET / =>

 */

router.get("/", async function (req, res, next) {
  const user = res.locals.user.username

  try {
    const books = await Book.findUserBooks(user);
    return res.json({ books });
  } catch (err) {
    return next(err);
  }
});

/** GET /[bookId] => { book }
 *
 * Returns { id, title, salary, equity, company }
 *   where company is { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {  //REVISIT 
  try {
    const book = await Book.get(req.params.id);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[bookId]  { fld1, fld2, ... } => { book }
 *
 * Data can include: { title, salary, equity }
 *
 * Returns { id, title, salary, equity, companyHandle }
 *
 * Authorization required: admin
 */

// router.patch("/:id", ensureLoggedIn, async function (req, res, next) {
//   try {
//     const validator = jsonschema.validate(req.body, bookUpdateSchema);
//     if (!validator.valid) {
//       const errs = validator.errors.map(e => e.stack);
//       throw new BadRequestError(errs);
//     }

//     const book = await Book.update(req.params.id, req.body);
//     return res.json({ book });
//   } catch (err) {
//     return next(err);
//   }
// });

/** DELETE /[handle]  =>  { deleted: id }
 *
 * Authorization required: admin
 */

router.delete("/:id", ensureLoggedIn, async function (req, res, next) {  //REVISIT
  try {
    await Book.remove(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
