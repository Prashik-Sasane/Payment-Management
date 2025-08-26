import React from "react";
import { FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";

const transactions = [
  { id: 1, type: "sent", to: "SHREE BALAJI TRADERS", amount: 30, date: "1 day ago" },
  { id: 2, type: "sent", to: "Shree Swami Snacks", amount: 45, date: "1 day ago" },
  { id: 3, type: "sent", to: "Partha (AIDS)", amount: 120, date: "24 Aug 2025" },
  { id: 4, type: "received", from: "ARYA JALINDAR KADAM", amount: 10, date: "24 Aug 2025" },
];

const Payment = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">History</h2>
      
      {/* Refer and earn banner */}
      <div className="bg-purple-100 rounded-lg flex items-center justify-between p-4 mb-6">
        <div>
          <p className="font-bold">Refer and earn ₹200</p>
          <p className="text-gray-700 text-sm">Invite your friends and family to PhonePe</p>
          <button className="mt-2 bg-purple-700 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-800">
            Invite a friend
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/phonepe/phonepe-original.svg" alt="PhonePe" className="w-12 h-12"/>
          <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/phonepe/phonepe-original.svg" alt="PhonePe" className="w-12 h-12"/>
        </div>
      </div>

      {/* Transactions list */}
      <ul className="space-y-6">
        {transactions.map((txn) => (
          <li key={txn.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-gray-100 text-gray-600">
                {txn.type === "sent" ? (
                  <FiArrowUpRight className="w-6 h-6" />
                ) : (
                  <FiArrowDownLeft className="w-6 h-6" />
                )}
              </div>
              <div>
                {txn.type === "sent" ? (
                  <>
                    <p className="font-semibold text-gray-900">Paid to</p>
                    <p className="text-gray-800">{txn.to}</p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-gray-900">Received from</p>
                    <p className="text-gray-800">{txn.from}</p>
                  </>
                )}
                <p className="text-sm text-gray-500">{txn.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">₹{txn.amount}</p>
              <p className="text-xs text-gray-500">Debited from <span className="ml-1 inline-block w-4 h-4 bg-blue-600 rounded-full"></span></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Payment;
