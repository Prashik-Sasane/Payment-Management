const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware.js");
const { getAllEmployees, addEmployee, deleteEmployee } = require("../controller/employeecontroller");

router.get("/data", authMiddleware("token"), getAllEmployees);
router.post("/data", authMiddleware("token"), addEmployee);
router.delete("/data/:id", authMiddleware("token"), deleteEmployee);

module.exports = router;
