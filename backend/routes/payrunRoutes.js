const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware.js");
const { getAllPayRuns , createPayRun , processPayRun , completePayRun , deletePayRun , getPayrollSummary} = require("../controller/paycontroller.js");

const HRauth = authMiddleware("hr_token");

router.get("/", HRauth, getAllPayRuns);  
router.post("/create", HRauth, createPayRun);
router.delete("/:id", HRauth, deletePayRun)
router.post("/process/:id", HRauth, processPayRun);
router.put("/complete/:id" , HRauth, completePayRun);
router.get("/summary", HRauth, getPayrollSummary);

module.exports = router;
