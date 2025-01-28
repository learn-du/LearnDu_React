import React from "react";
import loginbg from "../assets/loginbg.jpeg";
import faces from "../assets/faces.jpeg";
import { Link } from "react-router-dom";
function Signup() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-between"
      style={{
        backgroundImage:`url(${loginbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Faces image at the top */}
      <div className="flex justify-center pt-0">
        <img
          src={faces}
          alt="Avatars"
          className="w-auto h-28 object-contain"
        />
      </div>

      {/* Centered Signup Form */}
      <div className=" flex flex-col items-center justify-center w-full max-w-md bg-white  border-black border-4 p-4 shadow-lg">
        <form className="w-full">
          <h2 className=" text-2xl font-bold text-center mb-6 font-sans text-black">Sign Up</h2>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 mb-4 border-b-2 border-black  bg-white  focus:outline-none focus:ring-0 focus:border-orange"
            required
          />
          <input
            type="email"
            placeholder="Email ID"
            className="w-full p-2 mb-4 border-b-2 border-black  bg-white  focus:outline-none focus:ring-0 focus:border-orange"
            required
          />
          <input
            type="number"
            placeholder="Phone Number"
            className="w-full p-2 mb-4 border-b-2 border-black  bg-white  focus:outline-none focus:ring-0 focus:border-orange"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border-b-2 border-black  bg-white  focus:outline-none focus:ring-0 focus:border-orange"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 mb-4 border-b-2 border-black  bg-white   focus:outline-none focus:ring-0 "
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
            <Link to="/login" className="text-yellow underline">
  Log in
</Link>
          </p>
        </form>
      </div>

      {/* Spacer at the bottom */}
      <div className="pb-6"></div>
    </div>
  );
}

export default Signup;