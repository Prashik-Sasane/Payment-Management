import React, { useEffect, useState } from "react";
import { FaUserCircle, FaThLarge, FaUsers, FaTasks } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api/axios";

export default function Sidebar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ------------------ FETCH HR PROFILE ------------------ 
  const fetchHRProfile = async () => {
    try {
      const res = await api.get("/api/hr/profile");
      setUser(res.data.user);
    } catch (err) {
      console.error("Failed to fetch HR profile:", err);
      navigate("/hr/login"); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHRProfile();
  }, []);

  // ------------------ LOGOUT ------------------ //
  const handleLogout = async () => {
    try {
      await api.post("/api/logout");
      navigate("/hr/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <aside className="w-72 h-screen sticky top-0 bg-white border-r border-gray-200 flex flex-col px-6 py-8 overflow-auto">
      <h2 className="text-2xl font-bold text-[#222B45] px-3 mb-4">
        Human Resources (HR)
      </h2>

      <div className="flex items-center mb-10 bg-[#F4F4F6] p-2 rounded-xl">
        <FaUserCircle size={42} className="text-sky-500 mr-3" />
        <div>
          {loading ? (
            <div className="animate-pulse space-y-1">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-3 w-16 bg-gray-300 rounded"></div>
            </div>
          ) : (
            <>
              <div className="font-bold">{user?.name || "Guest User"}</div>
              <div className="text-sm font-semibold uppercase text-gray-600">
                {user?.role || "HR"}
              </div>
            </>
          )}
        </div>
      </div>

      <nav className="flex flex-col gap-2 mb-10">
        <Link
          to="/hr/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded font-medium text-sky-700 hover:bg-sky-100 transition"
        >
          <FaThLarge className="text-lg" /> Dashboard
        </Link>
        <Link
          to="/hr/payroll"
          className="flex items-center gap-3 px-3 py-2 rounded font-medium text-sky-700 hover:bg-sky-100 transition"
        >
          <FaUsers className="text-lg" /> Payroll
        </Link>
        <Link
          to="/hr/employees"
          className="flex items-center gap-3 px-3 py-2 rounded font-medium text-sky-700 hover:bg-sky-100 transition"
        >
          <FaUsers className="text-lg" /> Employees
        </Link>
        <Link
          to="/hr/tasks"
          className="flex items-center gap-3 px-3 py-2 rounded font-medium text-sky-700 hover:bg-sky-100 transition"
        >
          <FaTasks className="text-lg" /> Tasks
          <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">
            2
          </span>
        </Link>

        <Link
          to="/hr/helpcenter"
          className="flex items-center gap-3 px-3 py-2 rounded font-medium text-sky-700 hover:bg-sky-100 transition"
        >
          <FaTasks className="text-lg" /> Help Center
          <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">
            2
          </span>
        </Link>

        <Link
          to="/hr/settings"
          className="flex items-center gap-3 px-3 py-2 rounded font-medium text-sky-700 hover:bg-sky-100 transition"
        >
          <FaTasks className="text-lg" /> Settings
          <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">
            2
          </span>
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-6 flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>

      <div className="mt-auto pt-10 flex items-center gap-2 text-xs text-gray-400">
        <div className="rounded-md bg-sky-100 p-1 text-sky-500 font-bold">H</div>
        <span>Happytech</span>
      </div>
    </aside>
  );
}
