const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bookRoutes = require("./route/Bookroute");
const userRoutes = require("./route/userRoute");
const path = require("path"); // Import path module


dotenv.config(); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1); // Exit process with failure
  });

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
