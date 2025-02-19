const express = require('express');
const router = express.Router();
const books = require('../controller/bookController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new book
router.post('/',authMiddleware, books.create);

// Retrieve all books
router.get('/', books.findAll);

router.get("/filter", books.findFiltered);

// Retrieve a single book with id
router.get('/:id', books.findOne);

// Update a book with id
router.put('/:id', books.update);

// Delete a book with id
router.delete('/:id', books.delete);

router.get("/mine", authMiddleware, books.getUserListings);


module.exports = router;
