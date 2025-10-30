import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./page/SignUp/LoginPage";
import Dashboard from "./page/components/Dashboard";
import RegisterPage from "./page/SignUp/RegisterPage";
import EmployeePage from "./page/EmployeeDashboard";
import Employees from "./page/components/container/Employees";
import PayRuns from "./page/components/container/PayRuns";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee-dashboard" element={<EmployeePage />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/payruns" element={<PayRuns />} />
      </Routes>
    </Router>
  );
}

export default App;
