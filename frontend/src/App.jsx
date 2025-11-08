import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeLogin from "./page/Signin/EmployeeLogin";
import HRLogin from "./page/Signin/HRLoginPage";
import EmployeeDashboard from "./page/Employee/EmployeeDashboard";
import HRDashboard from "./page/components/HRDashboard";
import EmployeeRegister from "./page/SignUp/EmployeeRegisterPage";
import HRRegister from "./page/SignUp/HrRegisterPage";
import TransactionHistory from "./page/TransactionHistory";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TransactionHistory />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/register" element={<EmployeeRegister />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />

        <Route path="/hr/login" element={<HRLogin />} />
        <Route path="/hr/register" element={<HRRegister/>} />
        <Route path="/hr/dashboard" element={<HRDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
