const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth.js");
const { getAllEmployees, addEmployee, deleteEmployee } = require("../controller/employeecontroller");

router.get("/data", verifyToken, getAllEmployees); 
router.post("/data", verifyToken, addEmployee); 
router.delete("/data/:id", verifyToken, deleteEmployee);

module.exports = router;
