// add bank/select bank logic
const db = require("../config/db");

const addBank = (req, res) => {
  const { user_id, bank_name, account_number, ifsc_code } = req.body;
  const query = "INSERT INTO banks (user_id, bank_name, account_number, ifsc_code) VALUES (?, ?, ?, ?)";
  db.query(query, [user_id, bank_name, account_number, ifsc_code], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Bank added successfully" });
  });
};

const getBanks = (req, res) => {
  const { user_id } = req.params;
  const query = "SELECT * FROM banks WHERE user_id = ?";
  db.query(query, [user_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

module.exports = { addBank ,getBanks };