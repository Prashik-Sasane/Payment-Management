import React from "react";
import { FaUser, FaHistory, FaFileAlt, FaCreditCard, FaCog } from "react-icons/fa";

function EmployeeSidebar({ user, activeSection, setActiveSection }) {
  const sidebarItems = [
    { id: "overview", label: "Overview", icon: <FaUser /> },
    { id: "bank", label: "Bank Details", icon: <FaCreditCard /> },
    { id: "history", label: "Pay History", icon: <FaHistory /> },
    { id: "leave", label: "Leave Form", icon: <FaFileAlt /> },
    { id: "edit-profile", label: "Edit Profile", icon: <FaCog /> },
  ];

  return (
    <aside className="w-64 bg-white py-8 px-4 flex flex-col h-screen sticky top-0 border-r border-gray-200">
      <h2 className="text-2xl font-bold text-[#222B45] px-4 mb-4">
        Employee Portal
      </h2>

      {/* User Info */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 bg-[#F4F4F6] px-4 py-2 rounded-xl">
            <img
              src={user?.avatar || "https://i.pravatar.cc/40"}
              className="w-8 h-8 rounded-full"
              alt="avatar"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-[#222B45]">
                {user?.name || "Employee"}
              </span>
              <span className="text-xs text-gray-500">
                ID: {user?.id || "—"}
              </span>
            </div>
          </span>
        </div>
      </header>

      {/* Sidebar Menu */}
      <nav className="flex-1">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center px-6 py-3 my-1 rounded-xl transition-all font-medium gap-3 text-lg
              ${
                activeSection === item.id
                  ? "bg-[#554CFF] text-white shadow"
                  : "text-[#505887] hover:bg-[#F1F0FF]"
              }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default EmployeeSidebar;
