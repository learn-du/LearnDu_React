const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");  
const crypto = require("crypto");
const transporter = require("../utils/sendemail.js");
require("dotenv").config();

const signup = async (req, res) => {
  const { fullName, email, phone, password, confirmPassword } = req.body;

  // Validate passwords
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new user
    const user = new User({
      fullName,
      email,
      phone,
      password,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d", // Token expires in 1 day
      });
  
      res.status(200).json({
        message: "Login successful",
        token,
        user: { id: user._id, fullName: user.fullName, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

 // **Forgot Password**
const forgotPassword = async (req, res) => {
   const { email } = req.body;
 
   try {
     // Find user by email
     const user = await User.findOne({ email });
     if (!user) {
       return res.status(404).json({ message: "User not found" });
     }
 
     // Clear previous token (if any)
     user.resetToken = undefined;
     user.resetTokenExpiry = undefined;
 
     // Generate password reset token
     const token = crypto.randomBytes(32).toString("hex");
     user.resetToken = token;
     user.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
     await user.save();
 
     // Send password reset email
     const resetLink = `https://learndu-book-buy-sell.vercel.app/reset-password/${token}`;
     await transporter.sendMail({
       to: email,
       from: process.env.EMAIL_USER,
       subject: "Password Reset Request",
       html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`,
     });
 
     res.status(200).json({ message: "Password reset email sent successfully" });
   } catch (error) {
     res.status(500).json({ message: "Error sending password reset email", error: error.message });
   }
 };
 
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmNewPassword } = req.body;

  // Validate passwords
  if (!newPassword || !confirmNewPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  try {
    // Find user by reset token and check expiry
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // Ensure token is still valid
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Remove the reset token after password reset
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};

module.exports = { signup, login, forgotPassword, resetPassword };