import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/hr-sidebar/Sidebar";
import PayrollAnalysis from "./PayrollAnalysis/PayrollAnalysis";
import ApplicationLeave from "./LeaveData/ApplicationLeave";
import api from "../../api/axios";

function EmployeeRow({ employee }) {
  const { name, email, department, position, salary, perf, status, avatar } = employee;

  const perfColor =
    perf === "Good" ? "text-green-500" :
    perf === "Moderate" ? "text-yellow-500" :
    "text-red-500";

  const statusBg =
    status === "PAID" ? "bg-green-100 text-green-700" :
    status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
    "bg-red-100 text-red-700";

  return (
    <tr className="border-b border-gray-200">
      <td className="py-3 px-2 flex items-center gap-2">
        <img
          src={avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          alt={name}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-gray-400 uppercase">{position}</div>
        </div>
      </td>
      <td className="py-3 px-2 text-sm">{email}</td>
      <td className="py-3 px-2 text-sm">{department}</td>
      <td className="py-3 px-2 text-sm">₹{salary?.toLocaleString()}</td>
      <td className={`py-3 px-2 text-sm font-semibold ${perfColor}`}>{perf}</td>
      <td className="py-3 px-2">
        <span className={`text-xs rounded-full py-1 px-2 ${statusBg} font-medium`}>
          {status}
        </span>
      </td>
    </tr>
  );
}

export default function HRDashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/api/employeedata/data");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
      if (err.response?.status === 401) {
        navigate("/hr/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 px-6">
        <header>
          <h1 className="text-3xl font-semibold mb-4">HR Dashboard</h1>
        </header>

        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="col-span-2 rounded-2xl">
            <PayrollAnalysis />
          </div>
          <div>
            <ApplicationLeave />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-7 border-t-4 border-sky-500">
          <div className="text-lg font-bold mb-3">Employee Summary</div>

          {loading ? (
            <p className="text-gray-500">Loading employee data...</p>
          ) : employees.length === 0 ? (
            <p className="text-gray-500">No employees found.</p>
          ) : (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="text-left bg-slate-50">
                  <th className="py-2 px-2 text-sm uppercase">Employee</th>
                  <th className="py-2 px-2 text-sm uppercase">Email</th>
                  <th className="py-2 px-2 text-sm uppercase">Department</th>
                  <th className="py-2 px-2 text-sm uppercase">Salary</th>
                  <th className="py-2 px-2 text-sm uppercase">Performance</th>
                  <th className="py-2 px-2 text-sm uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {employees.map(emp => (
                  <EmployeeRow key={emp._id || emp.id} employee={emp} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
