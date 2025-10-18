import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import Dashboard from "./page/Dashboard";
import BankSelection from "./page/BankSelection";
import SendMoney from "./page/SendMoney";
import TransactionHistory from "./page/TransactionHistory";
import Profile from "./page/Profile";
import Navbar from "./components/Navbar";
import ContactUs from "./components/Contact";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/select-bank" element={<BankSelection />} />
        <Route path="/send-money" element={<SendMoney />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
