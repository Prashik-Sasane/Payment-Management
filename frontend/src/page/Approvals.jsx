import React, { useState } from "react";
import { FaCheck, FaTimes, FaEye, FaClock } from "react-icons/fa";

function Approvals() {
  const [activeTab, setActiveTab] = useState("pending");
  
  const [approvals, setApprovals] = useState([
    {
      id: 1,
      type: "Leave Application",
      employeeName: "John Doe",
      employeeId: "EMP001",
      details: "Sick Leave - 3 days",
      submittedDate: "2024-06-14",
      status: "Pending",
      priority: "High"
    },
    {
      id: 2,
      type: "Salary Revision",
      employeeName: "Jane Smith",
      employeeId: "EMP002",
      details: "Promotion to Senior Developer",
      submittedDate: "2024-06-13",
      status: "Pending",
      priority: "Medium"
    },
    {
      id: 3,
      type: "Reimbursement",
      employeeName: "Mike Johnson",
      employeeId: "EMP003",
      details: "Travel expenses - ₹5,000",
      submittedDate: "2024-06-12",
      status: "Approved",
      priority: "Low"
    },
    {
      id: 4,
      type: "Overtime Request",
      employeeName: "Sarah Wilson",
      employeeId: "EMP004",
      details: "Weekend overtime - 8 hours",
      submittedDate: "2024-06-11",
      status: "Rejected",
      priority: "Medium"
    }
  ]);

  const handleApprove = (id) => {
    setApprovals(approvals.map(approval => 
      approval.id === id ? { ...approval, status: "Approved" } : approval
    ));
  };

  const handleReject = (id) => {
    setApprovals(approvals.map(approval => 
      approval.id === id ? { ...approval, status: "Rejected" } : approval
    ));
  };

  const filteredApprovals = approvals.filter(approval => 
    activeTab === "all" || approval.status.toLowerCase() === activeTab
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Approvals</h1>
          <p className="text-gray-600 mt-2">Review and approve employee requests</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "pending", label: "Pending", count: approvals.filter(a => a.status === "Pending").length },
                { id: "approved", label: "Approved", count: approvals.filter(a => a.status === "Approved").length },
                { id: "rejected", label: "Rejected", count: approvals.filter(a => a.status === "Rejected").length },
                { id: "all", label: "All", count: approvals.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Approvals List */}
        <div className="space-y-4">
          {filteredApprovals.map((approval) => (
            <div key={approval.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{approval.type}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(approval.priority)}`}>
                      {approval.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(approval.status)}`}>
                      {approval.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Employee</p>
                      <p className="font-semibold text-gray-900">{approval.employeeName}</p>
                      <p className="text-sm text-gray-600">{approval.employeeId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Details</p>
                      <p className="font-semibold text-gray-900">{approval.details}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Submitted Date</p>
                      <p className="font-semibold text-gray-900">{approval.submittedDate}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                    <FaEye />
                    View Details
                  </button>
                  {approval.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(approval.id)}
                        className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        <FaCheck />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(approval.id)}
                        className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        <FaTimes />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredApprovals.length === 0 && (
          <div className="text-center py-12">
            <FaClock className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No approvals found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === "pending" 
                ? "No pending approvals at the moment."
                : `No ${activeTab} approvals found.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Approvals;
