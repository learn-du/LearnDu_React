const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    collegeName: { type: String, required: true },
    bookName: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    price: { type: Number, required: true },
    driveLink: { type: String },
    coverImage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
