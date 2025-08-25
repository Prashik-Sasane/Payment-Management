import { useState } from "react";
import axios from "axios";

export default function AddBank() {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/user/addbank", {
        user_id: 1, 
        bank_name: bankName,
        account_number: accountNumber,
        ifsc_code: ifscCode
      });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Error adding bank");
    }
  };

  return (
    <>
    <div className="py-40 w-screen flex justify-center align-center">
    <form onSubmit={handleSubmit} className="p-4 border rounded w-96 ">
      <h2 className="text-xl mb-3">Add Bank Account</h2>
      <input className="border p-2 mb-2 w-full" placeholder="Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
      <input className="border p-2 mb-2 w-full" placeholder="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
      <input className="border p-2 mb-2 w-full" placeholder="IFSC Code" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Bank</button>
    </form>
    </div>
    </>
  );
}
