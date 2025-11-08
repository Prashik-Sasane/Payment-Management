import React, { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/employee/login", { email, password });
      alert(res.data.message);
      navigate("/employee/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-md mt-16 sm:mt-24">
      <h2 className="text-2xl font-medium text-center text-gray-900">Welcome Back , Employee Sir! </h2>
      <p className="text-gray-900 text-sm text-center mb-4 font-bold mt-1">You're in! Let's achieve great things together..</p>
      <form onSubmit={handleLogin} className="space-y-6">
        
        <label className="font-semibold text-sm">Email</label>
        <input
          type="email"
          placeholder="prasxxxx@.com"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
         <label className="font-semibold text-sm">Password</label>
        <input
          type="password"
          placeholder="Passxxxxx"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow transition duration-300 text-xl"
        >
          Login
        </button>

        <p className="text-center text-sm mt-2">
          I Don't have an account?{" "}
          <button
            type="button"
            className="text-blue-500 font-semibold"
            onClick={() => navigate("/employee/register")}
          >
            RegisterPage
          </button>
        </p>
      </form>
    </div>
  );
}

export default EmployeeLogin;
