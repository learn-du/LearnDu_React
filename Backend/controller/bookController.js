const Book = require('../model/Books');
const multer = require('multer');
const path = require('path');

// Multer configuration for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');  // Store files in the 'public/uploads' directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


// Create a new book
exports.create = async (req, res) => {
  upload.single('coverImage')(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ message: "File upload failed", error: err });
    }


    try {
      const { name, whatsappNumber, collegeName, bookName, category, subcategory, price, mrp } = req.body;
      const coverImage = req.file ? `/uploads/${req.file.filename}` : null;

      const book = new Book({
        user: req.user._id, // Link book to the logged-in user
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

      const savedBook = await book.save();
      res.status(201).json(savedBook); // 201 Created
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({
        message: "Some error occurred while creating the book.",
        error: error.message,
      });
    }
  });
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

exports.getUserListings = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: No user logged in." });
    }

    console.log("Fetching listings for user ID:", req.user._id); // Debugging log

    const books = await Book.find({ user: req.user._id });

    if (books.length === 0) {
      return res.status(404).json({ message: "No listings found for this user." });
    }

    res.status(200).json({ books });
  } catch (error) {
    console.error("Error fetching user listings:", error);
    res.status(500).json({ message: "Error fetching listings", error: error.message });
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


// Delete a book by ID
exports.delete = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Could not delete book with id=" + req.params.id,
      error: error.message,
    });
  }
};
