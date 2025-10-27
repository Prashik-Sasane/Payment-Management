import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", role: "employee" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password , role: form.role })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Login failed");

       login(data.user, data.token);

      if (data.user?.role === "hr") navigate("/dashboard");
      else navigate("/employee-dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOAuthLogin = (provider) => {
    setError("");
    
    const id = window.prompt(`Paste your ${provider} id (mock)`);
    if (!id) return;

    const mockProviders = {
      google: { id: "google-123", role: "employee" },
      github: { id: "github-456", role: "hr" },
    };

    const providerInfo = mockProviders[provider];
    if (providerInfo && id === providerInfo.id) {
      localStorage.setItem("role", providerInfo.role);
      if (providerInfo.role === "hr") navigate("/dashboard");
      else navigate("/employee-dashboard");
    } else {
      setError(`Invalid ${provider} id. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96 h-[550px]">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Payroll System Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Login as</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option className="border border-gray-300" value="employee">Employee</option>
              <option value="hr">HR/Admin</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">Or login with</div>

        <div className="mt-3 flex flex-col gap-3">
          <button
            onClick={() => handleOAuthLogin("google")}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Login with Google
          </button>
          <button
            onClick={() => handleOAuthLogin("github")}
            className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-black transition duration-200"
          >
            Login with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
