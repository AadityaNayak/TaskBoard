import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 border-y-2">
      {/* Logo and Navigation */}
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-blue-900">TaskBoard</h1>
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          ☰
        </button>

        {/* Navigation Links for Larger Screens */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-900 font-bold"
                : "text-gray-700 hover:text-blue-900"
            }
          >
            Home
          </NavLink>
        </div>
      </div>

      {/* Navigation Links for Smaller Screens */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden mt-3 space-y-2`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-900 font-bold"
              : "text-gray-700 hover:text-blue-900"
          }
        >
          Home
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
