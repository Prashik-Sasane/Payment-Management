import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Login", path: "/" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="https://imgs.search.brave.com/UAoO7zfp3sAa18neVJ4ldklkL_Q4ER1CAPbtYtiRDDs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdml0eS91cHNj/YWxlci1tYWduaWZp/Yy1tb2RlbHMtcG9z/dGVyLXYyLndlYnA" alt="Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold tracking-wide text-gray-800">
            <span className="text-indigo-600">Pay</span>
            <span className="text-gray-800">Roll</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path}>
             <li
              className={`cursor-pointer uppercase py-2 px-3 rounded-lg transition-transform duration-200 transform ${
                location.pathname === link.path
                  ? "bg-indigo-600 text-white scale-105"
                  : "hover:text-indigo-600 hover:bg-indigo-50 hover:scale-105"
              }`}
            >
              {link.name}
            </li>
            </Link>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-2 px-6 py-4">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)}>
                <li
                  className={`cursor-pointer uppercase py-2 px-3 rounded-lg transition-colors duration-200 ${
                    location.pathname === link.path
                      ? "bg-indigo-600 text-white"
                      : "hover:text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  {link.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
