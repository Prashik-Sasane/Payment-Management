import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import EmployeeSidebar from "./employee-sidebar/EmployeeSidebar";
import PayHistory from "./container/PayHistory"
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function EmployeeDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  // ------------------ STATE ------------------ //
const [employeeData, setEmployeeData] = useState({
  name: "",
  id: "", 
  department: "",
  position: "",
  salary: 0,
  email: "",
  phone: "",
  bankAccounts: [],
  leaveBalance: 15,
  usedLeaves: 0,
  leaveHistory: [], // ✅ added this (for Leave History section)
});

const [bankForm, setBankForm] = useState({
  accountNumber: "",
  bankName: "",
  ifscCode: "",
  accountHolderName: "",
});

const [leaveForm, setLeaveForm] = useState({
  leaveType: "",
  startDate: "",
  endDate: "",
  reason: "",
  days: 0,
});
// ------------------ FETCH FUNCTIONS ------------------ //

const fetchProfile = async () => {
  try {
    const res = await api.get("/api/employee/profile");
    setUser(res.data.user);
    setEmployeeData((prev) => ({
      ...prev,
      name: res.data.user.name,
      email: res.data.user.email,
      id: res.data.user.id,
      department: res.data.user.department || prev.department,
      position: res.data.user.position || prev.position,
      salary: res.data.user.salary || prev.salary,
      phone: res.data.user.phone || prev.phone,
    }));
  } catch (err) {
    console.error("Failed to fetch profile:", err);
    navigate("/employee/login");
  }
};

const fetchBankAccounts = async () => {
  try {
    const res = await api.get("/api/employee/bank");
    setEmployeeData((prev) => ({
      ...prev,
      bankAccounts: res.data || [],
    }));
  } catch (err) {
    console.error("Failed to fetch bank accounts:", err);
  }
};

const fetchLeaveBalance = async () => {
  try {
    const res = await api.get("/api/employee/leave-balance");
    setEmployeeData((prev) => ({
      ...prev,
      leaveBalance: res.data[0]?.remaining_leaves || prev.leaveBalance,
      usedLeaves: res.data[0]?.used_leaves || prev.usedLeaves,
    }));
  } catch (err) {
    console.error("Failed to fetch leave balance:", err);
  }
};

const fetchLeaveHistory = async () => {
  try {
    const res = await api.get("/api/employee/leave-history");
    setEmployeeData((prev) => ({
      ...prev,
      leaveHistory: res.data || [],
    }));
  } catch (err) {
    console.error("Failed to fetch leave history:", err);
  }
};

// Combined fetch function
const fetchEmployeeData = async () => {
  await Promise.all([
    fetchProfile(),
    fetchBankAccounts(),
    fetchLeaveBalance(),
    fetchLeaveHistory(),
  ]);
};

useEffect(() => {
  fetchEmployeeData();
}, []);

const handleBankSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/api/employee/bank", bankForm);
    alert(res.data.message || "Bank account added successfully!");
    setBankForm({
      accountNumber: "",
      bankName: "",
      ifscCode: "",
      accountHolderName: "",
    });

    await fetchEmployeeData(); //  Refresh data
    setActiveSection("overview"); //  Navigate to Overview
  } catch (err) {
    alert(err.response?.data?.error || "Failed to add bank account");
  }
};

const handleDeleteBank = async (accountId) => {
  if (!window.confirm("Are you sure you want to delete this bank account?")) return;
  
  try {
    const res = await api.delete(`/api/employee/bank/${accountId}`);
    alert(res.data.message);

    // Remove from state without refreshing
    setEmployeeData((prev) => ({
      ...prev,
      bankAccounts: prev.bankAccounts.filter((acc) => acc.id !== accountId),
    }));
  } catch (err) {
    alert(err.response?.data?.error || "Failed to delete bank account");
  }
};


const handleLeaveSubmit = async (e) => {
  e.preventDefault();
  const { startDate, endDate } = leaveForm;
  const days =
    Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;

  if (days > employeeData.leaveBalance) {
    alert("Insufficient leave balance!");
    return;
  }

  try {
    const res = await api.post("/api/employee/leave", { ...leaveForm, days });
    alert(res.data.message || "Leave applied successfully!");

    setLeaveForm({
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
      days: 0,
    });

    await fetchEmployeeData(); //  Refresh backend data
    setActiveSection("overview"); //  Return to overview
  } catch (err) {
    alert(err.response?.data?.error || "Failed to apply leave");
  }
};

const handleDeleteLeave = async (leaveId, days) => {
  if (!window.confirm("Are you sure you want to delete this leave?")) return;

  try {
    await api.delete(`/api/employee/leave/${leaveId}`);

    // Update state
    setEmployeeData((prev) => ({
      ...prev,
      leaveBalance: prev.leaveBalance + days,
      usedLeaves: prev.usedLeaves - days,
      leaveHistory: prev.leaveHistory.filter((l) => l.id !== leaveId),
    }));

    alert("Leave deleted successfully!");
  } catch (err) {
    console.error("Failed to delete leave:", err);
    alert("Failed to delete leave");
  }
};


const handleProfileUpdate = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await api.put("/api/employee/update-profile", employeeData);
    alert("Profile updated successfully!");
    await fetchEmployeeData(); // Refresh
    setActiveSection("overview"); // Return to overview
  } catch (err) {
    alert("Failed to update profile");
  } finally {
    setLoading(false);
  }
};

  // ------------------ SALARY GRAPH ------------------ //
  const salaryData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Salary Received (₹)",
        data: [45000, 46000, 47000, 47000, 47500, 48000, 49000, employeeData.salary],
        backgroundColor: "rgba(99, 102, 241, 0.6)",
        borderColor: "#6366f1",
        borderWidth: 1,
      },
    ],
  };

  const salaryOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Salary Overview" },
    },
  };

  // ------------------ RENDER ------------------ //
  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      {/* Sidebar */}
      <EmployeeSidebar
        user={user}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen p-6">
        <h1 className="text-3xl font-semibold px-8 mb-6 text-[#222B45]">
          Employee Dashboard
        </h1>

        <main className="flex-1 p-4 px-6">
          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="space-y-8">
              {/* Profile Card */}
              <div className="bg-white rounded-xl shadow-md p-8 flex items-center gap-8 flex-wrap">
                <img
                  src={user?.avatar || "https://i.pravatar.cc/80"}
                  alt={employeeData.name}
                  className="w-20 h-20 rounded-full border-2 border-indigo-500 object-cover"
                />
                <div className="flex-1 min-w-[200px]">
                  <h2 className="text-xl font-bold text-[#222B45] mb-1">
                    Welcome, {employeeData.name}
                  </h2>
                  <p className="text-gray-500 font-medium">{employeeData.position} • {employeeData.department}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                      ID: {employeeData.id}
                    </span>
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                      Salary: ₹{employeeData.salary}
                    </span>
                    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Leave: {employeeData.leaveBalance} days
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Email</h3>
                  <p className="text-lg font-semibold text-gray-800">{employeeData.email}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Phone</h3>
                  <p className="text-lg font-semibold text-gray-800">{employeeData.phone}</p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Used Leave</h3>
                  <p className="text-lg font-semibold text-red-600">{employeeData.usedLeaves} days</p>
                </div>
              </div>

            {/* Salary and Bank Summary - aligned side by side on medium+ screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  {/* Salary Graph */}
                  <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
                    <h2 className="text-lg font-bold mb-4">💰 Salary Trend</h2>
                    <div className="flex-grow min-h-[200px]">
                      <Bar data={salaryData} options={salaryOptions} />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md overflow-y-auto max-h-[360px]">
                    <h2 className="text-lg font-bold mb-3">🏦 Current Salary</h2>
                    {employeeData.bankAccounts.length === 0 ? (
                      <p className="text-gray-500">Current Salary is not added yet</p>
                    ) : (
                      <div className="space-y-4">
                        {employeeData.bankAccounts.map((acc, idx) => (
                          <div key={idx} className="border-b pb-2">
                            <p className="font-semibold">{acc.bank_name}</p>
                            <p className="text-gray-600 text-sm">
                              ****{acc.account_number.slice(-4)} | IFSC: {acc.ifsc_code}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div> 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Leave */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <h2 className="text-lg font-bold mb-3">🏖️ Leave Summary</h2>
                  <p>
                    <strong>Available:</strong>{" "}
                    <span className="text-green-600 font-semibold">
                      {employeeData.leaveBalance} Days
                    </span>
                  </p>
                  <p>
                    <strong>Used:</strong>{" "}
                    <span className="text-red-600 font-semibold">
                      {employeeData.usedLeaves} Days
                    </span>
                  </p>
                </div>

               
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-lg font-bold mb-3">🏦 Bank Details</h2>
                  {employeeData.bankAccounts.length === 0 ? (
                    <p className="text-gray-500">No bank accounts added yet.</p>
                  ) : (
                    employeeData.bankAccounts.map((acc, idx) => (
                      <div key={idx} className="mb-2 border-b pb-2">
                        <p className="font-semibold">{acc.bank_name}</p>
                        <p className="text-gray-600 text-sm">
                          ****{acc.account_number.slice(-4)} | IFSC: {acc.ifsc_code}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === "bank" && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Bank Details</h2>

                <form
                  onSubmit={handleBankSubmit}
                  className="bg-white p-6 rounded-2xl shadow mb-6 max-w-lg"
                >
                  <h3 className="text-lg font-semibold mb-4">Add Bank Account</h3>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Account Holder Name</label>
                      <input
                        type="text"
                        name="accountHolderName"
                        value={bankForm.accountHolderName}
                        onChange={(e) =>
                          setBankForm({ ...bankForm, accountHolderName: e.target.value })
                        }
                        required
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter account holder name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Account Number</label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={bankForm.accountNumber}
                        onChange={(e) =>
                          setBankForm({ ...bankForm, accountNumber: e.target.value })
                        }
                        required
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter account number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Bank Name</label>
                      <input
                        type="text"
                        name="bankName"
                        value={bankForm.bankName}
                        onChange={(e) =>
                          setBankForm({ ...bankForm, bankName: e.target.value })
                        }
                        required
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter bank name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">IFSC Code</label>
                      <input
                        type="text"
                        name="ifscCode"
                        value={bankForm.ifscCode}
                        onChange={(e) =>
                          setBankForm({ ...bankForm, ifscCode: e.target.value })
                        }
                        required
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter IFSC code"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 bg-[#554CFF] text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                  >
                    Add Account
                  </button>
                </form>

                {/* Bank Accounts List */}
                <div className="bg-white p-6 rounded-2xl shadow">
                  <h3 className="text-lg font-semibold mb-3">Your Bank Accounts</h3>

                  {employeeData.bankAccounts && employeeData.bankAccounts.length > 0 ? (
                    <ul>
                      {employeeData.bankAccounts.map((acc, idx) => (
                        <li
                          key={idx}
                          className="border-b py-3 flex items-center justify-between"
                        >
                          <div>
                            <p className="font-semibold">
                              {acc.bank_name} — {acc.account_number}
                            </p>
                            <p className="text-sm text-gray-500">IFSC: {acc.ifsc_code}</p>
                            <p className="text-sm text-gray-500">
                              Holder: {acc.account_holder_name}
                            </p>
                          </div>

                          {/* 🗑 Delete Button */}
                          <button
                            onClick={() => handleDeleteBank(acc.id)}
                            className="text-red-600 hover:text-red-800 font-semibold text-sm"
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No bank accounts added yet.</p>
                  )}
                </div>
              </section>
            )}

            {activeSection === "history" && (
              <PayHistory/>
              )}

            {activeSection === "leave" && (
                  <section>
                    <h2 className="text-2xl font-bold mb-6">Leave Application</h2>

                    {/* Leave Form */}
                    <form
                      onSubmit={handleLeaveSubmit}
                      className="bg-white p-6 rounded-2xl shadow mb-8 max-w-2xl"
                    >
                      <h3 className="text-lg font-semibold mb-4">Apply for Leave</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Leave Type</label>
                          <select
                            name="leaveType"
                            value={leaveForm.leaveType}
                            onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value })}
                            required
                            className="w-full border rounded-lg px-3 py-2"
                          >
                            <option value="">Select Type</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Earned Leave">Earned Leave</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Start Date</label>
                          <input
                            type="date"
                            name="startDate"
                            value={leaveForm.startDate}
                            onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                            required
                            className="w-full border rounded-lg px-3 py-2"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">End Date</label>
                          <input
                            type="date"
                            name="endDate"
                            value={leaveForm.endDate}
                            onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                            required
                            className="w-full border rounded-lg px-3 py-2"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Reason</label>
                          <textarea
                            name="reason"
                            value={leaveForm.reason}
                            onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                            required
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="Explain your reason for leave"
                          ></textarea>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="mt-4 bg-[#554CFF] text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                      >
                        Apply Leave
                      </button>
                    </form>

                    {/* Leave Summary */}
                    <div className="bg-white p-6 rounded-2xl shadow mb-8 max-w-2xl">
                      <h3 className="text-lg font-semibold mb-3">Leave Summary</h3>
                      <div className="flex items-center gap-8 text-lg">
                        <p>
                          <strong>Available:</strong>{" "}
                          <span className="text-green-600 font-semibold">{employeeData.leaveBalance} Days</span>
                        </p>
                        <p>
                          <strong>Used:</strong>{" "}
                          <span className="text-red-600 font-semibold">{employeeData.usedLeaves} Days</span>
                        </p>
                      </div>
                    </div>

                    {/* Leave History */}
                    <div className="bg-white p-6 rounded-2xl shadow max-w-4xl">
                      <h3 className="text-lg font-semibold mb-3">Leave History</h3>
                      {employeeData.leaveHistory && employeeData.leaveHistory.length > 0 ? (
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
                            {employeeData.leaveHistory.map((leave) => (
                              <tr key={leave.id} className="text-sm hover:bg-gray-50">
                                <td className="p-2 border">{leave.leave_type}</td>
                                <td className="p-2 border">
                                  {leave.start_date} → {leave.end_date}
                                </td>
                                <td className="p-2 border text-center">{leave.days}</td>
                                <td className="p-2 border text-center">
                                  {leave.status === "APPROVED" && (
                                    <span className="text-green-600 font-semibold">Approved</span>
                                  )}
                                  {leave.status === "REJECTED" && (
                                    <span className="text-red-600 font-semibold">Rejected</span>
                                  )}
                                  {leave.status === "PENDING" && (
                                    <span className="text-yellow-600 font-semibold">Pending</span>
                                  )}
                                </td>
                                <td className="p-2 border text-center">
                                  {leave.status === "PENDING" && (
                                    <button
                                      onClick={() => handleDeleteLeave(leave.id, leave.days)}
                                      className="text-red-500 hover:text-red-700"
                                      title="Delete Leave"
                                    >
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
                )}

        {activeSection === "edit-profile" && (
            <section className="flex-1 p-8 bg-gray-50 min-h-screen overflow-y-auto">
              <h2 className="text-2xl font-bold text-[#222B45] mb-6">Edit Profile</h2>

              <form
                onSubmit={handleProfileUpdate}
                className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl"
              >
                {/* Full Name */}
                <div className="mb-4">
                  <label className="block text-gray-600 font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={employeeData.name || ""}
                    onChange={(e) =>
                      setEmployeeData({ ...employeeData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#554CFF]"
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-gray-600 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={employeeData.email || ""}
                    onChange={(e) =>
                      setEmployeeData({ ...employeeData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#554CFF]"
                  />
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                  <label className="block text-gray-600 font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={employeeData.phone || ""}
                    onChange={(e) =>
                      setEmployeeData({ ...employeeData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#554CFF]"
                  />
                </div>

                {/* Department */}
                <div className="mb-4">
                  <label className="block text-gray-600 font-semibold mb-2">
                    Department
                  </label>
                  <select
                    value={employeeData.department || ""}
                    onChange={(e) =>
                      setEmployeeData({ ...employeeData, department: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#554CFF]"
                  >
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>

                {/* Position */}
                <div className="mb-4">
                  <label className="block text-gray-600 font-semibold mb-2">
                    Position
                  </label>
                  <select
                    value={employeeData.position || ""}
                    onChange={(e) =>
                      setEmployeeData({ ...employeeData, position: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#554CFF]"
                  >
                    <option value="">Select Position</option>
                    <option value="Intern">Intern</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>

                {/* Salary */}
                <div className="mb-6">
                  <label className="block text-gray-600 font-semibold mb-2">
                    Salary (₹)
                  </label>
                  <input
                    type="number"
                    value={employeeData.salary || ""}
                    onChange={(e) =>
                      setEmployeeData({ ...employeeData, salary: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#554CFF]"
                  />
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 rounded-lg text-white font-semibold transition-all ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#554CFF] hover:bg-[#443BCC]"
                    }`}
                  >
                    {loading ? "Saving..." : "Update Profile"}
                  </button>
                </div>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
