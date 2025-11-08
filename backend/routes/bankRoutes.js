const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware.js"); 
const {
  getProfile,
  getBankAccounts,
  getLeaveBalance,
  addBankAccount,
  applyLeave,
  updateEmployeeProfile,
  getEmployeeDetails
} = require("../controller/bankcontroller");

const employeeAuth = authMiddleware("employee_token");

router.get("/profile", employeeAuth,   getProfile);
router.get("/bank", employeeAuth, getBankAccounts);
router.get("/leave-balance", employeeAuth, getLeaveBalance);
router.get("/details" , employeeAuth , getEmployeeDetails)

router.post("/bank", employeeAuth, addBankAccount);
router.post("/leave", employeeAuth, applyLeave);

router.put("/update-profile", employeeAuth, updateEmployeeProfile);

module.exports = router;
