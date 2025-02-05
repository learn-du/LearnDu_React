import React from "react";
import Logo from "../assets/logomain.png"
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className="relative z-10">
        <footer className="footer bg-grey text-base-content p-10">
          {/* Left Section */}
          <aside>
          <img
    src="./assets/logomain.png" 
    alt="Learn DU Logo"
    className="w-12 h-12 object-contain"
  />
            <p className="text-black">
              Learn DU
              <br />
              +91 7428549837
              <br />
              contact@learndu.in
            </p>
          </aside>

          {/* Middle Section */}
          <nav className="text-black">
            <a
              href="https://learndu.in/contact_us"
              className="link link-hover pointer-events-auto"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
            <a
              href="https://learndu.in/website_info"
              className="link link-hover pointer-events-auto"
              rel="noopener noreferrer"
            >
              Website Information
            </a>
            <a
              href="https://learndu.in/privacy_policy"
              className="link link-hover pointer-events-auto"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <a
              href="https://learndu.in/refund_policy"
              className="link link-hover pointer-events-auto"
              rel="noopener noreferrer"
            >
              Refund Policy
            </a>
            <a
              href="https://learndu.in/terms_conditions"
              className="link link-hover pointer-events-auto"
              rel="noopener noreferrer"
            >
              Terms and Condition
            </a>
            <a
              href="https://learndu.in/work-with-us"
              className="link link-hover pointer-events-auto"
              rel="noopener noreferrer"
            >
              Work With Us
            </a>
          </nav>

        {/* Right Section */}
<nav className="text-center md:text-left">
  <h6 className="footer-title text-black mb-4">Social</h6>
  <div className="flex justify-center md:justify-start space-x-6">
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-black text-3xl hover:text-blue-700">
      <FaLinkedin />
    </a>
    <a href="mailto:contact@learndu.in" className="text-black text-3xl hover:text-red-600">
      <SiGmail />
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black text-3xl hover:text-pink-500">
      <FaInstagram />
    </a>
  </div>
</nav>
          {/* Copyright Section */}
      
        </footer>
        <div className="bg-grey text-black text-center py-4 ">
          <p>© 2024 - All right reserved by LearnDU</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
