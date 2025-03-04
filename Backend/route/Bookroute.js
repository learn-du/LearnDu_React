const express = require("express");
const router = express.Router();
const books = require("../controller/bookController");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/multer"); 



// Create a new book (requires authentication)

router.post("/", verifyToken, upload.single("coverImage"), books.create);

// Retrieve all books
router.get("/", books.findAll);

// Retrieve filtered books
router.get("/filter", books.findFiltered);

// Get books listed by the logged-in user
router.get("/mine", verifyToken, books.getUserListedBooks);

// Retrieve a single book by ID
router.get("/:id", books.findOne);

// Update a book by ID (requires authentication)
router.put("/:id", verifyToken, books.update);

// Delete a book listed by the logged-in user
router.delete("/:id", verifyToken, books.deleteUserBook);

module.exports = router;

