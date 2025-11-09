// src/components/employee/sections/Leave.jsx
import React, { useState } from "react";
import api from "../../../api/axios";

export default function Leave({ employeeData, setEmployeeData, fetchEmployeeData }) {
  const [leaveForm, setLeaveForm] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    const days = Math.ceil((new Date(leaveForm.endDate) - new Date(leaveForm.startDate)) / (1000*60*60*24)) + 1;

    if (days > employeeData.leaveBalance) {
      alert("Insufficient leave balance!");
      return;
    }

    try {
      await api.post("/api/employee/leave", { ...leaveForm, days });
      setLeaveForm({ leaveType: "", startDate: "", endDate: "", reason: "" });
      fetchEmployeeData();
      alert("Leave applied successfully!");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to apply leave");
    }
  };

  const handleDeleteLeave = async (leaveId, days) => {
    if (!window.confirm("Are you sure you want to delete this leave?")) return;
    try {
      await api.delete(`/api/employee/leave/${leaveId}`);
      setEmployeeData((prev) => ({
        ...prev,
        leaveBalance: prev.leaveBalance + days,
        usedLeaves: prev.usedLeaves - days,
        leaveHistory: prev.leaveHistory.filter(l => l.id !== leaveId),
      }));
      alert("Leave deleted successfully!");
    } catch {
      alert("Failed to delete leave");
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Leave Application</h2>

      <form onSubmit={handleLeaveSubmit} className="bg-white p-6 rounded-2xl shadow mb-8 max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">Apply for Leave</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={leaveForm.leaveType}
            onChange={e => setLeaveForm({...leaveForm, leaveType: e.target.value})}
            required
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select Leave Type</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Earned Leave">Earned Leave</option>
          </select>
          <input
            type="date"
            value={leaveForm.startDate}
            onChange={e => setLeaveForm({...leaveForm, startDate: e.target.value})}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
          <input
            type="date"
            value={leaveForm.endDate}
            onChange={e => setLeaveForm({...leaveForm, endDate: e.target.value})}
            required
            className="w-full border rounded-lg px-3 py-2"
          />
          <textarea
            value={leaveForm.reason}
            onChange={e => setLeaveForm({...leaveForm, reason: e.target.value})}
            placeholder="Reason for leave"
            required
            className="w-full border rounded-lg px-3 py-2 md:col-span-2"
          />
        </div>

        <button type="submit" className="mt-4 bg-[#554CFF] text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
          Apply Leave
        </button>
      </form>

      <div className="bg-white p-6 rounded-2xl shadow max-w-4xl">
        <h3 className="text-lg font-semibold mb-3">Leave History</h3>
        {employeeData.leaveHistory.length > 0 ? (
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-100 text-sm text-gray-600">
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Dates</th>
                <th className="p-2 border">Days</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.leaveHistory.map(l => (
                <tr key={l.id} className="text-sm hover:bg-gray-50">
                  <td className="p-2 border">{l.leave_type}</td>
                  <td className="p-2 border">{l.start_date} → {l.end_date}</td>
                  <td className="p-2 border text-center">{l.days}</td>
                  <td className="p-2 border text-center">{l.status}</td>
                  <td className="p-2 border text-center">
                    {l.status === "PENDING" && (
                      <button onClick={() => handleDeleteLeave(l.id, l.days)} className="text-red-500 hover:text-red-700">
                        🗑️
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No leave applications yet.</p>
        )}
      </div>
    </section>
  );
}
