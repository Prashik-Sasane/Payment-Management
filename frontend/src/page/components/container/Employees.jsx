import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios"; // Axios instance with baseURL and credentials
import Sidebar from "../hr-sidebar/Sidebar.jsx";

function Employees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    salary: "",
    joinDate: "",
  });

  const departments = ["Engineering", "HR", "Finance", "Marketing", "Sales"];

  // ------------------ FETCH EMPLOYEES ------------------ //
  const fetchEmployees = async () => {
    try {
      const res = await api.get("/api/employeedata/data"); // Cookies handle auth
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
      navigate("/hr/login"); // Redirect if not authenticated
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ------------------ ADD EMPLOYEE ------------------ //
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/employeedata/data", newEmployee, {
        headers: { "Content-Type": "application/json" },
      });
      setEmployees([...employees, res.data]);
      setNewEmployee({
        name: "",
        email: "",
        department: "",
        position: "",
        salary: "",
        joinDate: "",
      });
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  // ------------------ DELETE EMPLOYEE ------------------ //
  const handleDeleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await api.delete(`/api/employeedata/data/${id}`);
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  // ------------------ FILTERED EMPLOYEES ------------------ //
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDepartment === "all" || emp.department === filterDepartment;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 bg-gray-50 min-h-screen flex-1">
        <div className="mx-auto w-6xl">
      
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
            <p className="text-gray-600 mt-2">Manage your workforce efficiently</p>
          </div>

         
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaPlus /> Add Employee
                </button>
              </div>
            </div>
          </div>

          {/* Employees Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Salary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{employee.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{employee.position}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ₹{employee.salary?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleDeleteEmployee(employee.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Employee Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
                <form onSubmit={handleAddEmployee} className="space-y-4">
                  {["name", "email", "position", "salary", "joinDate"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === "email" ? "email" : field === "salary" ? "number" : field === "joinDate" ? "date" : "text"}
                        value={newEmployee[field]}
                        onChange={(e) => setNewEmployee({ ...newEmployee, [field]: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select
                      value={newEmployee.department}
                      onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Add Employee
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

export default Employees;
