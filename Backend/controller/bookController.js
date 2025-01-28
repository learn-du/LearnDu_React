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

module.exports = { addBook, getBooks };
