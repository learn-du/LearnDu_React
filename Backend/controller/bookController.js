const Book = require("../model/Books");

// Add a book
const addBook = async (req, res) => {
  const {
    name,
    whatsappNumber,
    collegeName,
    bookName,
    category,
    subcategory,
    price,
    driveLink,
    coverImage,
  } = req.body;

  try {
    const newBook = new Book({
      name,
      whatsappNumber,
      collegeName,
      bookName,
      category,
      subcategory,
      price,
      driveLink,
      coverImage,
    });

    await newBook.save(); // Save book to MongoDB
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Failed to add book", error: error.message });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books from MongoDB
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books", error: error.message });
  }
};

// Fetch books listed by the logged-in user
const getUserBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id });
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books", error: error.message });
  }
};

// Delete a specific book
const deleteBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the logged-in user owns the book
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized to delete this book" });
    }

    await book.remove();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book", error: error.message });
  }
};


module.exports = { addBook, getBooks, getUserBooks, deleteBook };
