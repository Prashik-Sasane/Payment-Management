import React, { useState } from "react";

const BankLinkForm = () => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/bank/link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bank_name: bankName, account_number: accountNumber, ifsc_code: ifscCode }),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Link Your Bank Account</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Bank Name"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className="w-full border rounded-lg p-2"
          required
        />
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="w-full border rounded-lg p-2"
          required
        />
        <input
          type="text"
          placeholder="IFSC Code"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
          className="w-full border rounded-lg p-2"
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Link Bank
        </button>
      </form>
      {message && <p className="mt-3 text-center text-green-600">{message}</p>}
    </div>
  );
};

export default BankLinkForm;
