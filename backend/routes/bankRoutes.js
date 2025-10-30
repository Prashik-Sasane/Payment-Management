const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const {
  getBankAccounts,
  getLeaveBalance,
  addBankAccount,
  applyLeave,
  updateEmployeeProfile
} = require("../controller/bankcontroller");

// GET ROUTES
router.get("/profile" , verifyToken, getBankAccounts);
router.get("/bank", verifyToken, getBankAccounts);
router.get("/leave-balance" , verifyToken , getLeaveBalance);

// PUSH ROUTES
router.post("/bank", verifyToken, addBankAccount);
router.post("/leave", verifyToken, applyLeave);

// PUT ROUTES -when we update things
router.put("/update-profile", verifyToken, updateEmployeeProfile);


module.exports = router;
