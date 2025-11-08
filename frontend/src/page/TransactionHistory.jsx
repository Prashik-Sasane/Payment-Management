import React, { useEffect, useState } from "react";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/transactions/history")
      .then((res) => res.json())
      .then((data) => setTransactions(data.transactions || []));
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      <ul className="space-y-2">
        {transactions.map((tx, i) => (
          <li key={i} className="border p-3 rounded-md flex justify-between">
            <span>{tx.type === "credit" ? "Received" : "Sent"} ₹{tx.amount}</span>
            <span>{new Date(tx.date).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
