import { useState } from "react";
import { useApi } from "../hooks/useApi.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const [checked, setChecked] = useState({ gateway: false, links: false });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const isFormValid = (checked.gateway || checked.links) && email && phone.length === 10;
  const { login } = useAuth();
  const { loading, error, apiCall } = useApi();

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const response = await apiCall("/auth/sent-otp", {
      method: "POST",
      body: { phone },
    });

    if (response && response.message) {
      setOtpSent(true);
      alert("OTP sent successfully!");
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return;

    const response = await apiCall("/auth/verify-otp", {
      method: "POST",
      body: { phone, otp, email },
    });

    if (response && response.success) {
      login({ email, phone });
      alert("User verified and logged in successfully!");
    } else {
      alert(response?.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3f0fa]">
      <div className="bg-white rounded-2xl p-8 w-[420px] shadow-2xl">
        <h2 className="text-2xl font-bold mb-2 text-[#2d1155]">
          Register your Business with PhonePe Payment Gateway
        </h2>

        <div className="text-sm mb-6 text-gray-700">Which product best fits your business needs?</div>

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
          className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-4xl text-base outline-none focus:ring-2 focus:ring-[#8606ec]"
        />

        <div className="flex items-center mb-4">
          <span className="px-1 text-gray-500">+91</span>
          <input
            type="tel"
            placeholder="XXXXXXXXXX"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/, "").slice(0, 10))}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-4xl text-base outline-none focus:ring-2 focus:ring-[#8606ec]"
            maxLength={10}
          />
          <button
            onClick={handleSendOtp}
            disabled={!isFormValid || loading}
            className={`ml-2 px-4 py-2 rounded-4xl text-sm font-semibold ${
              isFormValid
                ? "bg-[#8506ec] text-white hover:bg-[#a566df]"
                : "bg-[#ece6f9] text-[#a48ace]"
            }`}
          >
            {loading ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
          </button>
        </div>

        {otpSent && (
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-4xl focus:ring-2 focus:ring-[#8606ec]"
          />
        )}
        
        <button
          onClick={async (e) => {
            await handleVerifyOtp(e);
            // after verification completes, check for an auth marker and navigate to dashboard
            // adjust the keys below to match how your app stores auth (e.g. 'token' or 'user')
            const isAuthed = Boolean(localStorage.getItem("token") || localStorage.getItem("user"));
            if (isAuthed) {
              window.location.href = "/";
            }
          }}
          disabled={!otpSent || !otp || loading}
          className={`w-full py-3 rounded-full text-base font-semibold transition ${
            otpSent && otp
              ? "bg-[#8506ec] text-white hover:bg-[#a566df]"
              : "bg-[#ece6f9] text-[#a48ace]"
          }`}
        >
          {loading ? "Processing..." : "PROCEED"}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}
