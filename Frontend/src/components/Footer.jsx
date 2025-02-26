import React from "react";
import Logo from "../assets/logomain.png";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div className="relative z-10">
      {/* Top Border for Separation */}
      <div className="border-t-2 border-gray-300 w-full"></div>

      <footer className="footer bg-white text-base-content py-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-sm">
        {/* Left Section */}
        <aside className="text-center md:text-left">
          <img src={Logo} alt="Learn DU Logo" className="w-12 h-12 mx-auto md:mx-0" />
          <p className="text-black text-sm mt-2">
            Learn DU <br />
            +91 7428549837 <br />
            contact@learndu.in
          </p>
        </aside>

        {/* Middle Section */}
        <nav className="text-black text-sm text-center md:text-left space-y-2 md:space-y-0 md:space-x-6">
          <br />
          <a href="https://learndu.in/contact_us" className="link link-hover">Contact Us</a>
          <a href="https://learndu.in/website_info" className="link link-hover">Website Information</a>
          <a href="https://learndu.in/privacy_policy" className="link link-hover">Privacy Policy</a>
          <a href="https://learndu.in/refund_policy" className="link link-hover">Refund Policy</a>
          <a href="https://learndu.in/terms_conditions" className="link link-hover">Terms and Condition</a>
          <a href="https://learndu.in/work-with-us" className="link link-hover">Work With Us</a>

        </nav>

        {/* Right Section */}
        <nav className="text-center md:text-left">
          <h6 className="footer-title text-black text-base font-semibold mb-3">SOCIAL</h6>
          <div className="flex justify-center md:justify-start space-x-6 text-xl">
            <a href="https://www.linkedin.com/company/learndu/?viewAsMember=true" target="_blank" className="text-black hover:text-blue-700"><FaLinkedin /></a>
            <a href="mailto:contact@learndu.in" className="text-black hover:text-red-600"><SiGmail /></a>
            <a href="https://www.instagram.com/learndu.in/" target="_blank" className="text-black hover:text-pink-500"><FaInstagram /></a>
          </div>
        </nav>
      </footer>

      {/* Copyright Section */}
      <div className="bg-white text-black text-center py-3 text-sm">
        <p>© 2024 - All rights reserved by LearnDU</p>
      </div>
    </div>
  );
}

export default Footer;
