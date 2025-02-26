const express = require("express");
const { signup, login } = require("../controller/userController");
const { requestPasswordReset, resetPassword } = require("../controller/authcontroller.js");

const router = express.Router();

// Route: Signup
router.post("/signup", signup);

// Login route
router.post("/login", login);

router.post("/reset-password", requestPasswordReset);

router.post("/reset-password/:token", resetPassword);

module.exports = router;
