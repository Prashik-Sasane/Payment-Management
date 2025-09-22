import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes, FaSearchDollar } from "react-icons/fa";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const searchRef = useRef();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const placeholders = [
    "Search for loans...",
    "Search for payments...",
    "Search for bank transfers...",
    "Search for transactions...",
  ];

  // Cycle placeholder text every 3 seconds
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholderText(placeholders[index]);
      index = (index + 1) % placeholders.length;
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Close search if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-3/4 z-30">
        <nav className="flex items-center justify-between bg-black/50 backdrop-blur-md text-white px-8 py-4 rounded-4xl shadow-lg">
          <div className="text-xl font-bold">20's VC</div>

          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <div ref={searchRef} className="relative">
              <button onClick={toggleSearch} className="w-5 text-white">
                <FaSearchDollar />
              </button>

              {searchOpen && (
                <input
                  type="text"
                  placeholder={placeholderText}
                  autoFocus
                  className="absolute right-0 top-full mt-2 w-60 px-4 py-2 rounded-4xl border border-gray-300 bg-white text-black shadow-lg focus:outline-none transition-all duration-300"
                />
              )}
            </div>

            {/* Sidebar Toggle */}
            <button onClick={toggleSidebar} className="text-white text-2xl">
              <FaBars />
            </button>
          </div>
        </nav>
      </div>

      {/* Overlay for blur when sidebar open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white/40 backdrop-blur-md text-black w-1/4 max-w-xs transform transition-transform duration-300 z-30
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={toggleSidebar} className="text-black text-xl">
            <FaTimes />
          </button>
        </div>

        <ul className="flex flex-col mt-4">
           <li className="px-4 py-2 hover:bg-gray-200/50 rounded transition cursor-pointer">
            Home
          </li>
          <li className="px-4 py-2 hover:bg-gray-200/50 rounded transition cursor-pointer">
            Dashboard
          </li>
          <li className="px-4 py-2 hover:bg-gray-200/50 rounded transition cursor-pointer">
            Payments
          </li>
          <li className="px-4 py-2 hover:bg-gray-200/50 rounded transition cursor-pointer">
            Bank Transfer
          </li>
          <li className="px-4 py-2 hover:bg-gray-200/50 rounded transition cursor-pointer">
            Transactions
          </li>

        </ul>

      </div>
    </>
  );
}
