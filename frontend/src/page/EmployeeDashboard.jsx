import React, { useState, useEffect } from "react";
import { FaUser, FaHistory, FaFileAlt, FaCalendarAlt, FaCreditCard, FaBell, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

// Set base URL for backend
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
      alert(err.response?.data?.error || "Failed to add bank account");
    }
  };

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();

    if(!isNaN(start) || !isNaN(end)){
      alert('Invalid Date plz provide the correct date');
      return;
    }

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
    <div className="flex min-h-screen font-sans bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white py-8 px-4 flex flex-col sticky top-0 h-screen border-r border-gray-200">
        <h2 className="text-2xl font-bold text-[#222B45] px-4 mb-4">Employee Portal</h2>
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 bg-[#F4F4F6] px-4 py-2 rounded-xl">
              <img src={user?.avatar || "https://i.pravatar.cc/40"} className="w-8 h-8 rounded-full" alt="" />
              <span className="font-semibold text-[#222B45]">{user?.name}</span>
              <span className="text-xs text-gray-500">ID: {user?.employeeId}</span>
            </span>
          </div>
        </header>
        <nav className="flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center px-6 py-3 my-1 rounded-xl transition-all font-medium gap-3 text-lg
                ${activeSection === item.id
                  ? "bg-[#554CFF] text-white shadow"
                  : "text-[#505887] hover:bg-[#F1F0FF]"}
              `}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen p-6">        
        <div>
            <h1 className="text-3xl font-semibold px-8 mb-6 text-[#222B45]">Employee Dashboard</h1>
          </div>
        <main className="p-4 px-6 flex-1">
          {/* Overview Cards */}
          {activeSection === "overview" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="rounded-2xl bg-white border border-t-4 border-green-600 p-6 flex flex-col">
                  <span className="bg-[#F1F0FF] rounded-xl w-9 h-9 flex items-center justify-center text-[#554CFF]"><FaFileAlt /></span>
                  <span className="font-semibold text-lg mt-3">Generate Financial Report</span>
                  <span className="text-[#8E95A9] text-sm">Analyze your financial report easily.</span>
                  <button className="bg-[#554CFF] hover:bg-[#3F34D1] transition px-5 py-2 mt-4 rounded-xl text-white font-bold">Generate Report</button>
                </div>

                <div className="rounded-2xl bg-white p-6 border border-t-4 border-red-500 flex flex-col">
                  <span className="bg-[#F1F0FF] rounded-xl w-9 h-9 flex items-center justify-center text-[#554CFF]"><FaCreditCard /></span>
                  <span className="text-3xl font-bold text-[#222B45] mt-3">₹{(employeeData.salary || 75000).toLocaleString()}</span>
                  <span className="text-[#8E95A9] text-xs">Monthly Payroll</span>
                  <span className="text-red-600 font-bold text-sm mt-1">-18.24%</span>
                </div>

                <div className="rounded-2xl bg-white border border-t-4 border-indigo-500 p-6 flex flex-col">
                  <span className="bg-[#F1F0FF] rounded-xl w-9 h-9 flex items-center justify-center text-[#554CFF]"><FaCalendarAlt /></span>
                  <span className="text-3xl font-bold text-[#222B45] mt-3">₹429,862.92</span>
                  <span className="text-[#8E95A9] text-xs">Company Expenses</span>
                  <span className="text-green-600 font-bold text-sm mt-1">+24.92%</span>
                </div>
              </div>

              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="rounded-2xl bg-white border border-t-4 border-fuchsia-600 p-6">
                  <h3 className="font-semibold text-[#554CFF] text-lg mb-4 flex gap-2 items-center"><FaUser />Employee Details</h3>
                  <div className="mb-2"><span className="text-[#505887]">Name:</span> <span className="text-[#222B45] font-medium">{employeeData.name}</span></div>
                  <div className="mb-2"><span className="text-[#505887]">Employee ID:</span> <span className="text-[#222B45] font-medium">{employeeData.employeeId}</span></div>
                  <div className="mb-2"><span className="text-[#505887]">Department:</span> <span className="text-[#222B45] font-medium">{employeeData.department || "Finance"}</span></div>
                  <div className="mb-2"><span className="text-[#505887]">Position:</span> <span className="text-[#222B45] font-medium">{employeeData.position || "Software Engineer"}</span></div>
                  <div className="mb-2"><span className="text-[#505887]">Monthly Salary:</span> <span className="text-green-600 font-semibold">₹{employeeData.salary || 75000}</span></div>
                  <div><span className="text-[#505887]">Leave Balance:</span> <span className="text-[#554CFF] font-semibold">{employeeData.leaveBalance} Days</span></div>
                </div>
                
                <div className="rounded-2xl bg-white border border-[#d7d7d7] p-6">
                  <h3 className="font-semibold text-lg text-[#554CFF] mb-4 flex gap-2 items-center"><FaCreditCard />Payment Summary</h3>
                  <div className="mb-3">Total Salary Received: <span className="font-bold text-green-600">₹{(employeeData.salary || 75000) * 6}</span></div>
                  <div className="mb-3">Last Payment: <span className="font-bold text-[#222B45]">₹{employeeData.salary || 75000}</span> <span className="text-xs text-[#8E95A9]">(Oct 01, 2025)</span></div>
                  <div>
                    Primary Bank: <span className="font-semibold text-[#222B45]">{employeeData.bankAccounts[0]?.bank_name || "HDFC Bank"}</span> <span className="ml-2 text-[#8E95A9]">****{employeeData.bankAccounts[0]?.account_number?.slice(-4) || "1256"}</span>
                  </div>
                </div>
              </div>

              
              <div className="rounded-2xl border-t-4 border-sky-500 p-6 bg-white">
                <h3 className="font-semibold text-lg text-[#554CFF] mb-4 flex items-center gap-2"><FaHistory /> Salary Payment History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-[#505887]">
                    <thead className="text-[#222B45] border-b">
                      <tr>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Txn ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 1, date: "25 Sep 2025", amount: 75000, status: "Paid", txn: "TXN89345" },
                        { id: 2, date: "25 Aug 2025", amount: 75000, status: "Paid", txn: "TXN67321" },
                        { id: 3, date: "25 Jul 2025", amount: 75000, status: "Paid", txn: "TXN45319" },
                      ].map((t) => (
                        <tr key={t.id} className="border-b border-gray-300 hover:bg-[#F7F8FA] text-black">
                          <td className="py-2 px-4">{t.date}</td>
                          <td className="py-2 px-4">₹{t.amount.toLocaleString()}</td>
                          <td className="py-2 px-4">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full
                              ${t.status === "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"}`}>
                              {t.status}
                            </span>
                          </td>
                          <td className="py-2 px-4">{t.txn}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          
          <div className="flex-1 p-8 overflow-y-auto">
          {activeSection === "bank" && (
            <div className="max-w-3xl mx-auto space-y-8 border-gray-400 rounded-lg shadow-md">
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-xl font-bold text-[#222B45] mb-6 flex items-center gap-2">
                  <FaCreditCard className="text-[#554CFF]" /> Add Bank Account
                </h3>
                <form onSubmit={handleBankSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["accountNumber", "bankName", "ifscCode", "accountHolderName"].map((field, idx) => (
                      <div key={idx}>
                        <label className="block text-sm font-semibold text-[#505887] mb-2">
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
                          className="w-full px-4 py-3 border border-[#E6E7EC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#554CFF] text-[#222B45] font-medium text-base shadow-sm"
                        placeholder={field === "accountNumber" ? "Enter account number" : field === "bankName" ? "e.g. HDFC Bank" : field === "ifscCode" ? "IFSC (e.g. HDFC0001234)" : "Account holder full name"}
                        inputMode={field === "accountNumber" ? "numeric" : "text"}
                        maxLength={field === "ifscCode" ? 11 : undefined}
                        onInput={(e) => { if (field === "ifscCode") e.target.value = e.target.value.toUpperCase(); }}
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="mt-4 bg-[#554CFF] hover:bg-[#3F34D1] transition px-7 py-3 rounded-xl text-white font-bold text-lg shadow"
                  >
                    Add Bank Account
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeSection === "leave" && (
            <div className="max-w-3xl mx-auto space-y-8 rounded-lg shadow-md bg-white">
              <div className="rounded-2xl p-8">
                <h3 className="text-xl font-bold text-[#222B45] mb-4">Leave Balance</h3>
                <p className="text-[#505887] text-lg">
                  Available Leave Days:{" "}
                  <span className="font-bold text-[#554CFF]">
                    {employeeData.leaveBalance ?? "Loading..."}
                  </span>
                </p>
              </div>

             
              <div className="rounded-2xl p-8">
                <h3 className="text-xl font-bold text-[#222B45] mb-6 flex items-center gap-2">
                  <FaCalendarAlt className="text-[#554CFF]" /> Apply for Leave
                </h3>
                <form onSubmit={handleLeaveSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#505887] mb-2">Leave Type</label>
                      <select
                        value={leaveForm.leaveType}
                        onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E6E7EC] rounded-xl bg-white focus:ring-2 focus:ring-[#554CFF] text-[#222B45] font-medium shadow-sm"
                        required
                      >
                        <option value="">Select Leave Type</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Paid Leave">Paid Leave</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#505887] mb-2">Reason</label>
                      <input
                        type="text"
                        value={leaveForm.reason}
                        onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                        placeholder="Enter Your Reason"
                        className="w-full px-4 py-3 border border-[#E6E7EC] rounded-xl focus:ring-2 focus:ring-[#554CFF] text-[#222B45] font-medium shadow-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#505887] mb-2">Start Date</label>
                      <input
                        type="date"
                        value={leaveForm.startDate}
                        onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E6E7EC] rounded-xl focus:ring-2 focus:ring-[#554CFF] text-[#222B45] font-medium shadow-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#505887] mb-2">End Date</label>
                      <input
                        type="date"
                        value={leaveForm.endDate}
                        onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E6E7EC] rounded-xl focus:ring-2 focus:ring-[#554CFF] text-[#222B45] font-medium shadow-sm"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 bg-[#16C784] hover:bg-[#108B5E] transition px-7 py-3 rounded-xl text-white font-bold text-lg shadow"
                  >
                    Apply for Leave
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeSection === "history" && (
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
              <div className="rounded-2xl p-8">
                <h3 className="text-xl font-bold text-[#222B45] mb-6 flex items-center gap-2 tracking-wide">
                  <FaHistory className="text-[#554CFF]" /> Payment History
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-2xl">
                    <thead>
                      <tr className="bg-[#F1F0FF] text-left text-[#505887] font-semibold">
                        <th className="py-3 px-5 uppercase tracking-wide text-xs">Date</th>
                        <th className="py-3 px-5 uppercase tracking-wide text-xs">Transaction ID</th>
                        <th className="py-3 px-5 uppercase tracking-wide text-xs">Amount (₹)</th>
                        <th className="py-3 px-5 uppercase tracking-wide text-xs">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { date: "2025-10-01", id: "TXN924381", amount: 75000, status: "Credited" },
                        { date: "2025-09-01", id: "TXN918472", amount: 75000, status: "Credited" },
                        { date: "2025-08-01", id: "TXN903184", amount: 75000, status: "Credited" },
                      ].map((txn, index) => (
                        <tr key={index} className="hover:bg-[#F7F8FA] transition">
                          <td className="py-3 px-8 font-medium text-[#222B45]">{txn.date}</td>
                          <td className="py-3 px-8">{txn.id}</td>
                          <td className="py-3 px-8 text-[#16C784] font-semibold">{txn.amount}</td>
                          <td className={`py-3 px-8 font-semibold ${txn.status === "Credited" ? "text-[#16C784]" : "text-red-500"}`}>
                            {txn.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
         </div>    
        </main>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
