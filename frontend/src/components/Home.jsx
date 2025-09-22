import React, { useState, useEffect } from "react";

const images = [
  "https://wallpaperaccess.com/full/2924703.jpg",
  "https://wallpaperaccess.com/full/781843.jpg",
  "https://images.hdqwalls.com/download/breaking-bad-poster-1920x1080.jpg",
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    phone: "",
    loanType: "",
    cibil: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  // Auto change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("✅ You will get a call shortly regarding the same.");
    setFormData({ phone: "", loanType: "", cibil: "" });

    // Hide message after 3s
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <>
      {/* Image Slider */}
      <div className="absolute top-0 left-0 w-full h-[60vh] object-contain m-0 p-0">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover m-0 p-0"
        />

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-colors ${
                idx === currentIndex ? "bg-white" : "bg-gray-500"
              }`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>

      {/* Loan Query Box */}
      <div className="relative z-30 mt-[55vh] max-w-5xl mx-auto bg-black/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-center mb-6 text-white drop-shadow-md">
          Get Loan At Your Own Interest
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Phone Number */}
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-3 w-48 rounded-4xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Phone Number"
          />

          {/* Loan Type */}
          <select
            name="loanType"
            value={formData.loanType}
            onChange={handleChange}
            required
            className="p-3 w-48 rounded-4xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Loan Type</option>
            <option value="Home Loan">Home Loan</option>
            <option value="Car Loan">Car Loan</option>
            <option value="Personal Loan">Personal Loan</option>
            <option value="Business Loan">Business Loan</option>
          </select>

          
          <div className="flex items-center gap-4">
            <input
              type="number"
              name="cibil"
              value={formData.cibil}
              onChange={handleChange}
              required
              min="300"
              max="900"
              className="p-3 w-36 rounded-4xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="CIBIL Score"
            />

            <button
              type="submit"
              className="px-8 py-3 rounded-4xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition relative overflow-hidden"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Floating Success Message */}
        {successMessage && (
          <div className="mt-4 text-center animate-slideUp">
            <p className="text-green-400 font-semibold bg-green-900/30 rounded-lg px-4 py-2 inline-block shadow-md">
              {successMessage}
            </p>
          </div>
        )}
        
      </div>
      <div className="relative z-30 mt-[10vh] max-w-5xl mx-auto bg-black/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/10">
      <div className="flex  justify-between">

       <button className="px-8 py-3 rounded-4xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition relative overflow-hidden">
       Check Balance
       </button>

        <button className="px-8 py-3 rounded-4xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition relative overflow-hidden">
       Quick Money Transfor
       </button>
       <button className="px-8 py-3 rounded-4xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition relative overflow-hidden">
       Get Your CIBIL
       </button>
      </div>
        </div>
    </>
  );
}
