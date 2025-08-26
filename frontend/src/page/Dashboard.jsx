import React, { useState } from "react";
import Transaction from "./Transaction";
const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) resolve(true);
    else {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    }
  });

const initialTransactions = [
  { id: 1, type: "sent", name: "SHREE BALAJI TRADERS", amount: 30, date: new Date("2025-08-24") },
  { id: 2, type: "sent", name: "Shree Swami Snacks", amount: 45, date: new Date("2025-08-24") },
  { id: 3, type: "sent", name: "Partha (AIDS)", amount: 120, date: new Date("2025-08-24") },
  { id: 4, type: "received", name: "ARYA JALINDAR KADAM", amount: 10, date: new Date("2025-08-22") },
];

export default function Dashboard() {
  const [section, setSection] = useState("transactions");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [newTxn, setNewTxn] = useState({ type: "sent", name: "", amount: "", date: "" });

  
  async function payNow(txn) {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK");
      return;
    }
    setPaymentLoading(true);

    const options = {
      key: "rzp_test_R9F8wJS5GfYY6P", 
      amount: txn.amount * 100,
      currency: "INR",
      name: "PayApp",
      description: txn.name,
      handler: function (response) {
        alert("Payment successful with payment ID: " + response.razorpay_payment_id);
        setTransactions((prev) =>
          prev.map((t) => (t.id === txn.id ? { ...t, status: "Completed" } : t))
        );
      },
      theme: { color: "#007acc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setPaymentLoading(false);
  }

 
  const filteredTransactions = transactions.filter((txn) => {
    const nameMatch = txn.name.toLowerCase().includes(searchTerm.toLowerCase());
    const now = new Date();
    let dateMatch = true;
    if (filterDate === "last7") {
      const last7 = new Date(now);
      last7.setDate(now.getDate() - 7);
      dateMatch = txn.date >= last7;
    }
    if (filterDate === "last30") {
      const last30 = new Date(now);
      last30.setDate(now.getDate() - 30);
      dateMatch = txn.date >= last30;
    }
    return nameMatch && dateMatch;
  });


  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newTxn.name || !newTxn.amount || !newTxn.date) {
      alert("Please fill in all fields");
      return;
    }
    setTransactions([{ id: transactions.length + 1, ...newTxn, amount: Number(newTxn.amount), date: new Date(newTxn.date), status: "Pending" }, ...transactions]);
    setNewTxn({ type: "sent", name: "", amount: "", date: "" });
    setSection("transactions");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans text-gray-900">
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6 space-y-6 shadow-lg">
        <h2 className="text-3xl font-extrabold tracking-tight text-green-400 border-b border-green-400 mb-8 pb-2">
          PayApp
        </h2>
        {["transactions", "addbank", "banktransfer", "history", "scan"].map((sec) => (
          <button
            key={sec}
            className={`text-xl rounded-md px-4 py-3 text-left transition-colors duration-200 ${
              section === sec
                ? "bg-gray-100 text-gray-900 font-bold shadow-lg"
                : "hover:bg-gray-400 hover:text-white"
            }`}
            onClick={() => setSection(sec)}
          >
            {sec === "transactions" && "Transaction History"}
            {sec === "addbank" && "Add Bank"}
            {sec === "banktransfer" && "Bank Transfer"}
            {sec === "history" && "Payment History"}
            {sec === "scan" && "Scan Payment"}
          </button>
        ))}
      </aside>

    <main className="flex-1 p-12 bg-white rounded-l-3xl shadow-lg overflow-y-auto">

  {section === "transactions" && (
    <Transaction
      transactions={filteredTransactions}
      payNow={payNow}
      paymentLoading={paymentLoading}
    />
  )}

  {section === "addbank" && (
    <>
      <h1 className="text-4xl font-semibold mb-8 border-b border-gray-300 pb-4">Add Bank Account</h1>
      <form
        onSubmit={handleAddTransaction}
        className="max-w-lg space-y-6"
      >
        <select
          required
          value={newTxn.type}
          onChange={(e) => setNewTxn({ ...newTxn, type: e.target.value })}
          className="block w-full p-4 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="sent">Paid To</option>
          <option value="received">Received From</option>
        </select>
        <input
          type="text"
          placeholder="Name"
          required
          value={newTxn.name}
          onChange={(e) => setNewTxn({ ...newTxn, name: e.target.value })}
          className="block w-full p-4 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          min="1"
          step="any"
          placeholder="Amount"
          required
          value={newTxn.amount}
          onChange={(e) => setNewTxn({ ...newTxn, amount: e.target.value })}
          className="block w-full p-4 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          required
          value={newTxn.date}
          onChange={(e) => setNewTxn({ ...newTxn, date: e.target.value })}
          className="block w-full p-4 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-600 mb-2">
          Contact number will be used to reach out for payment-related communication.
        </p>
        <button
          type="submit"
          className="w-full py-4 bg-purple-600 hover:bg-purple-700 font-bold text-white rounded-lg shadow-md transition"
        >
          Save & Add Transaction
        </button>
      </form>
    </>
  )}

  {(section === "banktransfer" || section === "history" || section === "scan") && (
    <div className="flex justify-center items-center h-full text-xl text-gray-500">
      <p>{section.charAt(0).toUpperCase() + section.slice(1)} feature will be available soon.</p>
    </div>
  )}
  
</main>

    </div>
  );
}
