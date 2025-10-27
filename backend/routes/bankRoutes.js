const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
  getBankAccounts,
  getLeaveBalance,
  addBankAccount,
  applyLeave,
} = require("../controller/bankcontroller");

// Routes
router.get("/bank", verifyToken, getBankAccounts);
router.get("/leave-balance" , verifyToken , getLeaveBalance);
router.post("/bank", verifyToken, addBankAccount);
router.post("/leave", verifyToken, applyLeave);

module.exports = router;
