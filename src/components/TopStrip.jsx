import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import contactInfo from "../constants/contactInfo"; // Import the constants file

const TopStrip = () => {
  return (
    <div className="bg-blue-900 text-white text-sm px-4 py-2 flex flex-wrap justify-between items-center">
      {/* Contact Info */}
      <div className="flex flex-wrap items-center space-x-2 md:space-x-4">
        <a
          href={`mailto:${contactInfo.email}`}
          className="hover:underline"
        >
          📧 {contactInfo.email}
        </a>
      </div>

      {/* Social Media Links */}
      <div className="flex space-x-4 mt-2 md:mt-0">
        <a
          href={contactInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 flex items-center"
        >
          <FaGithub className="h-5 w-5" />
        </a>
        <a
          href={contactInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300 flex items-center"
        >
          <FaLinkedin className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
};

export default TopStrip;
