const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware.js");
const { getAllPayRuns , createPayRun , processPayRun , completePayRun , deletePayRun} = require("../controller/paycontroller.js");

const HRauth = authMiddleware("hr_token");

router.get("/", HRauth, getAllPayRuns);  
router.post("/create", HRauth, createPayRun);
router.delete("/:id", HRauth, deletePayRun)
router.post("/process/:id", HRauth, processPayRun);
router.put("/complete/:id" , HRauth, completePayRun);
module.exports = router;
