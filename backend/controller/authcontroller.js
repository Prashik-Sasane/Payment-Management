const { addBankAccount } = require("../models/user.model");
const addBank = (req, res) => {
  const { user_id, account_number, bank_name, ifsc } = req.body;

  if (!user_id || !account_number || !bank_name || !ifsc) {
    return res.status(400).json({ error: "All fields are required" });
  }

  addBankAccount(user_id, { account_number, bank_name, ifsc }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "❌ Error adding bank", details: err.sqlMessage });
    }
    res.status(201).json({
      message: "✅ Bank account added successfully",
      data: { id: result.insertId, user_id, account_number, bank_name, ifsc },
    });
  });
};

module.exports = { addBank };
