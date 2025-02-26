import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Import useAuth hook
import Logo from "../assets/logomain.png";

function Navbar() {
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user session
    navigate('/'); // Redirect to homepage
  };

  const navItems = (
    <>
      <li><a href="https://learndu.in/" className="hover:text-yellow-500">Home</a></li>
      <li>
        <details>
          <summary className="hover:text-yellow-500">Services</summary>
          <ul className="p-2 bg-white text-black shadow-md rounded-lg">
            <li><a href="/sell" className="hover:text-yellow-500">Sell Book</a></li>
            <li><a href="/buy" className="hover:text-yellow-500">Buy Book</a></li>
          </ul>
        </details>
      </li>
      <li><a href='/listing' className="hover:text-yellow-500">My Listings</a></li>
    </>
  );

  return (
    <div className="w-full">
      <div className="navbar bg-white text-black shadow-md border-b-4 border-yellow fixed top-0 left-0 right-0 z-50">
        <div className="navbar-start flex items-center">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-white"
            >
              {navItems}
            </ul>
          </div>
          {/* Updated Logo with Proper Sizing */}
          <img src={Logo} alt="Learn DU Logo" className="h-10 w-10 ml-5" />
          <a className="text-xl font-bold cursor-pointer text-yellow ml-2">LearnDU</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button
              onClick={handleLogout}
              className="btn bg-yellow border-none text-white hover:bg-grey text-black mr-10 px-8 py-1"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="btn bg-yellow border-none text-white hover:text-yellow bg-gray mr-10 px-8 py-1"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
