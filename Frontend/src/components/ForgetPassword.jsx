import faces from "../assets/faces.jpeg";
import template from "../assets/template.jpg";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/users/reset-password", {
        email,
      });

      setMessage(response.data.message);
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col justify-center items-center relative px-4"
      style={{ backgroundImage: `url(${template})` }}
    >
      {/* Faces Section */}
      <div
        className="absolute top-0 w-full flex justify-center"
        style={{
          backgroundImage: `url(${faces})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          height: "140px",
          width: "100%",
        }}
      ></div>

      {/* Password Reset Form */}
      <div className="bg-white border border-black p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md xl:max-w-sm shadow-lg flex flex-col items-center justify-center mt-24 sm:mt-20 rounded-lg">
        <p className="text-center text-black text-sm sm:text-lg">
          Enter the email address you signed up with below. An email will be sent containing a link to reset your password.
        </p>

        {message && <p className="text-green-600 text-center mb-3">{message}</p>}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={handleResetRequest} className="w-full flex justify-center items-center flex-col">
        <input
          type="email"
          placeholder="e.g john@gmail.com"
          className="w-full mt-4 p-2 border-b-4 border-black focus:outline-none"
          style={{
            backgroundColor: "#FEF9C3", // Light Yellow (equivalent to Tailwind bg-yellow-100)
            color: "#333",
          }}
          value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />

        <button className="w-full sm:w-40 mt-4 p-2 justify-center bg-[#FF6B6B] text-white rounded-md active:bg-red transition duration-150 "
        disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
        </button>
        </form>
      </div>
    </div>
  );
}