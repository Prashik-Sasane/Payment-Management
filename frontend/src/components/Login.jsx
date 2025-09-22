import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const result = await login(form.email, form.password);

    if (result.success) {
      toast.success("Login successful!", { position: "top-center", autoClose: 3000, theme: "dark" });
      navigate("/dashboard");
    } else {
      setError(result.error);
      toast.error(result.error, { position: "top-center", autoClose: 5000, theme: "dark" });
    }

    setLoading(false);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isButtonDisabled =
    !form.email || !form.password || !form.confirmPassword || form.password !== form.confirmPassword || loading;

  return (
    <div className="min-h-screen w-full bg-gray-900 flex flex-col px-6 py-8 text-white relative">
      {/* Logo top-left */}
      <div className="absolute top-4 left-6 text-2xl font-bold text-white">
        GenZ Bank
      </div>

      <ToastContainer />

      <div className="flex flex-col items-center justify-center w-full h-full">
        {error && (
          <div className="bg-red-600 text-white rounded-lg p-3 mb-4 w-full max-w-md text-center shadow-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleInputChange}
            className="w-full px-5 py-3 rounded-xl bg-gray-800 placeholder-gray-400 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleInputChange}
            className="w-full px-5 py-3 rounded-xl bg-gray-800 placeholder-gray-400 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-5 py-3 rounded-xl bg-gray-800 placeholder-gray-400 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />

          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full py-3 mt-2 rounded-2xl font-bold text-lg transition-all duration-200 ${
              isButtonDisabled
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg"
            }`}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm opacity-80">
          Don't have an account?{" "}
          <RouterLink to="/" className="underline font-semibold hover:text-indigo-400 transition">
            Sign up
          </RouterLink>
        </p>

        <div className="flex justify-center gap-6 mt-8 opacity-70 text-xs">
          <span className="font-semibold">Secure</span>
          <span className="font-semibold">Fast</span>
          <span className="font-semibold">Reliable</span>
        </div>
      </div>
    </div>
  );
}
