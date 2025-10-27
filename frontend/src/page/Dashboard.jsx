import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaTasks,
  FaCog,
  FaThLarge,
  FaUsers,
  FaQuestionCircle,
} from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const stackedBarData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Net Pay",
      data: [1350000, 1450000, 1250000, 1500000, 1400000, 1550000, 1600000, 1580000, 1620000, 1670000, 1720000, 1800000],
      backgroundColor: "#0ea5e9",
      borderRadius: 6,
      stack: "combined",
    },
    {
      label: "Taxes",
      data: [150000, 180000, 160000, 190000, 170000, 185000, 200000, 210000, 195000, 220000, 230000, 240000],
      backgroundColor: "#6366f1",
      borderRadius: 6,
      stack: "combined",
    },
    {
      label: "Statutories",
      data: [50000, 55000, 52000, 56000, 54000, 57000, 59000, 61000, 60000, 63000, 65000, 67000],
      backgroundColor: "#a78bfa",
      borderRadius: 6,
      stack: "combined",
    },
    {
      label: "Deductions",
      data: [290000, 310000, 300000, 330000, 320000, 340000, 350000, 360000, 370000, 380000, 390000, 400000],
      backgroundColor: "#fca5a5",
      borderRadius: 6,
      stack: "combined",
    },
  ],
};

const stackedBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        color: "#374151",
      },
    },
    tooltip: {
      backgroundColor: "#fff",
      titleColor: "#000",
      bodyColor: "#000",
      borderColor: "#e5e7eb",
      // borderWidth: 1,
      callbacks: {
        label: (context) => {
          const label = context.dataset.label || "";
          const value = context.parsed.y.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
          });
          return ` ${label}: ${value}`;
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: { display: false },
    },
    y: {
      stacked: true,
      grid: { color: "#f1f5f9" },
      ticks: {
        callback: (value) => value / 1000 + "K",
      },
    },
  },
};

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

function EmployeeRow({ name, email, gross, taxes, net, perf, status, avatar, role }) {
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
        <img src={avatar} alt={name} className="w-7 h-7 rounded-full" />
        <span>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-gray-400 uppercase font-medium">{role}</div>
        </span>
      </td>
      <td className="py-3 px-2 text-sm font-medium">{email}</td>
      <td className="py-3 px-2 text-sm font-medium">{gross}</td>
      <td className="py-3 px-2 text-sm text-red-500 font-medium">{taxes}</td>
      <td className="py-3 px-2 text-sm font-medium">{net}</td>
      <td className={`py-3 px-2 text-sm font-semibold ${perfColor}`}>{perf}</td>
      <td className="py-3 px-2">
        <span className={`text-xs rounded-full py-1 px-2 ${statusBg} font-medium`}>
          {status}
        </span>
      </td>
    </tr>
  );
}

export default function Dashboard() {
  return (
    <div className="flex bg-white min-h-screen font-sans">
      <Sidebar />
      <main className="flex-1 p-4 px-6">
        <header>
          <h1 className="text-3xl font-medium mb-2">Payroll</h1>
        </header>
        <div className="grid grid-cols-3 gap-6 mb-10">
          {/* Payroll Cost Summary (Stacked Chart) */}
          <div className="col-span-2 rounded-2xl vgt f687p-7">
            <div className="font-bold text-lg mb-2">Payroll Cost Summary</div>
            <div className="h-64">
              <Bar data={stackedBarData} options={stackedBarOptions} />
            </div>
          </div>

          {/* Payment Status */}
          <div>
            <div className="bg-white rounded-2xl p-6 mb-5 border border-gray-200">
              <div className="font-bold text-md mb-3">Payment Status</div>
              <div className="text-lg font-bold mb-1">
                2,400 <span className="text-xs font-normal">Employees</span>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="flex-1 h-2 bg-sky-400 rounded-full"></div>
                <div className="flex-1 h-2 bg-yellow-400 rounded-full"></div>
                <div className="flex-1 h-2 bg-purple-400 rounded-full"></div>
              </div>
              <div className="flex justify-between text-xs font-medium mb-2">
                <span className="text-sky-400">68% Paid</span>
                <span className="text-yellow-500">17% Pending</span>
                <span className="text-purple-600">15% Unpaid</span>
              </div>
            </div>

            {/* Employee Time-off */}
            <div className="bg-white rounded-2xl shadow p-6 border-t-4 border-indigo-500">
              <div className="font-bold text-md mb-3">
                Employee Time-off{" "}
                <span className="float-right text-xs text-indigo-500 cursor-pointer">
                  View all
                </span>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between border-b pb-2 border-gray-300">
                  <span className="flex items-center gap-2">
                    <img
                      alt="Aarav"
                      className="w-6 h-6 rounded-full"
                      src="https://randomuser.me/api/portraits/men/12.jpg"
                    />{" "}
                    Aarav Patel{" "}
                    <span className="text-xs text-gray-400">Sick Leave</span>
                  </span>
                  <span className="text-red-400 font-medium">12 - 14 Oct 2025</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2 border-gray-300">
                  <span className="flex items-center gap-2">
                    <img
                      alt="Priya"
                      className="w-6 h-6 rounded-full"
                      src="https://randomuser.me/api/portraits/women/45.jpg"
                    />{" "}
                    Priya Mehta{" "}
                    <span className="text-xs text-gray-400">Vacation</span>
                  </span>
                  <span className="text-red-400 font-medium">20 - 25 Oct 2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <img
                      alt="Rohan"
                      className="w-6 h-6 rounded-full"
                      src="https://randomuser.me/api/portraits/men/50.jpg"
                    />{" "}
                    Rohan Kumar{" "}
                    <span className="text-xs text-gray-400">Family Event</span>
                  </span>
                  <span className="text-red-400 font-medium">28 - 31 Oct 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl shadow p-7 border-t-4 border-sky-500">
          <div className="text-lg font-bold mb-3">Employee Summary</div>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-left bg-slate-50">
                <th className="py-2 px-2 font-medium text-sm uppercase">Employee Name</th>
                <th className="py-2 px-2 font-medium text-sm uppercase">Email</th>
                <th className="py-2 px-2 font-medium text-sm uppercase">Gross</th>
                <th className="py-2 px-2 font-medium text-sm uppercase">Taxes</th>
                <th className="py-2 px-2 font-medium text-sm uppercase">Net Salary</th>
                <th className="py-2 px-2 font-medium text-sm uppercase">Performance</th>
                <th className="py-2 px-2 font-medium text-sm uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <EmployeeRow
                name="Aarav Patel"
                email="aarav.patel@company.in"
                gross="₹1,10,000"
                taxes="-₹11,000"
                net="₹99,000"
                perf="Good"
                status="PAID"
                avatar="https://randomuser.me/api/portraits/men/12.jpg"
                role="Software Engineer"
              />
              <EmployeeRow
                name="Priya Mehta"
                email="priya.mehta@company.in"
                gross="₹95,000"
                taxes="-₹9,500"
                net="₹85,500"
                perf="Moderate"
                status="PENDING"
                avatar="https://randomuser.me/api/portraits/women/45.jpg"
                role="Data Analyst"
              />
              <EmployeeRow
                name="Rohan Kumar"
                email="rohan.kumar@company.in"
                gross="₹85,000"
                taxes="-₹8,500"
                net="₹76,500"
                perf="Good"
                status="PAID"
                avatar="https://randomuser.me/api/portraits/men/50.jpg"
                role="Marketing Manager"
              />
              <EmployeeRow
                name="Neha Singh"
                email="neha.singh@company.in"
                gross="₹70,000"
                taxes="-₹7,000"
                net="₹63,000"
                perf="Poor"
                status="UNPAID"
                avatar="https://randomuser.me/api/portraits/women/62.jpg"
                role="Accountant"
              />
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
