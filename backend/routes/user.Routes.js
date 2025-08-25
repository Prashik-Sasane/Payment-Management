const express = require("express");
const {addBank} = require("../controllers/authcontroller")
const router = express.Router();

router.post("/addbank", addBank);

module.exports = router;