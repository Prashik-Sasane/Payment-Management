const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware.js");
const getHRProfile = require("../controller/hrcontroller");

const HRauth = authMiddleware("hr_token");
router.get("/profile", HRauth, getHRProfile);

module.exports = router;
