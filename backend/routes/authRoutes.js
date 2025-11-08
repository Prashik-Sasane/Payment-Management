const express = require("express");
const {
  createEmployee,
  loginEmployee,
  createHR,
  loginHR,
} = require("../controller/authcontroller");

const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Employee Auth
router.post("/employee/register", createEmployee);
router.post("/employee/login", loginEmployee);

// HR Auth
router.post("/hr/register", createHR);
router.post("/hr/login", loginHR);

// Protected Routes
router.get("/employee/dashboard", authMiddleware("employee_token"), (req, res) => {
  res.json({ message: `Welcome Employee ID: ${req.user.id}` });
});

router.get("/hr/dashboard", authMiddleware("hr_token"), (req, res) => {
  res.json({ message: `Welcome HR ID: ${req.user.id}` });
});

module.exports = router;
