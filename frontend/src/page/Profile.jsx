import { useState } from "react";

export default function Profile() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="bg-[#f3f0fa] p-6 min-h-screen w-full">
      {/* User Info */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="rounded-full mb-4"
        />
        <h2 className="text-xl font-semibold">John Doe</h2>
        <p className="text-gray-600">john@example.com</p>
        <p className="text-gray-500 mt-2">Bank Linked: HDFC Bank</p>
      </div>

      {[
        { key: "personal", title: "Personal Details", content: (
          <>
            <p>Name: John Doe</p>
            <p>Email: john@example.com</p>
            <p>Phone: +91 9876543210</p>
          </>
        )},
        { key: "payment", title: "Payment Methods", content: (
          <>
            <p>Bank: HDFC Bank</p>
            <p>UPI ID: john@hdfcbank</p>
            <p>Cards Linked: 2</p>
          </>
        )},
        { key: "preferences", title: "Preferences", content: (
          <>
            <p>Notifications: Enabled</p>
            <p>Language: English</p>
          </>
        )},
        { key: "help", title: "Help & Support", content: (
          <>
            <p>FAQs</p>
            <p>Contact Support</p>
            <p>Report an issue</p>
          </>
        )}
      ].map(({ key, title, content }) => (
        <div key={key} className="mb-4 bg-white rounded-lg shadow p-4 cursor-pointer">
          <div
            className="flex justify-between items-center"
            onClick={() => toggleSection(key)}
          >
            <h3 className="font-semibold text-lg">{title}</h3>
            <span className="text-xl">{openSection === key ? "−" : "+"}</span>
          </div>
          {openSection === key && (
            <div className="mt-3 text-gray-700 space-y-1">
              {content}
            </div>
          )}
        </div>
      ))}


      <button
        className="w-full bg-red-600 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-red-700 transition"
        onClick={() => alert("Logging out...")}
      >
        Log Out
      </button>
    </div>
  );
}
