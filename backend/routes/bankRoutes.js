const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware.js"); 
const {
  getProfile,
  getBankAccounts,
  getLeaveBalance,
  addBankAccount,
  deleteBankAccount,
  applyLeave,
  getLeaveHistory,
  deleteLeave,
  updateEmployeeProfile,
  getEmployeeDetails,
  getEmployeePayroll
} = require("../controller/bankcontroller");

const employeeAuth = authMiddleware("employee_token");

router.get("/profile", employeeAuth,getProfile);
router.get("/bank", employeeAuth, getBankAccounts);
router.get("/leave-balance", employeeAuth, getLeaveBalance);
router.get("/leave-history", employeeAuth,  getLeaveHistory)
router.get("/details" , employeeAuth , getEmployeeDetails)
router.get("/payroll" , employeeAuth, getEmployeePayroll)
router.post("/bank", employeeAuth, addBankAccount);
router.post("/leave", employeeAuth, applyLeave);

router.delete("/bank/:accountId", employeeAuth, deleteBankAccount);
router.delete("/leave/:leaveId", employeeAuth, deleteLeave);


router.put("/update-profile", employeeAuth, updateEmployeeProfile);

module.exports = router;
