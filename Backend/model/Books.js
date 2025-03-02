const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", // Reference to User model
      required: true 
    },
    name: { 
      type: String, 
      required: true,
      trim: true // Ensures no leading/trailing spaces
    },
    whatsappNumber: { 
      type: String, 
      required: true,
      match: [/^\d{10,15}$/, "Please enter a valid WhatsApp number"], // Validates phone number format
    },
    collegeName: { 
      type: String, 
      required: true,
      trim: true
    },
    bookName: { 
      type: String, 
      required: true,
      trim: true
    },
    category: { 
      type: String, 
      required: true,
      enum: ["Engineering", "Medical", "Commerce", "Science", "Arts", "Other"], // Restrict categories if needed
    },
    subcategory: { 
      type: String, 
      required: true,
      trim: true
    },
    price: { 
      type: Number, 
      required: true,
      min: [0, "Price cannot be negative"] // Ensures price is non-negative
    },
    mrp: { 
      type: Number, 
      min: [0, "MRP cannot be negative"]
    },
    coverImage: { 
      type: String,
      default: "" // Ensures coverImage doesn't return undefined
    }
  }, 
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model("Book", bookSchema);
