import { useState } from "react";
import { FaUserCircle, FaPlus, FaSearch, FaComments, FaMobileAlt, FaFileInvoiceDollar, FaTv } from "react-icons/fa";

const initialRecipients = [
  { id: 1, name: "Amit", color: "bg-[#6de2f5]" },
  { id: 2, name: "Riya", color: "bg-[#9ab0fc]" },
  { id: 3, name: "Vijay", color: "bg-[#ffe082]" },
  { id: 4, name: "Priya", color: "bg-[#ffc1e3]" },
];

const shortcuts = [
  { icon: <FaMobileAlt className="text-2xl text-[#6d63fc]" />, label: "Mobile Recharge" },
  { icon: <FaFileInvoiceDollar className="text-2xl text-[#6d63fc]" />, label: "Bill Payments" },
  { icon: <FaTv className="text-2xl text-[#6d63fc]" />, label: "DTH" },
  // Add more shortcuts/services as needed
];

export default function SendMoney() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState(null);
  const [query, setQuery] = useState("");
  const [recipients, setRecipients] = useState(initialRecipients);

  const filteredRecipients = recipients.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  const handlePayment = () => {
    if (amount && Number(amount) > 0 && recipient !== null) {
      alert(`Payment of ₹${amount} sent to ${recipients[recipient].name}`);
    } else {
      alert("Select a contact and enter a valid amount");
    }
  };

  const handleAddNew = () => {
    const newName = prompt("Enter new contact name");
    if (newName) {
      setRecipients((prev) => [
        ...prev,
        { id: prev.length + 1, name: newName, color: "bg-[#a0aec0]" },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f0fa] py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl rounded-3xl py-9 px-10 flex flex-col items-center mb-14">
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-[#5443cf]">Send Money</h1>
          <FaPlus
            className="text-2xl text-[#6d63fc] cursor-pointer hover:text-[#5145cd] transition"
            onClick={handleAddNew}
            title="Add New Contact"
          />
        </div>

        <div className="w-full mb-6 relative">
          <input
            type="text"
            placeholder="Search contacts"
            className="w-full border border-gray-300 rounded-full py-3 px-14 text-lg focus:outline-none focus:ring-2 focus:ring-[#6d63fc] transition"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <FaSearch className="absolute top-4 left-5 text-[#6d63fc] text-xl" />
        </div>

        <div className="w-full grid grid-cols-4 gap-4 max-h-56 overflow-y-auto mb-8 justify-center">
          {filteredRecipients.length === 0 ? (
            <p className="w-full text-center text-gray-400 col-span-4">No contacts found</p>
          ) : (
            filteredRecipients.map((user, idx) => (
              <button
                key={user.id}
                onClick={() => setRecipient(recipients.indexOf(user))}
                className={`flex flex-col items-center focus:outline-none py-2 rounded-4xl transition ${
                  recipient === recipients.indexOf(user)
                    ? "ring-4 ring-[#6d63fc] ring-opacity-60 bg-[#ede8ff]"
                    : ""
                }`}
              >
                <FaUserCircle
                  className={`${user.color} text-5xl rounded-full mb-2`}
                />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </button>
            ))
          )}
        </div>

        <label className="w-full mb-2 text-left text-base text-[#5443cf] flex justify-between items-center">
          Enter Amount
          <button
            className="flex items-center text-[#6d63fc] text-sm font-semibold hover:underline cursor-pointer"
            onClick={() => alert("Start chat with selected contact")}
            disabled={recipient === null}
          >
            <FaComments className="mr-1" />
            Chat
          </button>
        </label>

        <div className="flex w-full mb-6 rounded-full border-2 border-gray-300 focus-within:border-[#6d63fc] transition items-center bg-gray-50 px-4 py-3">
          <span className="mr-2 text-xl text-[#2d1155]">₹</span>
          <input
            type="number"
            inputMode="decimal"
            placeholder="0"
            className="bg-transparent flex-1 text-3xl font-semibold outline-none border-none px-3"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            min={1}
            max={100000}
          />
        </div>

        <button
          onClick={handlePayment}
          disabled={!amount || Number(amount) <= 0 || recipient === null}
          className={`mt-2 w-full py-4 rounded-full text-xl font-bold transition ${
            amount && Number(amount) > 0 && recipient !== null
              ? "bg-[#5443cf] text-white hover:bg-[#2d1155] cursor-pointer"
              : "bg-[#e0e0e0] text-gray-400 cursor-not-allowed"
          }`}
        >
          Pay Now
        </button>
      </div>

      {/* Shortcut services at bottom */}
      <div className="w-full max-w-2xl flex justify-around items-center bg-white py-7 rounded-3xl shadow-xl border-t-[6px] border-[#5443cf]">
        {shortcuts.map((item, idx) => (
          <button key={idx} className="flex flex-col items-center group px-2">
            {item.icon}
            <span className="mt-2 text-sm font-semibold text-[#5443cf] group-hover:text-[#6d63fc]">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
