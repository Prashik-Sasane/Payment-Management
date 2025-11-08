const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.js");
const { createPayRun, processPayRun, getPayRuns } = require("../controller/paycontroller.js");

router.get("/", verifyToken, getPayRuns);
router.post("/process/:id", verifyToken, processPayRun);
router.post("/create", verifyToken, createPayRun);

module.exports = router;
