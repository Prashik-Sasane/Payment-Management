import React from "react";

const SettingsPage = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-100 to-black text-black font-sans">
    {/* Header */}
    <header className="bg-white py-8 shadow text-center mb-10">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-gray-600 max-w-xl mx-auto">
        Update your profile, change security options, adjust notification settings, or manage your account.
      </p>
    </header>

    {/* Main Content */}
    <main className="max-w-3xl w-full mx-auto flex-1 px-4 pb-20">
      {/* Profile Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Profile</h2>
        <div className="bg-white border border-gray-200 rounded-lg shadow px-6 py-6 flex flex-col gap-5">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1">
              <label className="block font-medium mb-2">Full Name</label>
              <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black focus:outline-none"/>
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-2">Email</label>
              <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black focus:outline-none"/>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-2">Department</label>
            <input type="text" placeholder="Finance / HR / Admin" className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black focus:outline-none"/>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Security</h2>
        <div className="bg-white border border-gray-200 rounded-lg shadow px-6 py-6 flex flex-col gap-5">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1">
              <label className="block font-medium mb-2">Change Password</label>
              <input type="password" placeholder="New password" className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black focus:outline-none"/>
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-2">Current Password</label>
              <input type="password" placeholder="Current password" className="w-full px-4 py-2 border border-gray-300 rounded focus:border-black focus:outline-none"/>
            </div>
          </div>
          <button className="self-end px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition">
            Update Password
          </button>
        </div>
      </section>

      {/* Notifications */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Notifications</h2>
        <div className="bg-white border border-gray-200 rounded-lg shadow px-6 py-6">
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="accent-black" defaultChecked />
              <span>Payroll updates via email</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="accent-black" />
              <span>Announcements and compliance notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="accent-black" defaultChecked />
              <span>Weekly HR summary report</span>
            </label>
          </div>
        </div>
      </section>

      {/* Roles & Permissions */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Roles & Permissions</h2>
        <div className="bg-white border border-gray-200 rounded-lg shadow px-6 py-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <span className="block font-medium">Your Role:</span>
              <span className="block text-black font-bold mt-1">HR Manager</span>
            </div>
            <div>
              <span className="block font-medium">Access Level:</span>
              <span className="block text-gray-600 mt-1">Payroll approval, employee management</span>
            </div>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section>
        <h2 className="text-xl font-semibold mb-3 text-red-700">Account</h2>
        <div className="bg-white border border-gray-200 rounded-lg shadow px-6 py-6 flex justify-between items-center">
          <div>
            <span className="block mb-2 font-medium text-red-700">Delete Account</span>
            <span className="block text-gray-700 text-sm">Once deleted, your data cannot be recovered.</span>
          </div>
          <button className="bg-red-700 hover:bg-red-900 text-white px-6 py-2 rounded-full transition font-semibold">
            Delete Account
          </button>
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer className="w-full bg-white text-gray-700 text-sm text-center py-6 border-t border-gray-200 mt-auto">
      &copy; {new Date().getFullYear()} PayRollPro, All rights reserved.
    </footer>
  </div>
);

export default SettingsPage;
