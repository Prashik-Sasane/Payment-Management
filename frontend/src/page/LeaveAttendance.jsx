import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaUser, FaCheck, FaTimes, FaPlus } from "react-icons/fa";

function LeaveAttendance() {
  const [activeTab, setActiveTab] = useState("leave");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  const [leaveApplications, setLeaveApplications] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      employeeId: "EMP001",
      leaveType: "Sick Leave",
      startDate: "2024-06-15",
      endDate: "2024-06-17",
      days: 3,
      reason: "Fever and cold",
      status: "Pending",
      appliedDate: "2024-06-14"
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      employeeId: "EMP002",
      leaveType: "Personal Leave",
      startDate: "2024-06-20",
      endDate: "2024-06-22",
      days: 3,
      reason: "Family function",
      status: "Approved",
      appliedDate: "2024-06-18"
    },
    {
      id: 3,
      employeeName: "Mike Johnson",
      employeeId: "EMP003",
      leaveType: "Vacation",
      startDate: "2024-07-01",
      endDate: "2024-07-05",
      days: 5,
      reason: "Summer vacation",
      status: "Rejected",
      appliedDate: "2024-06-25"
    }
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      employeeId: "EMP001",
      date: "2024-06-14",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      hoursWorked: 9,
      status: "Present"
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      employeeId: "EMP002",
      date: "2024-06-14",
      checkIn: "09:15 AM",
      checkOut: "05:45 PM",
      hoursWorked: 8.5,
      status: "Present"
    },
    {
      id: 3,
      employeeName: "Mike Johnson",
      employeeId: "EMP003",
      date: "2024-06-14",
      checkIn: "10:00 AM",
      checkOut: "04:00 PM",
      hoursWorked: 6,
      status: "Late"
    }
  ]);

  const [newLeave, setNewLeave] = useState({
    employeeId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: ""
  });

  const [newAttendance, setNewAttendance] = useState({
    employeeId: "",
    date: "",
    checkIn: "",
    checkOut: ""
  });

  const handleApproveLeave = (id) => {
    setLeaveApplications(leaveApplications.map(app => 
      app.id === id ? { ...app, status: "Approved" } : app
    ));
  };

  const handleRejectLeave = (id) => {
    setLeaveApplications(leaveApplications.map(app => 
      app.id === id ? { ...app, status: "Rejected" } : app
    ));
  };

  const handleSubmitLeave = (e) => {
    e.preventDefault();
    const days = Math.ceil((new Date(newLeave.endDate) - new Date(newLeave.startDate)) / (1000 * 60 * 60 * 24)) + 1;
    const application = {
      id: leaveApplications.length + 1,
      employeeName: "Employee Name", // Would be fetched based on employeeId
      employeeId: newLeave.employeeId,
      leaveType: newLeave.leaveType,
      startDate: newLeave.startDate,
      endDate: newLeave.endDate,
      days: days,
      reason: newLeave.reason,
      status: "Pending",
      appliedDate: new Date().toISOString().split('T')[0]
    };
    setLeaveApplications([application, ...leaveApplications]);
    setNewLeave({ employeeId: "", leaveType: "", startDate: "", endDate: "", reason: "" });
    setShowLeaveModal(false);
  };

  const handleSubmitAttendance = (e) => {
    e.preventDefault();
    const checkInTime = new Date(`2000-01-01 ${newAttendance.checkIn}`);
    const checkOutTime = new Date(`2000-01-01 ${newAttendance.checkOut}`);
    const hoursWorked = (checkOutTime - checkInTime) / (1000 * 60 * 60);
    
    const record = {
      id: attendanceRecords.length + 1,
      employeeName: "Employee Name", // Would be fetched based on employeeId
      employeeId: newAttendance.employeeId,
      date: newAttendance.date,
      checkIn: newAttendance.checkIn,
      checkOut: newAttendance.checkOut,
      hoursWorked: hoursWorked,
      status: hoursWorked >= 8 ? "Present" : "Late"
    };
    setAttendanceRecords([record, ...attendanceRecords]);
    setNewAttendance({ employeeId: "", date: "", checkIn: "", checkOut: "" });
    setShowAttendanceModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Late': return 'bg-orange-100 text-orange-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Leave & Attendance</h1>
          <p className="text-gray-600 mt-2">Manage employee leave applications and attendance records</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("leave")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "leave"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FaCalendarAlt className="inline mr-2" />
                Leave Applications
              </button>
              <button
                onClick={() => setActiveTab("attendance")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "attendance"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FaClock className="inline mr-2" />
                Attendance Records
              </button>
            </nav>
          </div>
        </div>

        {/* Leave Applications Tab */}
        {activeTab === "leave" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Leave Applications</h2>
              <button
                onClick={() => setShowLeaveModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPlus />
                Add Leave Application
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leaveApplications.map((application) => (
                      <tr key={application.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{application.employeeName}</div>
                            <div className="text-sm text-gray-500">{application.employeeId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.leaveType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {application.startDate} to {application.endDate} ({application.days} days)
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{application.reason}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                            {application.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {application.status === "Pending" && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleApproveLeave(application.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() => handleRejectLeave(application.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <FaTimes />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Attendance Records Tab */}
        {activeTab === "attendance" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Attendance Records</h2>
              <button
                onClick={() => setShowAttendanceModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPlus />
                Add Attendance Record
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours Worked</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendanceRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                            <div className="text-sm text-gray-500">{record.employeeId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.checkIn}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.checkOut}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.hoursWorked} hrs</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Add Leave Modal */}
        {showLeaveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add Leave Application</h2>
              <form onSubmit={handleSubmitLeave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    value={newLeave.employeeId}
                    onChange={(e) => setNewLeave({...newLeave, employeeId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                  <select
                    value={newLeave.leaveType}
                    onChange={(e) => setNewLeave({...newLeave, leaveType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Personal Leave">Personal Leave</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={newLeave.startDate}
                      onChange={(e) => setNewLeave({...newLeave, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={newLeave.endDate}
                      onChange={(e) => setNewLeave({...newLeave, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                  <textarea
                    value={newLeave.reason}
                    onChange={(e) => setNewLeave({...newLeave, reason: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowLeaveModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Attendance Modal */}
        {showAttendanceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add Attendance Record</h2>
              <form onSubmit={handleSubmitAttendance} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    value={newAttendance.employeeId}
                    onChange={(e) => setNewAttendance({...newAttendance, employeeId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newAttendance.date}
                    onChange={(e) => setNewAttendance({...newAttendance, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check In</label>
                    <input
                      type="time"
                      value={newAttendance.checkIn}
                      onChange={(e) => setNewAttendance({...newAttendance, checkIn: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check Out</label>
                    <input
                      type="time"
                      value={newAttendance.checkOut}
                      onChange={(e) => setNewAttendance({...newAttendance, checkOut: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAttendanceModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaveAttendance;
