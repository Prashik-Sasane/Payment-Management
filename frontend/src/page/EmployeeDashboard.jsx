import React, { useState, useEffect } from "react";
import { FaUser, FaHistory, FaFileAlt, FaCalendarAlt, FaCreditCard, FaBell, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

// ✅ Set base URL for backend
axios.defaults.baseURL = "http://localhost:5000";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [activeSection, setActiveSection] = useState("overview");
  const [employeeData, setEmployeeData] = useState({
    name: "",
    employeeId: "",
    department: "",
    position: "",
    salary: 0,
    bankAccounts: [],
    leaveBalance: 15,
    recentTransactions: []
  });

  const [bankForm, setBankForm] = useState({
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    accountHolderName: ""
  });

  const [leaveForm, setLeaveForm] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    days: 0
  });

  // 🧠 Get token from either context or localStorage
  const token = user?.token || localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      setEmployeeData(prev => ({
        ...prev,
        name: user.name,
        employeeId: user.employeeId,
        department: user.department || prev.department,
        position: user.position || prev.position,
        salary: user.salary || prev.salary
      }));

      fetchBankAccounts();
      fetchLeaveBalance();
    }
  }, [user]);

  const fetchBankAccounts = async () => {
    try {
      const response = await axios.get("/api/employee/bank", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployeeData(prev => ({ ...prev, bankAccounts: response.data.accounts || [] }));
    } catch (err) {
      console.error("❌ Failed to fetch bank accounts:", err.response?.data || err.message);
    }
  };

  const fetchLeaveBalance = async () => {
    try {
      const response = await axios.get("/api/employee/leave-balance", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployeeData(prev => ({ ...prev, leaveBalance: response.data.leaveBalance }));
    } catch (err) {
      console.error("❌ Failed to fetch leave balance:", err.response?.data || err.message);
    }
  };

  // ✅ Add Bank Account
  const handleBankSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/employee/bank",
        bankForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message || "Bank account added!");
      setBankForm({ accountNumber: "", bankName: "", ifscCode: "", accountHolderName: "" });
      fetchBankAccounts();
    } catch (err) {
      console.error("❌ Error adding bank account:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to add bank account");
    }
  };

  // ✅ Apply for Leave
  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    const days = Math.ceil((new Date(leaveForm.endDate) - new Date(leaveForm.startDate)) / (1000 * 60 * 60 * 24)) + 1;
    if (days > employeeData.leaveBalance) {
      alert("Insufficient leave balance!");
      return;
    }

    try {
      const response = await axios.post(
        "/api/employee/leave",
        { ...leaveForm, days },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message || "Leave applied successfully!");
      setLeaveForm({ leaveType: "", startDate: "", endDate: "", reason: "", days: 0 });
      setEmployeeData(prev => ({ ...prev, leaveBalance: prev.leaveBalance - days }));
    } catch (err) {
      console.error("❌ Error applying for leave:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to apply for leave");
    }
  };

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: <FaUser /> },
    { id: "bank", label: "Bank Details", icon: <FaCreditCard /> },
    { id: "history", label: "Pay History", icon: <FaHistory /> },
    { id: "leave", label: "Leave Form", icon: <FaFileAlt /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">Employee Portal</h2>
          <p className="text-sm text-gray-600">{user?.name}</p>
          <p className="text-xs text-gray-500">ID: {user?.employeeId}</p>
        </div>
        <nav className="mt-6">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${
                activeSection === item.id
                  ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-700"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Employee Dashboard</h1>
            <div className="flex items-center space-x-4">
              <FaBell className="text-gray-600 cursor-pointer hover:text-blue-600" />
              <FaCog className="text-gray-600 cursor-pointer hover:text-blue-600" />
            </div>
          </div>
        </header>
        
       {activeSection === "overview" && (
          <div className="space-y-8 mt-6">
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-600 text-xl">👤</span> Employee Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-semibold text-gray-900">{employeeData.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Employee ID</p>
                  <p className="font-semibold text-gray-900">{employeeData.employeeId}</p>
                </div>
                <div>
                  <p className="text-gray-600">Department</p>
                  <p className="font-semibold text-gray-900">{employeeData.department || "Finance"}</p>
                </div>
                <div>
                  <p className="text-gray-600">Position</p>
                  <p className="font-semibold text-gray-900">{employeeData.position || "Software Engineer"}</p>
                </div>
                <div>
                  <p className="text-gray-600">Monthly Salary</p>
                  <p className="font-semibold text-green-600">₹{employeeData.salary || 75000}</p>
                </div>
                <div>
                  <p className="text-gray-600">Available Leave Balance</p>
                  <p className="font-semibold text-blue-600">{employeeData.leaveBalance} Days</p>
                </div>
              </div>
            </div>

            {/* Payment Summary Card */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-green-600 text-xl">💰</span> Payment Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-gray-600">Total Salary Received</p>
                  <p className="font-bold text-green-600">
                    ₹{(employeeData.salary || 75000) * 6}
                  </p>
                  <p className="text-sm text-gray-500">Last 6 months</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Payment</p>
                  <p className="font-bold text-gray-900">₹{employeeData.salary || 75000}</p>
                  <p className="text-sm text-gray-500">Credited on Oct 01, 2025</p>
                </div>
                <div>
                  <p className="text-gray-600">Primary Bank</p>
                  <p className="font-bold text-gray-900">
                    {employeeData.bankAccounts[0]?.bank_name || "HDFC Bank"}
                  </p>
                  <p className="text-sm text-gray-500">
                    ****{employeeData.bankAccounts[0]?.account_number?.slice(-4) || "1256"}
                  </p>
                </div>
              </div>
            </div>

            {/* Salary Transaction History */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-gray-600 text-xl">📜</span> Salary Payment History
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                  <thead className="text-gray-700 border-b">
                    <tr>
                      <th className="py-2">Date</th>
                      <th className="py-2">Amount</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Transaction ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Dummy Transactions */}
                    {[
                      { id: 1, date: "25 Sep 2025", amount: 75000, status: "Paid", txn: "TXN89345" },
                      { id: 2, date: "25 Aug 2025", amount: 75000, status: "Paid", txn: "TXN67321" },
                      { id: 3, date: "25 Jul 2025", amount: 75000, status: "Paid", txn: "TXN45319" },
                    ].map((t) => (
                      <tr key={t.id} className="border-b hover:bg-gray-50">
                        <td className="py-2">{t.date}</td>
                        <td className="py-2">₹{t.amount.toLocaleString()}</td>
                        <td className="py-2">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              t.status === "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>
                        <td className="py-2 text-gray-800">{t.txn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}


        <div className="flex-1 p-6 overflow-y-auto">
          {activeSection === "bank" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Bank Account</h3>
                <form onSubmit={handleBankSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["accountNumber", "bankName", "ifscCode", "accountHolderName"].map((field, idx) => (
                      <div key={idx}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field === "accountNumber"
                            ? "Account Number"
                            : field === "bankName"
                            ? "Bank Name"
                            : field === "ifscCode"
                            ? "IFSC Code"
                            : "Account Holder Name"}
                        </label>
                        <input
                          type="text"
                          value={bankForm[field]}
                          onChange={(e) => setBankForm({ ...bankForm, [field]: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Bank Account
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

                  {/* Leave Form Section */}
          {activeSection === "leave" && (
            <div className="space-y-6">
              {/* Leave Balance Display */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Leave Balance</h3>
                <p className="text-gray-700">
                  Available Leave Days:{" "}
                  <span className="font-bold text-blue-600">
                    {employeeData.leaveBalance ?? "Loading..."}
                  </span>
                </p>
              </div>

              {/* Apply Leave Form */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Apply for Leave</h3>
                <form onSubmit={handleLeaveSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Leave Type
                      </label>
                      <select
                        value={leaveForm.leaveType}
                        onChange={(e) =>
                          setLeaveForm({ ...leaveForm, leaveType: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Leave Type</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Paid Leave">Paid Leave</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reason
                      </label>
                      <input
                        type="text"
                        value={leaveForm.reason}
                        onChange={(e) =>
                          setLeaveForm({ ...leaveForm, reason: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={leaveForm.startDate}
                        onChange={(e) =>
                          setLeaveForm({ ...leaveForm, startDate: e.target.value })
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
                        value={leaveForm.endDate}
                        onChange={(e) =>
                          setLeaveForm({ ...leaveForm, endDate: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Apply for Leave
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Pay History Section */}
            {activeSection === "history" && (
              <div className="bg-white p-6 rounded-lg shadow space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment History</h3>

                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="py-2 px-4 border-b">Date</th>
                      <th className="py-2 px-4 border-b">Transaction ID</th>
                      <th className="py-2 px-4 border-b">Amount (₹)</th>
                      <th className="py-2 px-4 border-b">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: "2025-10-01", id: "TXN924381", amount: 75000, status: "Credited" },
                      { date: "2025-09-01", id: "TXN918472", amount: 75000, status: "Credited" },
                      { date: "2025-08-01", id: "TXN903184", amount: 75000, status: "Credited" },
                    ].map((txn, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{txn.date}</td>
                        <td className="py-2 px-4 border-b">{txn.id}</td>
                        <td className="py-2 px-4 border-b text-green-600 font-medium">{txn.amount}</td>
                        <td
                          className={`py-2 px-4 border-b font-semibold ${
                            txn.status === "Credited" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {txn.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
      </div>
    </div>
  );
}

export default EmployeeDashboard;
