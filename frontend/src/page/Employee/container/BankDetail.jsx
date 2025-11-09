// src/components/employee/sections/Bank.jsx
import React, { useState } from "react";
import api from "../../../api/axios";

export default function Bank({ employeeData, setEmployeeData, fetchEmployeeData }) {
  const [bankForm, setBankForm] = useState({
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    accountHolderName: "",
  });

  const handleBankSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/employee/bank", bankForm);
      alert(res.data.message || "Bank account added successfully!");

      setBankForm({ accountNumber: "", bankName: "", ifscCode: "", accountHolderName: "" });
      fetchEmployeeData();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add bank account");
    }
  };

  const handleDeleteBank = async (accountId) => {
    if (!window.confirm("Are you sure you want to delete this bank account?")) return;

    try {
      await api.delete(`/api/employee/bank/${accountId}`);
      setEmployeeData((prev) => ({
        ...prev,
        bankAccounts: prev.bankAccounts.filter((acc) => acc.id !== accountId),
      }));
      alert("Bank account deleted!");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete bank account");
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Bank Details</h2>

      <form onSubmit={handleBankSubmit} className="bg-white p-6 rounded-2xl shadow mb-6 max-w-lg">
        <h3 className="text-lg font-semibold mb-4">Add Bank Account</h3>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Account Holder Name"
            value={bankForm.accountHolderName}
            onChange={(e) => setBankForm({ ...bankForm, accountHolderName: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Account Number"
            value={bankForm.accountNumber}
            onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Bank Name"
            value={bankForm.bankName}
            onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="IFSC Code"
            value={bankForm.ifscCode}
            onChange={(e) => setBankForm({ ...bankForm, ifscCode: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <button type="submit" className="mt-4 bg-[#554CFF] text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
          Add Account
        </button>
      </form>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-3">Your Bank Accounts</h3>
        {employeeData.bankAccounts && employeeData.bankAccounts.length > 0 ? (
          <ul>
            {employeeData.bankAccounts.map((acc) => (
              <li key={acc.id} className="border-b py-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{acc.bank_name} — {acc.account_number}</p>
                  <p className="text-sm text-gray-500">IFSC: {acc.ifsc_code}</p>
                  <p className="text-sm text-gray-500">Holder: {acc.account_holder_name}</p>
                </div>
                <button
                  onClick={() => handleDeleteBank(acc.id)}
                  className="text-red-600 hover:text-red-800 font-semibold text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No bank accounts added yet.</p>
        )}
      </div>
    </section>
  );
}
