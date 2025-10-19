const express = require("express");
const router = express.Router();
const { sendOtp, verifyOtp } = require("../controller/authcontroller");

router.post("/sent-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;
