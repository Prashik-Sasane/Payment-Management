import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUniversity,
  FaPaperPlane,
  FaHistory,
  FaUserCircle,
  FaBolt,
  FaLock,
  FaSpinner,
  FaMobileAlt,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaUserShield,
  FaExclamationTriangle
} from "react-icons/fa";

const images = [
  "https://i0.wp.com/blogrevamp.cashfree.com/wp-content/uploads/2023/07/Payment-Success-Rate.png?fit=1200%2C800&ssl=1",
  "https://i0.wp.com/blogrevamp.cashfree.com/wp-content/uploads/2023/02/Cashfree-Secure-Payment-Gateway.png?fit=1200%2C800&ssl=1",
  "https://i0.wp.com/blogrevamp.cashfree.com/wp-content/uploads/2023/12/multiple-payment-gateway-blog.png?fit=2400%2C1600&ssl=1",
  "https://i0.wp.com/blogrevamp.cashfree.com/wp-content/uploads/2023/05/Cashfree-Payment-Gateway-for-startups.png?fit=2500%2C1667&ssl=1"
];

function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [length]);

  return (
    <div className="w-full h-[600px] relative overflow-hidden rounded-4xl shadow-lg mb-8">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`slide-${index}`}
          className={`absolute top-0 left-0 w-full h-[600px] p-1 rounded-4xl object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

export default function Dashboard() {
  const features = [
    {
      icon: <FaBolt className="text-4xl text-purple-400" />,
      title: "Instant Payments",
      description: "Send and receive money in real-time with zero delays."
    },
    {
      icon: <FaLock className="text-4xl text-purple-400" />,
      title: "Bank-Level Security",
      description: "Advanced encryption and multi-factor authentication protect your funds."
    },
    {
      icon: <FaSpinner className="text-4xl text-purple-400" />,
      title: "Seamless Experience",
      description: "Smooth and fast UI ensuring effortless transactions every time."
    },
    {
      icon: <FaMobileAlt className="text-4xl text-purple-400" />,
      title: "Any Device Access",
      description: "Use our app on mobile or desktop – anytime, anywhere."
    },
    {
      icon: <FaUsers className="text-4xl text-purple-400" />,
      title: "Wide Payment Options",
      description: "Support for UPI, cards, wallets, and net banking."
    },
    {
      icon: <FaChartLine className="text-4xl text-purple-400" />,
      title: "Detailed Insights",
      description: "Track your spending and payments with intuitive dashboards."
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br flex flex-col items-center">
        <ImageSlider />

       
        <div className="w-full px-0 py-12 flex flex-col items-center">
          <h1 className="text-6xl font-bold text-[#5443cf] mb-4 tracking-tight drop-shadow-lg">
            Welcome to PayFlow
          </h1>
          <span className="bg-white bg-opacity-70 rounded-full px-6 py-2 text-[#5443cf] font-semibold shadow hover:bg-[#2e19cf] hover:text-white">
            All your payments in one place
          </span>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl px-6">
          <Link
            to="/select-bank"
            className="group bg-gray-100 rounded-2xl flex flex-col items-center py-8 hover:-translate-y-2 transition transform hover:shadow-2xl border border-gray-300"
          >
            <FaUniversity className="text-[#7a6af2] text-3xl mb-3 group-hover:scale-110 transition duration-300 w-12 h-12 rounded-4xl border border-gray-500 bg-[#2a1f81]" />
            <span className="text-lg font-semibold text-[#5443cf]">Select Bank</span>
          </Link>
          <Link
            to="/send-money"
            className="group bg-gray-100 rounded-2xl flex flex-col items-center py-8 hover:-translate-y-2 transition transform hover:shadow-2xl border border-gray-300 "
          >
            <FaPaperPlane className="text-[#7a6af2] text-4xl mb-3 group-hover:scale-110 transition w-12 h-12 rounded-4xl border border-gray-500 duration-300 bg-[#2a1f81]" />
            <span className="text-lg font-semibold text-[#5443cf]">Send Money</span>
          </Link>
          <Link
            to="/transactions"
            className="group bg-gray-100 rounded-2xl flex flex-col items-center py-8 hover:-translate-y-2 transition transform hover:shadow-2xl border border-gray-300"
          >
            <FaHistory className="text-[#7a6af2] text-4xl mb-3 group-hover:scale-110 transition w-12 h-12 rounded-4xl border border-gray-500 duration-300 bg-[#2a1f81]" />
            <span className="text-lg font-semibold text-[#5443cf]">Transaction History</span>
          </Link>
          <Link
            to="/profile"
            className="group bg-gray-100 rounded-2xl flex flex-col items-center py-8 hover:-translate-y-2 transition transform hover:shadow-2xl border border-gray-300"
          >
            <FaUserCircle className="text-[#A66CFF] text-4xl mb-3 group-hover:scale-110 transition w-12 h-12 rounded-4xl border border-gray-500 duration-300 bg-[#2a1f81]" />
            <span className="text-lg font-semibold text-[#5443cf]">Profile</span>
          </Link>

          <div className="flex flex-col col-span-1 md:col-span-4 items-center w-full">
            <section className="bg-gradient-to-br from-[#3b0a45] to-[#6b21a8] text-white py-16 px-6 w-6xl rounded-2xl mt-16">
              <h2 className="text-4xl font-extrabold text-center mb-12">
                Simple, Fast & Secure Transactions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                {features.map(({ icon, title, description }) => (
                  <div
                    key={title}
                    className="flex flex-col items-center text-center p-6 bg-purple-900 bg-opacity-30 rounded-xl shadow-lg hover:shadow-purple-700 transition"
                  >
                    <div className="mb-4">{icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-purple-200 max-w-xs">{description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="flex flex-col col-span-1 md:col-span-4 items-center w-full">
           <section className="bg-white w-6xl rounded-2xl p-10 text-[#2d1c56] mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#402977]">
            Safety & Trust
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <FaShieldAlt className="mx-auto text-5xl mb-4 text-[#402977]" />
              <h3 className="text-xl font-semibold mb-2">Your Safety Comes First</h3>
              <p className="text-purple-600">
                We prioritize your security with industry-leading measures.
              </p>
            </div>
            <div>
              <FaLock className="mx-auto text-5xl mb-4 text-[#402977]" />
              <h3 className="text-xl font-semibold mb-2">Secure from the Start</h3>
              <p className="text-purple-600">
                Every transaction is encrypted with cutting-edge protocols.
              </p>
            </div>
            <div>
              <FaUserShield className="mx-auto text-5xl mb-4 text-[#402977]" />
              <h3 className="text-xl font-semibold mb-2">Payment Privacy</h3>
              <p className="text-purple-600">
                Your payment data is confidential and protected at all times.
              </p>
            </div>
            <div>
              <FaExclamationTriangle className="mx-auto text-5xl mb-4 text-[#402977]" />
              <h3 className="text-xl font-semibold mb-2">Risk Assessment</h3>
              <p className="text-purple-600">
                Continuous monitoring to identify and prevent fraudulent activity.
              </p>
            </div>
          </div>
        </section>
        </div>
        </div>

        {/* Footer or actions */}
        <div className="mt-10 text-center text-[#5443cf] text-sm opacity-70">
          Secured by UPI • Powered by PayFlow
        </div>
      </div>

      <footer className="bg-[#1e1e2f] text-gray-300 py-12 px-6 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm leading-relaxed">
              We provide seamless payment gateway solutions and e-commerce integrations to empower businesses worldwide.
            </p>
            <p className="text-sm mt-4">© 2025 PayFlow. All rights reserved.</p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/solutions/payment" className="hover:text-white transition">
                  Payment Gateway
                </a>
              </li>
              <li>
                <a href="/solutions/e-commerce" className="hover:text-white transition">
                  E-commerce Solutions
                </a>
              </li>
              <li>
                <a href="/solutions/invoice" className="hover:text-white transition">
                  Invoice Management
                </a>
              </li>
              <li>
                <a href="/solutions/analytics" className="hover:text-white transition">
                  Analytics & Reporting
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/career" className="hover:text-white transition">
                  Career
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Support & Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/help" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/refunds" className="hover:text-white transition">
                  Refund Policy
                </a>
              </li>
            </ul>
            <div className="mt-6 flex space-x-4">
              <a href="https://facebook.com" className="hover:text-white">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="https://twitter.com" className="hover:text-white">
                <i className="fab fa-twitter" />
              </a>
              <a href="https://linkedin.com" className="hover:text-white">
                <i className="fab fa-linkedin-in" />
              </a>
              <a href="https://instagram.com" className="hover:text-white">
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

