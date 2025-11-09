// src/components/employee/sections/EditProfile.jsx
import React, { useState } from "react";
import api from "../../../api/axios";

export default function EditProfile({ employeeData, setEmployeeData, fetchEmployeeData }) {
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/api/employee/update-profile", employeeData);
      await fetchEmployeeData();
      alert("Profile updated successfully!");
    } catch {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex-1 p-8 bg-gray-50 min-h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold text-[#222B45] mb-6">Edit Profile</h2>

      <form onSubmit={handleProfileUpdate} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl space-y-4">
        <input
          type="text"
          value={employeeData.name || ""}
          onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}
          placeholder="Full Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#554CFF]"
        />
        <input
          type="email"
          value={employeeData.email || ""}
          onChange={(e) => setEmployeeData({ ...employeeData, email: e.target.value })}
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#554CFF]"
        />
        <input
          type="tel"
          value={employeeData.phone || ""}
          onChange={(e) => setEmployeeData({ ...employeeData, phone: e.target.value })}
          placeholder="Phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#554CFF]"
        />

        <select
          value={employeeData.department || ""}
          onChange={(e) => setEmployeeData({ ...employeeData, department: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#554CFF]"
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
        </select>

        <select
          value={employeeData.position || ""}
          onChange={(e) => setEmployeeData({ ...employeeData, position: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#554CFF]"
        >
          <option value="">Select Position</option>
          <option value="Intern">Intern</option>
          <option value="Junior Developer">Junior Developer</option>
          <option value="Senior Developer">Senior Developer</option>
          <option value="Team Lead">Team Lead</option>
          <option value="Manager">Manager</option>
        </select>

        <input
          type="number"
          value={employeeData.salary || ""}
          onChange={(e) => setEmployeeData({ ...employeeData, salary: e.target.value })}
          placeholder="Salary"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#554CFF]"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-6 py-2 rounded-lg text-white font-semibold transition-all ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#554CFF] hover:bg-[#443BCC]"}`}
        >
          {loading ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </section>
  );
}
