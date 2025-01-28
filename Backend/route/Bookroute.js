const express = require("express");
const { addBook, getBooks } = require("../controller/bookController");

const router = express.Router();

// Route to add a book
router.post("/", addBook);

// Route to get all books
router.get("/", getBooks);

module.exports = router;
