import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeLogin from "./page/Signin/EmployeeLogin";
import HRLogin from "./page/Signin/HRLoginPage";
import LandingPage from "./components/Landing";
import EmployeeDashboard from "./page/Employee/EmployeeDashboard";
import HRDashboard from "./page/components/HRDashboard";
import EmployeeRegister from "./page/SignUp/EmployeeRegisterPage";
import HRRegister from "./page/SignUp/HrRegisterPage";
import Employees from "./page/components/container/Employees";
import PayRuns from "./page/components/container/PayRuns";
import HelpCenter from "./page/components/container/HelpCenter";
import Settings from "./page/components/container/Settings"
import Tasks from "./page/components/container/Tasks"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/register" element={<EmployeeRegister />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />

        {/* HR DASHBOARD PAGE */}
        <Route path="/hr/employees" element={<Employees />} />
        <Route path="/hr/tasks" element={<Tasks/>} />
        <Route path="/hr/payroll" element={<PayRuns />} />
        <Route path="/hr/settings" element={<Settings />} />
        <Route path="/hr/helpcenter" element={<HelpCenter />} /> 
        <Route path="/hr/login" element={<HRLogin />} />
        <Route path="/hr/register" element={<HRRegister/>} />
        <Route path="/hr/dashboard" element={<HRDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
