import React, { useState } from "react";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye, FaFilter , FaUserCircle , FaThLarge , FaUsers , FaTasks , FaQuestionCircle , FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";
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

function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      employeeId: "EMP001",
      email: "john.doe@company.com",
      department: "Engineering",
      position: "Software Developer",
      salary: 75000,
      status: "Active",
      joinDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      employeeId: "EMP002",
      email: "jane.smith@company.com",
      department: "HR",
      position: "HR Manager",
      salary: 65000,
      status: "Active",
      joinDate: "2022-03-20"
    },
    {
      id: 3,
      name: "Mike Johnson",
      employeeId: "EMP003",
      email: "mike.johnson@company.com",
      department: "Finance",
      position: "Accountant",
      salary: 55000,
      status: "Inactive",
      joinDate: "2023-06-10"
    },
     {
      id: 4,
      name: "Mike Johnson",
      employeeId: "EMP003",
      email: "mike.johnson@company.com",
      department: "Finance",
      position: "Accountant",
      salary: 55000,
      status: "Inactive",
      joinDate: "2023-06-10"
    },
     {
      id: 5,
      name: "Mike Johnson",
      employeeId: "EMP003",
      email: "mike.johnson@company.com",
      department: "Finance",
      position: "Accountant",
      salary: 55000,
      status: "Inactive",
      joinDate: "2023-06-10"
    },
    {
      id: 6,
      name: "Mike Johnson",
      employeeId: "EMP003",
      email: "mike.johnson@company.com",
      department: "Finance",
      position: "Accountant",
      salary: 55000,
      status: "Inactive",
      joinDate: "2023-06-10"
    }
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    salary: "",
    joinDate: ""
  });

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || emp.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const employee = {
      id: employees.length + 1,
      employeeId: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      ...newEmployee,
      salary: parseInt(newEmployee.salary),
      status: "Active"
    };
    setEmployees([...employees, employee]);
    setNewEmployee({ name: "", email: "", department: "", position: "", salary: "", joinDate: "" });
    setShowAddModal(false);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const departments = ["Engineering", "HR", "Finance", "Marketing", "Sales"];

  return (
    <div className="flex">
      <Sidebar />
    <div className="p-6 bg-gray-50 min-h-screen flex-1 ">
      <div className="mx-auto w-6xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-2">Manage your workforce efficiently</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPlus />
                Add Employee
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.employeeId}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{employee.salary.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        employee.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <FaEye />
                        </button>
                        <button 
                          onClick={() => handleEditEmployee(employee)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FaEdit />
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                  <input
                    type="number"
                    value={newEmployee.salary}
                    onChange={(e) => setNewEmployee({...newEmployee, salary: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                  <input
                    type="date"
                    value={newEmployee.joinDate}
                    onChange={(e) => setNewEmployee({...newEmployee, joinDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
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
