const { createUser, getUserByPhone } = require("../models/User");
const { generateOTP } = require("../utils/generateOTP");
const { sendSMS } = require("../utils/sendSMS");

let otpStore = {}; // temporary in-memory OTP store

const sendOtp = (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone is required" });

  const otp = generateOTP();
  otpStore[phone] = otp;

  sendSMS(phone, `Your OTP is ${otp}`);
  res.json({ message: "OTP sent successfully" });
};

const verifyOtp = (req, res) => {
  const { phone, otp, email } = req.body;
  if (!phone || !otp) return res.status(400).json({ message: "Phone and OTP required" });
   console.log("OTP Store:", otpStore, "Received OTP:", otp);
  if (otpStore[phone] && otpStore[phone].toString() === otp.toString()) {
    getUserByPhone(phone, (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length === 0) {
        createUser(email, phone, (err) => {
          if (err) return res.status(500).json(err);
          delete otpStore[phone];
          return res.json({ success: true, message: "User created and verified" });
        });
      } else {
        delete otpStore[phone];
        return res.json({ success: true, message: "User verified" });
      }
    });
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }
};

module.exports = { sendOtp, verifyOtp };
