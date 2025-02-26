import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginbg from "../assets/loginbg.jpeg";
import faces from "../assets/faces.jpeg";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from AuthContext
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true); // Show loading state

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData);

      if (response.status === 200) {
        alert("Login successful!");

        // Call login function from AuthContext to update user state
        await login(response.data.token);

        // Redirect to the homepage
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        setErrorMessage(error.response.data.message || "Login failed.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: `url(${loginbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Faces image at the top */}
      <div className="absolute top-4 left-0 right-0 flex justify-center">
        <img src={faces} alt="Avatars" className="w-auto h-auto object-contain" />
      </div>

      {/* Container to center the login form */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center w-full max-w-sm bg-white border-black border-4 p-8 shadow-lg mt-32">
          {/* Login Form */}
          <form className="w-full" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center mb-6 font-sans text-black">Login</h2>
            {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email ID"
              className="w-full p-2 mb-4 border-b-2 border-black bg-white text-black focus:outline-none focus:ring-0 focus:border-orange"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full p-2 mb-4 border-b-2 border-black bg-white text-black focus:outline-none focus:ring-0 focus:border-orange"
              required
            />
            <a href="/forgot-password" className="text-gray hover:text-slate-600 text-sm block px-0 py-0 mb-4 text-center">
              Forgot password?
            </a>
            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded border-x-4 border-y-4 border-yellow hover:bg-grey"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="text-sm text-center mt-4">
              Do not have an account?{" "}
              <a href="/signup" className="text-yellow underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
