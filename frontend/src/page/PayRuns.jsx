import React, { useState } from "react";
import { FaPlay, FaPause, FaCheck, FaTimes, FaDownload } from "react-icons/fa";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye, FaFilter , FaUserCircle , FaThLarge , FaUsers , FaTasks , FaQuestionCircle , FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-72 h-screen sticky top-0 bg-white border-r border-gray-200 flex flex-col px-6 py-8 overflow-auto">
      <div className="flex items-center mb-10">
        <FaUserCircle size={42} className="text-sky-500 mr-3" />
        <div>
          <div className="font-bold">Rajesh Sharma</div>
          <div className="text-xs text-gray-600">HR Manager</div>
        </div>
      </div>
      <nav className="flex flex-col gap-2 mb-10">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded font-medium text-sky-500 bg-sky-50"
        >
          <FaThLarge className="text-lg" /> Dashboard
        </a>

        <Link
          to="/payruns"
          className="flex items-center gap-3 px-3 py-2 rounded font-medium text-sky-700 hover:bg-sky-100 transition"
        >
          <FaUsers className="text-lg" /> Payroll
        </Link>
        <Link
          to="/employees"
          className="flex items-center gap-3 px-3 py-2 rounded font-medium text-sky-700 hover:bg-sky-100 transition"
        >
          <FaUsers className="text-lg" /> Employees
        </Link>
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded font-medium text-sky-700 hover:bg-sky-100 transition"
        >
          <FaTasks className="text-lg" /> Tasks
          <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">
            2
          </span>
        </a>
      </nav>
      <div className="flex flex-col gap-2">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded font-medium text-gray-600 hover:bg-gray-100 transition"
        >
          <FaQuestionCircle className="text-lg" /> Help Center
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded font-medium text-gray-600 hover:bg-gray-100 transition"
        >
          <FaCog className="text-lg" /> Settings
        </a>
      </div>
      <div className="mt-auto pt-10 flex items-center gap-2 text-xs text-gray-400">
        <div className="rounded-md bg-sky-100 p-1 text-sky-500 font-bold">H</div>
        <span>Happytech</span>
      </div>
    </aside>
  );
}

function PayRuns() {
  const [payRuns, setPayRuns] = useState([
    {
      id: 1,
      name: "May 2024 Pay Run",
      period: "May 1 - May 31, 2024",
      status: "Completed",
      totalEmployees: 1308,
      totalAmount: 172523654,
      processedDate: "2024-05-31",
      createdBy: "Meera Krishnan"
    },
    {
      id: 2,
      name: "April 2024 Pay Run",
      period: "April 1 - April 30, 2024",
      status: "Completed",
      totalEmployees: 1305,
      totalAmount: 170123654,
      processedDate: "2024-04-30",
      createdBy: "Meera Krishnan"
    },
    {
      id: 3,
      name: "June 2024 Pay Run",
      period: "June 1 - June 30, 2024",
      status: "In Progress",
      totalEmployees: 1310,
      totalAmount: 0,
      processedDate: null,
      createdBy: "Meera Krishnan"
    },
    {
      id: 4,
      name: "July 2024 Pay Run",
      period: "July 1 - July 31, 2024",
      status: "In Progress",
      totalEmployees: 1310,
      totalAmount: 0,
      processedDate: null,
      createdBy: "Meera Krishnan"
    },
    {
      id: 5,
      name: "June 2024 Pay Run",
      period: "June 1 - June 30, 2024",
      status: "In Progress",
      totalEmployees: 1310,
      totalAmount: 0,
      processedDate: null,
      createdBy: "Meera Krishnan"
    },
    {
      id: 6,
      name: "July 2024 Pay Run",
      period: "July 1 - July 31, 2024",
      status: "In Progress",
      totalEmployees: 1310,
      totalAmount: 0,
      processedDate: null,
      createdBy: "Meera Krishnan"
    },
    {
      id: 7,
      name: "August 2024 Pay Run",
      period: "August 1 - August 31, 2024",
      status: "In Progress",
      totalEmployees: 1310,
      totalAmount: 0,
      processedDate: null,
      createdBy: "Meera Krishnan"
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPayRun, setNewPayRun] = useState({
    name: "",
    startDate: "",
    endDate: ""
  });

  const handleCreatePayRun = (e) => {
    e.preventDefault();
    const payRun = {
      id: payRuns.length + 1,
      ...newPayRun,
      period: `${newPayRun.startDate} - ${newPayRun.endDate}`,
      status: "Draft",
      totalEmployees: 0,
      totalAmount: 0,
      processedDate: null,
      createdBy: "Meera Krishnan"
    };
    setPayRuns([payRun, ...payRuns]);
    setNewPayRun({ name: "", startDate: "", endDate: "" });
    setShowCreateModal(false);
  };

  const handleProcessPayRun = (id) => {
    setPayRuns(payRuns.map(pr => 
      pr.id === id 
        ? { ...pr, status: "In Progress" }
        : pr
    ));
  };

  const handleCompletePayRun = (id) => {
    setPayRuns(payRuns.map(pr => 
      pr.id === id 
        ? { 
            ...pr, 
            status: "Completed", 
            processedDate: new Date().toISOString().split('T')[0],
            totalAmount: 172523654,
            totalEmployees: 1308
          }
        : pr
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex">
      <Sidebar />
    <div className="p-6 bg-gray-50 min-h-screen flex-1">
      <div className="w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pay Runs</h1>
              <p className="text-gray-600 mt-2">Manage and process employee payments</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Pay Run
            </button>
          </div>
        </div>

        {/* Pay Runs List */}
        <div className="space-y-4">
          {payRuns.map((payRun) => (
            <div key={payRun.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{payRun.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payRun.status)}`}>
                      {payRun.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{payRun.period}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Total Employees</p>
                      <p className="text-lg font-semibold text-gray-900">{payRun.totalEmployees}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {payRun.totalAmount > 0 ? `₹${payRun.totalAmount.toLocaleString()}` : 'Not calculated'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Processed Date</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {payRun.processedDate || 'Not processed'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created By</p>
                      <p className="text-lg font-semibold text-gray-900">{payRun.createdBy}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {payRun.status === 'Draft' && (
                    <button
                      onClick={() => handleProcessPayRun(payRun.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <FaPlay />
                      Process
                    </button>
                  )}
                  {payRun.status === 'In Progress' && (
                    <button
                      onClick={() => handleCompletePayRun(payRun.id)}
                      className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      <FaCheck />
                      Complete
                    </button>
                  )}
                  {payRun.status === 'Completed' && (
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                        <FaDownload />
                        Download
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        <FaEye />
                        View Details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Pay Run Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Create New Pay Run</h2>
              <form onSubmit={handleCreatePayRun} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pay Run Name</label>
                  <input
                    type="text"
                    value={newPayRun.name}
                    onChange={(e) => setNewPayRun({...newPayRun, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., June 2024 Pay Run"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newPayRun.startDate}
                    onChange={(e) => setNewPayRun({...newPayRun, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newPayRun.endDate}
                    onChange={(e) => setNewPayRun({...newPayRun, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Create Pay Run
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default PayRuns;
