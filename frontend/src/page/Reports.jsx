import React, { useState } from "react";
import { FaDownload, FaFilePdf, FaFileExcel, FaChartBar, FaCalendarAlt , FaSearch , FaBell , FaCog , FaRegUserCircle} from "react-icons/fa";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


function Reports() {
  const [selectedReport, setSelectedReport] = useState("payroll-summary");
  const [dateRange, setDateRange] = useState({
    startDate: "2024-01-01",
    endDate: "2024-12-31"
  });

  const payrollData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Total Payroll Cost",
        data: [15000000, 15500000, 16000000, 15800000, 16500000, 17000000],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
      },
    ],
  };

  const departmentData = {
    labels: ["Engineering", "HR", "Finance", "Marketing", "Sales"],
    datasets: [
      {
        data: [40, 15, 20, 10, 15],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
      },
    ],
  };

  const attendanceData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Present",
        data: [95, 92, 98, 94],
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
      },
      {
        label: "Absent",
        data: [5, 8, 2, 6],
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 2,
      },
    ],
  };

  const reports = [
    {
      id: "payroll-summary",
      name: "Payroll Summary",
      description: "Monthly payroll cost breakdown",
      icon: <FaChartBar />,
      type: "chart"
    },
    {
      id: "employee-list",
      name: "Employee List",
      description: "Complete employee directory",
      icon: <FaFilePdf />,
      type: "document"
    },
    {
      id: "attendance-report",
      name: "Attendance Report",
      description: "Employee attendance statistics",
      icon: <FaCalendarAlt />,
      type: "chart"
    },
    {
      id: "salary-analysis",
      name: "Salary Analysis",
      description: "Department-wise salary distribution",
      icon: <FaFileExcel />,
      type: "chart"
    },
    {
      id: "tax-report",
      name: "Tax Report",
      description: "Tax deductions and compliance",
      icon: <FaFilePdf />,
      type: "document"
    },
    {
      id: "leave-report",
      name: "Leave Report",
      description: "Employee leave utilization",
      icon: <FaFileExcel />,
      type: "document"
    }
  ];

  const handleDownload = (reportId) => {
    // Simulate download
    alert(`Downloading ${reports.find(r => r.id === reportId)?.name}...`);
  };

  const renderChart = () => {
    switch (selectedReport) {
      case "payroll-summary":
        return <Bar data={payrollData} options={{ responsive: true, maintainAspectRatio: false }} />;
      case "attendance-report":
        return <Line data={attendanceData} options={{ responsive: true, maintainAspectRatio: false }} />;
      case "salary-analysis":
        return <Pie data={departmentData} options={{ responsive: true, maintainAspectRatio: false }} />;
      default:
        return <div className="text-center text-gray-500">Select a chart report to view</div>;
    }
  };

  return (
    <div className=" bg-gray-50 min-h-screen p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-2">Generate and download various reports</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reports List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Reports</h2>
              
              {/* Date Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                {reports.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      selectedReport === report.id
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span className="text-lg">{report.icon}</span>
                    <div>
                      <div className="font-medium">{report.name}</div>
                      <div className="text-sm text-gray-500">{report.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Report Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {reports.find(r => r.id === selectedReport)?.name}
                  </h2>
                  <p className="text-gray-600">
                    {reports.find(r => r.id === selectedReport)?.description}
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(selectedReport)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaDownload />
                  Download
                </button>
              </div>

              {/* Chart/Content Area */}
              <div className="h-96">
                {reports.find(r => r.id === selectedReport)?.type === "chart" ? (
                  renderChart()
                ) : (
                  <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                      <FaFilePdf className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Document Report</h3>
                      <p className="text-gray-500 mb-4">
                        This report will be generated as a PDF document.
                      </p>
                      <button
                        onClick={() => handleDownload(selectedReport)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                      >
                        <FaDownload />
                        Generate & Download
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Total Employees</div>
                  <div className="text-2xl font-bold text-gray-900">1,308</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Total Payroll</div>
                  <div className="text-2xl font-bold text-gray-900">₹17.25 Cr</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Average Salary</div>
                  <div className="text-2xl font-bold text-gray-900">₹1.32 L</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
