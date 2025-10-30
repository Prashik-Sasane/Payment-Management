import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Register payload:", form);
      const res = await register(form); 
      alert(res.message || "Registration successful!");

      if (form.role === "hr") navigate("/dashboard");
      else navigate("/employee-dashboard");
    } catch (error) {
      alert(error.response?.data?.error || error.message || "Error registering user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-96 h-[550px]">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create an Account
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            >
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"} text-white font-semibold rounded-md shadow transition duration-200`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <button
            type="button"
            onClick={() => navigate("/")}
            disabled={loading}
            className="text-indigo-600 hover:underline font-medium ml-1"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
