import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [sticky, setSticky] = useState(false);
  useEffect (()=>{
    const handleScroll=()=>{
      if(window.scrollY>0){
        setSticky(true);
    }
    else{
      setSticky(false);
    }
  }
  window.addEventListener('scroll',handleScroll)
  return ()=>{
    window.removeEventListener('scroll',handleScroll)
  }
  },[])
    const navItems = (<>
       <li><a>Home</a></li>
              <li>
                <details >
                  <summary>Services</summary>
                  <ul className="p-2  bg-white text-black">
                    <li><a>Sell Book</a></li>
                    <li><a>Buy Book</a></li>
                  </ul>
                </details>
              </li>
              <li><a>My Listings</a></li>
              <li><a>Profile</a></li>
              <li><a>About Us</a></li>
    </>);
  return (
    <>
      <div className= {` min-h-screen w-full fixed top-0 left-0 right-0 z-50 ${
        sticky?"sticky-navbar shadow-md bg-gray-100 duration-300 transition-all ease-in-out":" "
      }`}> {/* Page background */}
        <div className="navbar bg-white text-black shadow-md border-b border-gray-300"> {/* Added border-b */}
          <div className="navbar-start">
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
                className="menu menu-sm dropdown-content  rounded-box z-[1] mt-3 w-52 p-2 shadow f bg-white"
              >
                {navItems}
              </ul>
            </div>
            <a className=" text-xl font-bold cursor-pointer text-yellow ml-10">LearnDU</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 font">
            {navItems}
            </ul>
          </div>
          <div className="navbar-end">
          <Link to="/login" className="btn bg-yellow border-none text-white hover:text-white mr-10 px-8 py-1">
    Login
  </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
