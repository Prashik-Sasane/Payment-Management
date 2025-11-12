import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMoneyCheckAlt, FaUsers, FaChartLine, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
// import payrollImg from "./image.jpg";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-gray-800 flex flex-col">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-10 py-3 shadow-sm bg-white">
        <h1 className="text-2xl font-bold text-sky-600">PayMaster<span className="text-red-600 text-3xl">HR</span></h1>
        <div className="flex gap-6 font-semibold">
          <Link to="/" className="hover:text-sky-600">Home</Link>
          <Link to="/about" className="hover:text-sky-600">About</Link>
          <Link to="/contact" className="hover:text-sky-600">Contact</Link>
        </div>
        <div className="flex gap-4">
          <Link
            to="/hr/login"
            className="px-5 py-2 border bg-green-600 text-white rounded-lg hover:bg-black hover:text-white"
          >
            HR Login
          </Link>
          <Link
            to="/employee/login"
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 "
          >
            Employee Login
          </Link>
        </div>
      </nav>

      
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:w-1/2"
        >
          <h2 className="text-5xl font-extrabold text-[#1e293b] leading-tight">
            Streamline Your <span className="text-sky-600">Payroll</span> and Employee Management
          </h2>
          <p className="mt-5 text-gray-600 text-lg text-center">
            Automate salary processing, manage employee data, and generate insightful reports — all from one secure dashboard.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              to="/hr/register"
              className="px-10 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-sky-600 transition"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="px-10 py-3 border border-sky-500 text-sky-600 text-lg font-semibold rounded-lg hover:bg-sky-50 transition"
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
            src="https://d27snf008ywx0f.cloudfront.net/wp-content/uploads/2025/01/Group-1410083215-3.webp"
            alt="Payroll Illustration"
            className="w-[90%] rounded-2xl"
          />
        </motion.div>
      </section>

      <section className="py-16 px-8 md:px-20 bg-gray-100">
      <h3 className="text-3xl font-extrabold text-[#1e293b] mb-4 text-center">Platform Features</h3>
      <p className="text-[#1e293b] mb-10 text-center font-medium text-xl">Everything you need to create a high-performance culture</p>
      <div className="gap-8 max-w-6xl mx-auto flex">
        {/* Card 1 */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white rounded-xl p-8 text-center border border-gray-200"
        >
          <FaMoneyCheckAlt className="text-sky-600 text-5xl mx-auto mb-4 bg-blue-100" />
          <h4 className="text-xl font-semibold mb-2">Automated Payroll</h4>
          <p className="text-gray-600">Simplify salary calculations, tax deductions, and payslip generation with automation.</p>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white rounded-xl p-8 text-center border border-gray-200"
        >
          <FaUsers className="text-sky-600 text-5xl mx-auto mb-4" />
          <h4 className="text-xl font-semibold mb-2">Employee Management</h4>
          <p className="text-gray-600 text-center">Manage employee details, attendance, roles, and performance efficiently.</p>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white rounded-xl p-8 text-center border border-gray-200"
        >
          <FaChartLine className="text-sky-600 text-5xl mx-auto mb-4" />
          <h4 className="text-xl font-semibold mb-2">Analytics & Reports</h4>
          <p className="text-gray-600">Gain real-time insights into salary expenses, taxes, and workforce trends.</p>
        </motion.div>

        {/* Card 4 */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="bg-white rounded-xl p-8 text-center border border-gray-200"
        >
          <FaEnvelope className="text-sky-600 text-5xl mx-auto mb-4" />
          <h4 className="text-xl font-semibold mb-2">Seamless Communication</h4>
          <p className="text-gray-600">Built-in messaging and notification system for HR and employees.</p>
        </motion.div>
      </div>
    </section>

      <section className="py-12 px-8 md:px-20 flex flex-col-reverse md:flex-row items-center gap-12 bg-white">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:w-1/2"
        >
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#1e293b] mb-6">PAYROLL MANAGEMENT</h3>
          <p className="text-lg text-gray-700 mb-6">
            Simplify payroll with PayMaster’s automated, secure, and compliant system. Fast, precise payouts and built-in legal protection ensure your team is paid accurately, on time, every time.
          </p>
          <ul className="text-base md:text-lg text-gray-800">
            <li className="flex items-start"><span className="text-sky-600  mr-3">✔</span> Instantly calculate payroll & deductions</li>
            <li className="flex items-start"><span className="text-sky-600  mr-3">✔</span> Generate payslips with a click</li>
            <li className="flex items-start"><span className="text-sky-600  mr-3">✔</span> Plan budgets with powerful payroll analytics</li>
            <li className="flex items-start"><span className="text-sky-600  mr-3">✔</span> Encrypted data & full privacy compliance</li>
          </ul>
        </motion.div>
        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:w-1/2 flex justify-center mb-10 md:mb-0"
        >
          <img
            src="https://d27snf008ywx0f.cloudfront.net/wp-content/uploads/2025/01/payroll-mgmt.webp"
            alt="Payroll dashboard illustration"
            className="max-w-xl rounded-xl"
          />
        </motion.div>
      </section>
      
      <section className="py-8 px-8 md:px-20 flex flex-col md:flex-row items-center gap-12 bg-gray-100">
      {/* Left: Image */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="md:w-1/2 flex justify-center mb-10 md:mb-0"
      >
        <img
          src="https://d27snf008ywx0f.cloudfront.net/wp-content/uploads/2025/01/HM-3-1-2048x1497.webp"
          alt="Payroll dashboard illustration"
          className="max-w-xl rounded-xl"
        />
      </motion.div>
      {/* Right: Features */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="md:w-1/2"
      >
        <h3 className="text-3xl md:text-4xl font-extrabold text-[#1e293b] mb-6">HR MANAGEMENT SIMPLIFIED</h3>
        <p className="text-lg text-gray-700 mb-6">
          Adapt to new realities, work faster and smarter. Determine a defined future of work for your organization with a strong, flexible, global HR solution.
        </p>
        <ul className=" text-base md:text-lg text-gray-800">
          <li className="flex items-start"><span className="text-sky-600  mr-3">✔</span> Easy access to documents and information.</li>
          <li className="flex items-start"><span className="text-sky-600  mr-3">✔</span> An employee database that scales.</li>
          <li className="flex items-start"><span className="text-sky-600  mr-3">✔</span> Smart HR workflows.</li>
          <li className="flex items-start"><span className="text-sky-600  mr-3">✔</span> Automation of HR processes.</li>
        </ul>
      </motion.div>
    </section>

    <section className="py-12 px-8 md:px-20 flex flex-col-reverse md:flex-row items-center gap-12 bg-white">
        {/* Left: Features */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:w-1/2"
        >
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#1e293b] mb-6">PERFORMANCE MANAGEMENT</h3>
          <p className="text-lg text-gray-700 mb-6">
           Regular performance management with RapidHR encourages your employees to aim for excellence. Then, your organization is set up for success and growth while.
          </p>
          <ul className="text-base md:text-lg text-gray-800">
            <li className="flex items-start"><span className="text-sky-600  mr-3">✔</span>360 Performance reviews and templates</li>
            <li className="flex items-start"><span className="text-sky-600  mr-3">✔</span>Management By Objectives</li>
            <li className="flex items-start"><span className="text-sky-600  mr-3">✔</span>Self-Evaluation Tools</li>
            <li className="flex items-start"><span className="text-sky-600  mr-3">✔</span>Performance reports</li>
          </ul>
        </motion.div>
        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:w-1/2 flex justify-center mb-10 md:mb-0"
        >
          <img
            src="https://d27snf008ywx0f.cloudfront.net/wp-content/uploads/2025/01/Performance-mgmt.webp"
            alt="Payroll dashboard illustration"
            className="max-w-xl rounded-xl"
          />
        </motion.div>
      </section>

      <footer className="mt-auto pt-4 pb-6 bg-blue-900 text-white border-t border border-gray-200">
      <div className="max-w-screen-xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h5 className="font-bold text-white mb-2">PayMaster</h5>
            <p className="text-sm text-white mb-2">
              Secure, scalable, and intelligent payroll management for modern businesses.
            </p>
            <p className="text-xs text-white mb-2">
              Streamline HR processes, ensure compliance with labor laws, automate salary calculations, and generate detailed reports effortlessly.
            </p>
            <p className="text-xs text-white">
              Trusted by HR professionals for accuracy, employee self-service, and 24/7 support.
            </p>
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

