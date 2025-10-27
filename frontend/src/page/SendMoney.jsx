import React, { useState } from "react";

const SendMoneyForm = () => {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/transactions/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiver_phone: receiver, amount }),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Send Money</h2>
      <form onSubmit={handleSend} className="space-y-3">
        <input
          type="text"
          placeholder="Receiver Phone"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="w-full border rounded-lg p-2"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded-lg p-2"
          required
        />
        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Send
        </button>
      </form>
      {message && <p className="mt-3 text-center text-blue-600">{message}</p>}
    </div>
  );
};

export default SendMoneyForm;
