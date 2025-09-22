const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const {
  register,
} = require("../controller/authcontroller");

const router = express.Router();

// Public routes
router.post("/register", register);
// router.post("/login", login);

// Protected routes (require authentication)
// router.get("/profile", authenticateToken, getProfile);
// router.post("/addbank", authenticateToken, addBank);
// router.get("/banks", authenticateToken, getBanks);
// router.put("/banks/:id/primary", authenticateToken, setPrimaryBank);
// router.post("/transfer", authenticateToken, transferMoney);
// router.get("/transactions", authenticateToken, getTransactions);
// router.get("/transactions/:transactionId", authenticateToken, getTransaction);
// router.post("/addmoney", authenticateToken, addMoney);

module.exports = router;