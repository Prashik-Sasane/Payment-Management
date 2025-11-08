import React from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Employees", href: "/employees" },
  { label: "Payroll", href: "/payroll" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

const features = [
  {
    title: "Instant Salary Transfers",
    desc: "Seamlessly transfer salaries securely with one click. Stay compliant and never miss a payment cycle.",
    icon: (
      <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Employee Directory",
    desc: "Centralize all employee data, roles, and attendance in one secure dashboard.",
    icon: (
      <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Payroll Reports",
    desc: "Export precise payroll, tax, and expense reports in seconds for your records and audits.",
    icon: (
      <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24">
        <ellipse cx="12" cy="12" rx="8" ry="10" fill="currentColor" />
      </svg>
    ),
  },
];

const PayrollLandingPage = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-100 to-black text-black font-sans">
    {/* Navbar */}
    <nav className="flex items-center justify-between px-10 h-20 bg-white shadow-md">
      <div className="flex items-center gap-4">
        <img src="/payroll-logo.svg" alt="PayrollPro Logo" className="h-9" />
        <span className="font-bold text-xl tracking-wider">PayRollPro</span>
      </div>
      <div className="flex items-center gap-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search employee"
            className="bg-gray-100 text-black rounded-full pl-9 pr-4 py-2 text-sm outline-none border border-gray-300 focus:border-black transition"
          />
          <span className="absolute left-3 top-2.5">
            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="black" />
            </svg>
          </span>
        </div>
        <button className="p-2 hover:bg-gray-200 rounded-full">
          <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" stroke="black" />
          </svg>
        </button>
        <button className="p-2 hover:bg-gray-200 rounded-full flex items-center">
          <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24">
            <ellipse cx="12" cy="12" rx="8" ry="10" stroke="black" />
          </svg>
        </button>
      </div>
    </nav>

    {/* Main Content */}
    <div className="flex flex-1">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-100 border-r border-gray-300 flex flex-col pt-8 pb-8 px-4 shadow-lg">
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <a
              href={item.href}
              key={item.label}
              className="flex items-center gap-4 py-2 px-4 rounded-lg text-gray-700 hover:bg-black hover:text-white transition font-medium"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-black"></span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto mb-4 text-xs text-gray-400 opacity-80 pl-4">Admin Access</div>
      </aside>

      {/* Hero + Features */}
      <section className="flex-1 flex flex-col items-center justify-center px-2 py-8">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 text-black">
            Effortless Payroll, Elevated HR
          </h1>
          <p className="text-lg text-gray-700 mb-10">
            Run payroll seamlessly with automated employee management, rapid compliance, and enterprise-grade security.
          </p>
          <button className="px-8 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-full shadow transition mb-10">
            Start Free Trial
          </button>
        </div>
        {/* Cards */}
        <div className="flex flex-col sm:flex-row gap-8 w-full max-w-4xl justify-center items-stretch">
          {features.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white border border-gray-300 rounded-2xl shadow-xl px-8 py-7 min-w-[230px] transition hover:scale-105"
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="font-semibold text-lg mb-2 text-black">{card.title}</h3>
              <p className="text-sm text-gray-600 text-center">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>

    {/* Footer */}
    <footer className="w-full bg-white text-gray-700 text-sm text-center py-6 opacity-90 mt-auto border-t border-gray-200">
      &copy; {new Date().getFullYear()} PayRollPro, All rights reserved &mdash; Professional Payroll & HR Solutions.
    </footer>
  </div>
);

export default PayrollLandingPage;
