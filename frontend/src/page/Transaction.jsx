import React from "react";

export default function TransactionCards({ transactions, payNow, paymentLoading }) {
  return (
    <div className="space-y-6">
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No transactions found.</p>
      ) : (
        transactions.map(({ id, type, name, amount, date, status }) => (
          <div
            key={id}
            className="flex items-center justify-between bg-white rounded-xl p-5 shadow cursor-pointer hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                  type === "sent" ? "border-red-400" : "border-green-400"
                }`}
                title={type === "sent" ? "Paid Out" : "Received"}
              >
                {type === "sent" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{type === "sent" ? "Paid to" : "Received from"}</p>
                <p className="text-lg font-bold">{name}</p>
                <p className="text-sm text-gray-500">{date.toLocaleDateString()}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold">₹{amount}</p>
              <p className="text-gray-500 text-xs mb-1 flex items-center justify-end">
                Debited from <span className="w-4 h-4 bg-blue-600 rounded-full ml-2"></span>
              </p>
              {status === "Pending" && (
                <button
                  disabled={paymentLoading}
                  onClick={() => payNow({ id, type, name, amount, date, status })}
                  className="bg-green-500 text-black px-5 py-1 rounded-full font-semibold hover:bg-green-600 focus:outline-none"
                >
                  {paymentLoading ? "Processing..." : "Pay Now"}
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
