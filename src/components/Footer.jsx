import React from "react";
import contactInfo from "../constants/contactInfo"; // Import the constants file


const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          {/* Contact Details */}
          <p className="text-lg font-medium">
            Contact Me: 📧 <a href={`mailto:${contactInfo.mail}`} className="hover:underline">aadityanayak7@gmail.com</a>
          </p>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6">
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
