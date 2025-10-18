import React, { useState, useEffect } from "react";
import { FaMobileAlt } from "react-icons/fa";
// Dummy transaction data for example
const transactions = [
  {
    id: 1,
    sender: "You",
    receiver: "Prathvi",
    amount: 10,
    date: "2025-10-13",
    description: "Sent to Prathvi",
  },
  {
    id: 2,
    sender: "Mama Saheb",
    receiver: "You",
    amount: 2000,
    date: "2025-10-13",
    description: "Received from Mama Saheb",
  },
  {
    id: 3,
    sender: "You",
    receiver: "Sahil",
    amount: 75,
    date: "2025-10-12",
    description: "Sent to Sahil",
  },
  // Add more transactions as needed
];

function TransactionHistory() {
  const [filter, setFilter] = useState("");
  const [sortedTransactions, setSortedTransactions] = useState(transactions);

  // Filter transactions based on search query
  const filtered = transactions.filter(
    (tx) =>
      tx.description.toLowerCase().includes(filter.toLowerCase()) ||
      tx.sender.toLowerCase().includes(filter.toLowerCase()) ||
      tx.receiver.toLowerCase().includes(filter.toLowerCase())
  );

  // Sort transactions by date (most recent first)
  useEffect(() => {
    const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
    setSortedTransactions(sorted);
  }, [filtered]);

  return (
    <div className="min-h-screen bg-[#f3f0fa] p-6 flex flex-col items-center">
      {/* Search Bar */}
      <div className="w-full max-w-xl mb-6">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#6d63fc]"
          placeholder="Search transactions..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Transaction Table */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#5443cf] text-white">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedTransactions.map((tx) => (
              <tr key={tx.id}>
                <td className="px-4 py-2">{tx.date}</td>
                <td className="px-4 py-2">{tx.description}</td>
                <td
                  className={`px-4 py-2 text-right ${
                    tx.sender === "You" ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {tx.sender === "You" ? "-" : "+"}₹{tx.amount}
                </td>
              </tr>
            ))}
            {sortedTransactions.length === 0 && (
              <tr>
                <td className="px-4 py-2 text-center" colSpan={3}>
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Actions */}
      <div className="w-full max-w-4xl flex justify-around items-center bg-[#5443cf] rounded-3xl mt-8 py-4 text-white">
        {["Mobile Recharge", "Bills", "DTH Bills", "Fatura Ödemeleri"].map((item, index) => (
          <button key={index} className="flex flex-col items-center hover:bg-[#6d63fc] rounded px-4 py-2 transition">
            <FaMobileAlt className="text-2xl mb-1" />
            <span className="text-sm">{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default TransactionHistory;
