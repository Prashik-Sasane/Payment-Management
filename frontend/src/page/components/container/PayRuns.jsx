import React, { useState, useEffect } from "react";
import { FaPlay, FaCheck, FaDownload, FaEye, FaTrash } from "react-icons/fa";
import Sidebar from "../hr-sidebar/Sidebar.jsx";
import api from "../../../api/axios.jsx";

const PayRuns = () => {
  const [payRuns, setPayRuns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPayRun, setNewPayRun] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  // =========================
  // FETCH ALL PAY RUNS
  // =========================
  useEffect(() => {
    fetchPayRuns();
  }, []);

  const fetchPayRuns = async () => {
    try {
      const res = await api.get("/api/payroll");
      setPayRuns(res.data);
    } catch (err) {
      console.error("Error fetching payroll:", err);
    }
  };

  // =========================
  // CREATE PAY RUN
  // =========================
  const handleCreatePayRun = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/payroll/create", newPayRun);
      setPayRuns([res.data, ...payRuns]);
      setNewPayRun({ name: "", startDate: "", endDate: "" });
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Error creating pay run!");
    }
  };

  // =========================
  // PROCESS PAY RUN
  // =========================
  const handleProcessPayRun = async (id) => {
    const bonusPercent = window.prompt("Enter bonus % (optional):", 0);
    try {
      await api.post(`/api/payroll/process/${id}`, {
        bonusPercent: Number(bonusPercent),
      });
      alert("Payroll processed successfully!");
      fetchPayRuns();
    } catch (err) {
      console.error(err);
      alert("Error processing payroll!");
    }
  };

  // =========================
  // COMPLETE PAY RUN
  // =========================
  const handleCompletePayRun = async (id) => {
    try {
      await api.put(`/api/payroll/complete/${id}`);
      alert("Pay run marked as completed!");
      fetchPayRuns();
    } catch (err) {
      console.error(err);
      alert("Error completing pay run!");
    }
  };

  // =========================
  // DELETE PAY RUN
  // =========================
  const handleDeletePayRun = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this pay run?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/payroll/${id}`);
      alert("Pay run deleted successfully!");
      fetchPayRuns();
    } catch (err) {
      console.error("Error deleting pay run:", err);
      alert("Failed to delete pay run!");
    }
  };

  // =========================
  // STATUS COLOR LOGIC
  // =========================
  const getStatusColor = (status) => {
    const colors = {
      Completed: "bg-green-100 text-green-800",
      "In Progress": "bg-yellow-100 text-yellow-800",
      Draft: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-50 p-8">
       
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pay Runs</h1>
            <p className="text-gray-600">
              Manage and process employee payments
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Create New Pay Run
          </button>
        </div>

        {/* Pay Run List */}
        <div className="space-y-4">
          {payRuns.length === 0 ? (
            <p className="text-gray-600">No pay runs found.</p>
          ) : (
            payRuns.map((run) => (
              <div
                key={run.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
              >
                <div className="flex justify-between flex-wrap gap-4">
                  {/* Pay Run Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {run.name}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          run.status
                        )}`}
                      >
                        {run.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {run.startDate} - {run.endDate}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Total Employees</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {run.totalEmployees || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {run.totalAmount
                            ? `₹${run.totalAmount.toLocaleString()}`
                            : "Not calculated"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Processed Date</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {run.processedDate || "Not processed"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Created By</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {run.createdBy}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {run.status === "Draft" && (
                      <button
                        onClick={() => handleProcessPayRun(run.id)}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        <FaPlay /> Process
                      </button>
                    )}
                    {run.status === "In Progress" && (
                      <button
                        onClick={() => handleCompletePayRun(run.id)}
                        className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        <FaCheck /> Complete
                      </button>
                    )}
                    {run.status === "Completed" && (
                      <>
                        <button className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                          <FaDownload /> Download
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                          <FaEye /> View
                        </button>
                      </>
                    )}
                    {/* 🗑️ Delete button (always visible) */}
                    <button
                      onClick={() => handleDeletePayRun(run.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create Pay Run Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
              <h2 className="text-xl font-bold mb-4">Create New Pay Run</h2>
              <form onSubmit={handleCreatePayRun} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pay Run Name
                  </label>
                  <input
                    type="text"
                    value={newPayRun.name}
                    onChange={(e) =>
                      setNewPayRun({ ...newPayRun, name: e.target.value })
                    }
                    placeholder="e.g., August 2025 Pay Run"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newPayRun.startDate}
                      onChange={(e) =>
                        setNewPayRun({
                          ...newPayRun,
                          startDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={newPayRun.endDate}
                      onChange={(e) =>
                        setNewPayRun({
                          ...newPayRun,
                          endDate: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayRuns;
