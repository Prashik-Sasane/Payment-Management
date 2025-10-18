import { useState } from "react";
import { FaUserCircle, FaPlus, FaSearch } from "react-icons/fa";

const initialContacts = [
  { id: 1, name: "Amit", color: "bg-[#6de2f5]" },
  { id: 2, name: "Riya", color: "bg-[#9ab0fc]" },
  { id: 3, name: "Vijay", color: "bg-[#ffe082]" },
  { id: 4, name: "Priya", color: "bg-[#ffc1e3]" },
];

export default function Contacts() {
  const [contacts, setContacts] = useState(initialContacts);
  const [query, setQuery] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleAddContact = () => {
    const newContact = prompt("Enter contact name");
    if (newContact) {
      setContacts((prev) => [
        ...prev,
        { id: prev.length + 1, name: newContact, color: "bg-[#a0aec0]" },
      ]);
    }
  };

  return (
    <div className="min-h-screen max-w-3xl mx-auto p-10 bg-gradient-to-br from-[#6de2f5] to-[#9ab0fc] rounded-3xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-[#2d1155]">Contacts</h1>
        <FaPlus
          onClick={handleAddContact}
          className="cursor-pointer text-[#6d63fc] text-2xl hover:text-[#5145cd] transition"
          title="Add New Contact"
        />
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search contacts"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6d63fc] text-gray-800"
        />
        <FaSearch className="absolute left-3 top-2.5 text-[#6d63fc] text-lg" />
      </div>

      <div className="overflow-y-auto max-h-96 bg-white rounded-2xl p-4 shadow-inner">
        {filteredContacts.length === 0 ? (
          <p className="text-center text-gray-400">No contacts found.</p>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-4 p-3 mb-3 rounded-xl cursor-pointer hover:bg-[#ede8ff]"
            >
              <FaUserCircle
                className={`${contact.color} text-4xl rounded-full`}
              />
              <span className="font-medium text-gray-600">{contact.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
