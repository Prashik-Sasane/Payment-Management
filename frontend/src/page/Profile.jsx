import { useState } from "react";

export default function Profile() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      key: "personal",
      title: "Personal Details",
      content: (
        <>
          <p>Name: John Doe</p>
          <p>Email: john@example.com</p>
          <p>Phone: +91 9876543210</p>
        </>
      ),
    },
    {
      key: "payment",
      title: "Payment Methods",
      content: (
        <>
          <p>Bank: HDFC Bank</p>
          <p>UPI ID: john@hdfcbank</p>
          <p>Cards Linked: 2</p>
        </>
      ),
    },
    {
      key: "preferences",
      title: "Preferences",
      content: (
        <>
          <p>Notifications: Enabled</p>
          <p>Language: English</p>
        </>
      ),
    },
    {
      key: "help",
      title: "Help & Support",
      content: (
        <>
          <p>FAQs</p>
          <p>Contact Support</p>
          <p>Report an issue</p>
        </>
      ),
    },
  ];

  return (
    <div className="bg-[#f3f0fa] p-6 min-h-screen max-w-3xl mx-auto rounded-xl shadow-lg">
      {/* User Info */}
      <div className="flex flex-col items-center mb-10">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="rounded-full mb-4 shadow-lg"
        />
        <h2 className="text-2xl font-semibold text-[#5443cf]">John Doe</h2>
        <p className="text-gray-600">john@example.com</p>
        <p className="text-[#6d63fc] mt-2 font-semibold">Bank Linked: HDFC Bank</p>
      </div>

      {/* Accordion Sections */}
      {sections.map(({ key, title, content }) => (
        <div key={key} className="mb-4 bg-white rounded-lg shadow p-4 cursor-pointer">
          <button
            onClick={() => toggleSection(key)}
            className="flex justify-between items-center w-full font-semibold text-lg text-[#2d1155] focus:outline-none"
            aria-expanded={openSection === key}
            aria-controls={`${key}-content`}
            id={`${key}-header`}
          >
            {title}
            <span className="text-3xl select-none">{openSection === key ? "−" : "+"}</span>
          </button>
          {openSection === key && (
            <div
              id={`${key}-content`}
              aria-labelledby={`${key}-header`}
              className="mt-3 text-gray-700 space-y-1 select-text"
            >
              {content}
            </div>
          )}
        </div>
      ))}

      {/* Logout Button */}
      <button
        className="w-full bg-[#5443cf] text-white py-3 rounded-lg mt-6 font-semibold hover:bg-[#6d63fc] transition"
        onClick={() => alert("Logging out...")}
      >
        Log Out
      </button>
    </div>
  );
}
