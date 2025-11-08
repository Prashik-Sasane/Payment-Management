import React from "react";

// Simulated FAQ data
const faqs = [
  {
    question: "How do I reset my payroll password?",
    answer:
      "Click 'Forgot password' on the login page and follow on-screen instructions. For further help, contact your admin.",
  },
  {
    question: "How can I update employee bank details?",
    answer: "Go to Employees > Select user > Edit details, then update the bank information and save changes.",
  },
  {
    question: "Who can approve payroll?",
    answer:
      "Admins and assigned payroll managers can approve payroll. Permission settings are found in Settings > User Roles.",
  },
  {
    question: "Can I export payroll reports?",
    answer: "Yes, from the Payroll section, use the Export button to download reports in Excel or PDF format.",
  },
  {
    question: "Where do I find compliance information?",
    answer:
      "Navigate to Reports > Compliance for statutory updates and compliance files.",
  },
];

const popularTopics = [
  "Getting Started",
  "Payroll Approval",
  "Employee Management",
  "Report Export",
  "Compliance",
  "Tax & Benefits",
];

const HelpCenterPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-black text-black flex flex-col font-sans">
    {/* Header */}
    <header className="bg-white py-10 shadow text-center">
      <h1 className="text-3xl font-extrabold mb-3">Help & Support Center</h1>
      <p className="mx-auto max-w-xl text-gray-600">
        Find answers to common payroll questions, explore how-to guides, and get help for your HR dashboard.
      </p>
      <div className="mt-6 flex justify-center">
        <input
          type="text"
          placeholder="Search help topics..."
          className="w-80 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-black bg-gray-50 text-black"
        />
      </div>
    </header>

    {/* Main Content */}
    <main className="flex-1 p-8 max-w-4xl mx-auto w-full">
      {/* Popular Help Topics */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Popular Help Topics</h2>
        <div className="flex flex-wrap gap-4">
          {popularTopics.map((topic, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-900 cursor-pointer transition"
            >
              {topic}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="divide-y divide-gray-300">
          {faqs.map((faq, idx) => (
            <details key={idx} className="py-4 group">
              <summary className="flex justify-between items-center cursor-pointer text-black font-medium text-lg group-hover:text-black">
                {faq.question}
                <span className="ml-2 text-gray-400 group-hover:text-black">+</span>
              </summary>
              <p className="pl-2 pt-3 text-gray-700 text-base">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Need more help?</h2>
        <div className="bg-gray-100 p-6 rounded-xl text-black shadow flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="font-bold">Contact our support team:</span>
          <a
            href="mailto:support@payrollpro.com"
            className="underline text-black font-medium"
          >
            support@payrollpro.com
          </a>
          <span>or call +91-98765-43210 (Mon-Fri 9am–6pm)</span>
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer className="w-full bg-white text-gray-700 text-sm text-center py-6 opacity-90 mt-auto border-t border-gray-200">
      &copy; {new Date().getFullYear()} PayRollPro, All rights reserved.
    </footer>
  </div>
);

export default HelpCenterPage;
