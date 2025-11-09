// // src/hooks/useEmployee.js
// import { useState, useEffect } from "react";
// import api from "../api/axios"; // your axios instance

// export default function useEmployee() {
//   const [employeeData, setEmployeeData] = useState({
//     name: "",
//     id: "",
//     department: "",
//     position: "",
//     salary: 0,
//     email: "",
//     phone: "",
//     bankAccounts: [],
//     leaveBalance: 0,
//     usedLeaves: 0,
//     leaveHistory: [],
//   });

//   const [loading, setLoading] = useState(false);

//   const fetchEmployeeData = async () => {
//     try {
//       setLoading(true);

//       const [profileRes, bankRes, leaveBalRes, leaveHistRes] = await Promise.all([
//         api.get("/api/employee/profile"),
//         api.get("/api/employee/bank"),
//         api.get("/api/employee/leave-balance"),
//         api.get("/api/employee/leave-history"),
//       ]);

//       setEmployeeData({
//         ...profileRes.data.user, // name, email, id, position, department, salary, phone
//         bankAccounts: bankRes.data || [],
//         leaveBalance: leaveBalRes.data[0]?.remaining_leaves || 0,
//         usedLeaves: leaveBalRes.data[0]?.used_leaves || 0,
//         leaveHistory: leaveHistRes.data || [],
//       });
//     } catch (err) {
//       console.error("Failed to fetch employee data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployeeData();
//   }, []);

//   return { employeeData, setEmployeeData, loading, fetchEmployeeData };
// }
