import React from "react";
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

export default function Overview({ employeeData }) {
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

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md p-8 flex items-center gap-8 flex-wrap">
        <img
          src={employeeData.avatar || "https://i.pravatar.cc/80"}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
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
    </div>
  );
}
