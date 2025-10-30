import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/hr-sidebar/Sidebar.jsx";
import PayrollAnalysis from "./PayrollAnalysis/PayrollAnalysis.jsx";
import ApplicationLeave from "./LeaveData/ApplicationLeave.jsx";

function EmployeeRow({ name, email, department, position, salary, perf, status, avatar }) {
  const perfColor =
    perf === "Good"
      ? "text-green-500"
      : perf === "Moderate"
      ? "text-yellow-500"
      : "text-red-500";

  const statusBg =
    status === "PAID"
      ? "bg-green-100 text-green-700"
      : status === "PENDING"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <tr className="border-b border-gray-300">
      <td className="py-3 px-2 flex items-center gap-2">
        <img
          src={avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          alt={name}
          className="w-8 h-8 rounded-full"
        />
        <span>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-gray-400 uppercase font-medium">{position}</div>
        </span>
      </td>
      <td className="py-3 px-2 text-sm font-medium">{email}</td>
      <td className="py-3 px-2 text-sm font-medium">{department}</td>
      <td className="py-3 px-2 text-sm font-medium">₹{salary?.toLocaleString()}</td>
      <td className={`py-3 px-2 text-sm font-semibold ${perfColor}`}>{perf || "Good"}</td>
      <td className="py-3 px-2">
        <span className={`text-xs rounded-full py-1 px-2 ${statusBg} font-medium`}>
          {status || "PAID"}
        </span>
      </td>
    </tr>
  );
}

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/employeedata/data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="flex bg-white min-h-screen font-sans">
      <Sidebar />
      <main className="flex-1 p-4 px-6">
        <header>
          <h1 className="text-3xl font-medium mb-2">Payroll</h1>
        </header>

        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="col-span-2 rounded-2xl vgt f687p-7">
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
                  <th className="py-2 px-2 font-medium text-sm uppercase">Employee</th>
                  <th className="py-2 px-2 font-medium text-sm uppercase">Email</th>
                  <th className="py-2 px-2 font-medium text-sm uppercase">Department</th>
                  <th className="py-2 px-2 font-medium text-sm uppercase">Salary</th>
                  <th className="py-2 px-2 font-medium text-sm uppercase">Performance</th>
                  <th className="py-2 px-2 font-medium text-sm uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {employees.map((emp) => (
                  <EmployeeRow
                    key={emp.id}
                    name={emp.name}
                    email={emp.email}
                    department={emp.department}
                    position={emp.position}
                    salary={emp.salary}
                    perf={emp.performance || "Good"}
                    status={emp.status || "PAID"}
                    avatar={emp.avatar}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
