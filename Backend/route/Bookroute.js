const express = require("express");
const { addBook, getBooks, getUserBooks, deleteBook } = require("../controller/bookController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Route to add a book
router.post("/", addBook);

// Route to get all books
router.get("/", getBooks);


// Route to get books listed by the logged-in user
router.get("/mine", authenticate, getUserBooks);

// Route to delete a book
router.delete("/:id", authenticate, deleteBook);

module.exports = router;
