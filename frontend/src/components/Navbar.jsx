import React from 'react'
import {Link} from 'react-router-dom'
import Account from '../assets/account_balance.svg'
const Navbar = () => {
  return (
    <nav className="bg-white text-black py-5 border-b border-gray-100 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
            <img src={Account} alt="Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-semibold tracking-wide">
              <span className="text-blue-500">Pay</span>
              <span className="text-blue-500">Roll</span>
            </h1>
        </div>
        <ul className="flex space-x-8 text-md font-medium text-lg">
          <Link to="/">
          <li className="hover:text-[#8506ec] transition-colors duration-200 cursor-pointer uppercase">Home</li>
          </Link>
          <li className="hover:text-[#8506ec] transition-colors duration-200 cursor-pointer uppercase">About</li>
          <Link to="/contact">
          <li className="hover:text-[#8506ec] transition-colors duration-200 cursor-pointer uppercase">Contact</li>
          </Link>
          <Link to="/">
          <li className="hover:text-[#8506ec] transition-colors duration-200 cursor-pointer uppercase">Login</li>
          </Link>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
