import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMoneyCheckAlt, FaUsers, FaChartLine, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-gray-800 flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 shadow-sm bg-white">
        <h1 className="text-2xl font-bold text-sky-600">PayMaster</h1>
        <div className="flex gap-6 font-semibold">
          <Link to="/" className="hover:text-sky-600">Home</Link>
          <Link to="/about" className="hover:text-sky-600">About</Link>
          <Link to="/contact" className="hover:text-sky-600">Contact</Link>
        </div>
        <div className="flex gap-4">
          <Link
            to="/hr/login"
            className="px-5 py-2 border border-sky-500 text-sky-500 rounded-lg hover:bg-sky-50"
          >
            HR Login
          </Link>
          <Link
            to="/employee/login"
            className="px-5 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
          >
            Employee Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:w-1/2"
        >
          <h2 className="text-5xl font-extrabold text-[#1e293b] leading-tight">
            Streamline Your <span className="text-sky-600">Payroll</span> and Employee Management
          </h2>
          <p className="mt-5 text-gray-600 text-lg">
            Automate salary processing, manage employee data, and generate insightful reports — all from one secure dashboard.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              to="/hr/register"
              className="px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 border border-sky-500 text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="md:w-1/2 mt-12 md:mt-0 flex justify-center"
        >
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/payroll-management-system-illustration-download-in-svg-png-gif-file-formats--salary-process-financial-human-resource-hr-business-people-pack-illustrations-6612943.png"
            alt="Payroll Illustration"
            className="w-[90%] rounded-2xl shadow-md"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-sky-50">
        <h3 className="text-3xl font-bold text-center text-[#1e293b] mb-12">
          Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 md:px-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <FaMoneyCheckAlt className="text-sky-600 text-5xl mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Automated Payroll</h4>
            <p className="text-gray-600">
              Simplify salary calculations, tax deductions, and payslip generation with automation.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <FaUsers className="text-sky-600 text-5xl mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Employee Management</h4>
            <p className="text-gray-600">
              Manage employee details, attendance, and roles efficiently in one dashboard.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <FaChartLine className="text-sky-600 text-5xl mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Analytics & Reports</h4>
            <p className="text-gray-600">
              Gain real-time insights into salary expenses, taxes, and workforce data.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto pt-10 pb-6 bg-white text-gray-600 border-t">
        <div className="max-w-screen-xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-bold text-sky-600 mb-2">PayMaster</h5>
              <p className="text-sm text-gray-500">Secure, scalable, and intelligent payroll management for modern businesses.</p>
            </div>
            <div>
              <h6 className="font-semibold mb-2">Product</h6>
              <ul className="space-y-2 text-sm">
                <li><Link to="/features" className="hover:text-sky-600">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-sky-600">Pricing</Link></li>
                <li><Link to="/faq" className="hover:text-sky-600">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-2">Company</h6>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-sky-600">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-sky-600">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-sky-600">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-2">Connect</h6>
              <div className="flex space-x-4 text-2xl mb-2">
                <a href="mailto:support@paymaster.com" className="hover:text-sky-600"><FaEnvelope /></a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600"><FaGithub /></a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600"><FaLinkedin /></a>
              </div>
              <p className="text-xs text-gray-400">Mon–Fri 9am–6pm</p>
            </div>
          </div>
          <div className="border-t pt-4 text-xs text-center text-gray-400">
            &copy; {new Date().getFullYear()} PayMaster. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
