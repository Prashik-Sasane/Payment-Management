import React, { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

function EmployeeRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    position: "",
    salary: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/employee/register", form, {
        withCredentials: true,
      });

      if (res.status === 201) {
        alert(res.data.message);
        navigate("/employee/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-2xl border border-gray-200 shadow-lg mt-16 sm:mt-24">
      <h2 className="text-2xl font-medium text-center text-gray-900">Welcome Back , Employee Sir! </h2>
      <p className="text-gray-900 text-sm text-center mb-4 font-bold mt-1">You're in! Let's achieve great things together..</p>
      <form onSubmit={handleSubmit} className="space-y-2">
        
        <label className="font-semibold text-sm">Full Name</label>
        <input
          name="name"
          placeholder="Parth Kadam"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <label className="font-semibold text-sm">Email</label>
        <input
          name="email"
          type="email"
          placeholder="prasxxxx@.com"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <label className="font-semibold text-sm">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Passxxxxx"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <label className="font-semibold text-sm">Department</label>
        <input
          name="department"
          placeholder="Computer/IT"
          value={form.department}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label className="font-semibold text-sm">Position</label>
        <input
          name="position"
          placeholder="Software Engineer"
          value={form.position}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <label className="font-semibold text-sm">Salary</label>
        <input
          name="salary"
          placeholder="45000rs/450$"
          type="number"
          value={form.salary}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow transition duration-300 text-lg"
        >
          Register
        </button>
        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-500 font-semibold"
            onClick={() => navigate("/employee/login")}
          >
            LoginPage
          </button>
        </p>
      </form>
    </div>
  );
}

export default EmployeeRegister;
