const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

// Route: Signup
router.post("/signup", userController.signup);

// Login route
router.post("/login", userController.login);

router.post("/forgot-password", userController.forgotPassword);

router.post("/reset-password/:token", userController.resetPassword);

module.exports = router;
