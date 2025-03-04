const Book = require('../model/Books');

// Create a new book
exports.create = async (req, res) => {
  try {
    // Ensure an image is uploaded
    const coverImage = req.file ? `/uploads/${req.file.filename}` : null;

    // Validate required fields
    const { name, whatsappNumber, collegeName, bookName, category, subcategory, price, mrp } = req.body;
    if (!name || !whatsappNumber || !collegeName || !bookName || !category || !subcategory || !price) {
      return res.status(400).json({ message: "All fields except MRP are required!" });
    }

    // Create the book object
    const book = new Book({
      user: req.user ? req.user._id : null, // Ensure authentication is handled
      name,
      whatsappNumber,
      collegeName,
      bookName,
      category,
      subcategory,
      price,
      coverImage,
      mrp
    });

    // Save the book to the database
    const savedBook = await book.save();
    res.status(201).json({ message: "Book created successfully", book: savedBook });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({
      message: "Some error occurred while creating the book.",
      error: error.message,
    });
  }
};

// Fetch all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books from the database
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};


// Retrieve filtered books based on query parameters
exports.findFiltered = async (req, res) => {
  try {
    const { collegeName, category, subcategory } = req.query;

    // Build dynamic query object
    const query = {};
    if (collegeName) query.collegeName = collegeName;
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;

    const filteredBooks = await Book.find(query);
    res.status(200).json(filteredBooks);
  } catch (error) {
    console.error("Error fetching filtered books:", error);
    res.status(500).json({ error: "Failed to fetch filtered books" });
  }
};

// Get all books
exports.findAll = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: "Some error occurred while retrieving books.",
      error: error.message,
    });
  }
};

// Get a single book by ID
exports.findOne = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving book with id=" + req.params.id,
      error: error.message,
    });
  }
};

// Update a book by ID
exports.update = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({
      message: "Error updating book with id=" + req.params.id,
      error: error.message,
    });
  }
};



exports.getUserListedBooks = async (req, res) => {
  try {
    const books = await Book.find({ seller: req.user.id });
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve books.", error: error.message });
  }
};

// Delete a book listed by the logged-in user
exports.deleteUserBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this book" });
    }

    await book.deleteOne();
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book. Please try again." });
  }
};
