import { useState } from "react";

export default function LoginPage() {
  const [checked, setChecked] = useState({ gateway: false, links: false });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const isFormValid = (checked.gateway || checked.links) && email && phone.length === 10;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3f0fa]">
      <div className="bg-white rounded-2xl p-8 w-[420px] shadow-2xl">
        <h2 className="text-2xl font-bold mb-2 text-[#2d1155]">Register your Business with PhonePe Payment Gateway</h2>
        <div className="text-sm mb-6 text-gray-700">
          Which product best fits your business needs?
        </div>
        <div className="flex gap-7 mb-5">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={checked.gateway}
              onChange={() => setChecked(c => ({ ...c, gateway: !c.gateway }))}
              className="accent-[#8606ec] w-4 h-4"
            />
            <span>Payment Gateway</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={checked.links}
              onChange={() => setChecked(c => ({ ...c, links: !c.links }))}
              className="accent-[#8606ec] w-4 h-4"
            />
            <span>Payment Links</span>
          </label>
        </div>
        <input
          type="email"
          placeholder="Enter Email ID"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-3 border rounded-lg text-base outline-none focus:ring-2 focus:ring-[#8606ec] transition"
        />
        <div className="flex items-center mb-4">
          <span className="px-3 text-gray-500">+91</span>
          <input
            type="tel"
            placeholder="XXXXXXXXXX"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/, '').slice(0,10))}
            className="flex-1 px-3 py-3 border rounded-lg text-base outline-none focus:ring-2 focus:ring-[#8606ec] transition"
            maxLength={10}
          />
          <button
            className="ml-2 px-4 py-2 rounded-lg bg-[#ece6f9] text-[#a48ace] text-sm font-semibold cursor-not-allowed"
            disabled
            type="button"
          >Verify</button>
        </div>
        <div className="text-xs text-gray-500 mb-4">
          By continuing, you allow us to contact and assist in availing payment services.
          <span className="text-[#8506ec] underline cursor-pointer"> T&C</span> and 
          <span className="text-[#8506ec] underline cursor-pointer"> Privacy Policy</span> apply.
        </div>
        <button
          className={`w-full py-3 rounded-full text-base font-semibold transition ${
            isFormValid 
              ? "bg-[#8506ec] text-white cursor-pointer hover:bg-[#a566df]" 
              : "bg-[#ece6f9] text-[#a48ace] cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >PROCEED</button>
      </div>
    </div>
  );
}
