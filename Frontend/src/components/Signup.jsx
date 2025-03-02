import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      // Send POST request to the backend
      const response = await axios.post("https://learndu-services-backend.onrender.com/api/users/signup", formData);

      if (response.status === 201) {
        alert("Signup successful!");
        navigate("/login"); // Redirect to login page
      }
    } catch (error) {
      console.error("Error during signup:", error);
      if (error.response) {
        // Backend error message
        setErrorMessage(error.response.data.message || "Signup failed.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-between"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      

      {/* Centered Signup Form */}
      <div className="flex flex-col items-center justify-center w-full max-w-md bg-white border-black border-4 p-4 shadow-lg">
        <form className="w-full" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6 font-sans text-black">Sign Up</h2>
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full p-2 mb-4 border-b-2 border-black text-black bg-white focus:outline-none focus:ring-0 focus:border-orange"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email ID"
            className="w-full p-2 mb-4 border-b-2 border-black  text-black bg-white focus:outline-none focus:ring-0 focus:border-orange"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="w-full p-2 mb-4 border-b-2 border-black  text-black bg-white focus:outline-none focus:ring-0 focus:border-orange"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full p-2 mb-4 border-b-2 border-black  text-black bg-white focus:outline-none focus:ring-0 focus:border-orange"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            className="w-full p-2 mb-4 border-b-2 border-black  text-black bg-white focus:outline-none focus:ring-0"
            required
          />
          <button
            type="submit"
            className="w-full bg-white text-black py-3 border-yellow border-4 rounded hover:bg-slate-100"
          >
            Create Account
          </button>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-yellow underline">
              Log in
            </a>
          </p>
        </form>
      </div>

      {/* Spacer at the bottom */}
      <div className="pb-6"></div>
    </div>
  );
}

export default Signup;
