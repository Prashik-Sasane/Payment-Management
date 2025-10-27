import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import Dashboard from "./page/Dashboard";
import BankLinkForm from "./page/BankLinkForm";
import SendMoney from "./page/SendMoney";
import TransactionHistory from "./page/TransactionHistory";
import Profile from "./page/Profile";
import RegisterPage from "./page/RegisterPage";
import ContactUs from "./components/Contact";
import EmployeePage from "./page/EmployeeDashboard";
import Employees from "./page/Employees";
import PayRuns from "./page/PayRuns";
import LeaveAttendance from "./page/LeaveAttendance";
import Approvals from "./page/Approvals";
import Reports from "./page/Reports";
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
        <Route path="/leave-attendance" element={<LeaveAttendance />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/select-bank" element={<BankLinkForm />} />
        <Route path="/send-money" element={<SendMoney />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
