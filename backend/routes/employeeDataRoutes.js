const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const { getAllEmployees, addEmployee, deleteEmployee } = require("../controller/employeecontroller");

router.get("/data", verifyToken, getAllEmployees); // fetch all
router.post("/data", verifyToken, addEmployee);    // add new
router.delete("/data/:id", verifyToken, deleteEmployee); // delete

module.exports = router;
