const db = require("../config/db.js");

const addBankAccount = (user_id, bank_account, callback) => {
  const query = "INSERT INTO bank_accounts (user_id, account_number, bank_name , ifsc) VALUES (?, ?, ?, ?)";
  db.query(query, [user_id, bank_account.account_number, bank_account.bank_name, bank_account.ifsc], (err, result) => {
    if (err) {
      console.error("❌ DB Insert Error:", err); // <-- log exact error
      return callback(err, null);
    }
    callback(null, result);
  });
};

const getBankAccounts = (user_id, callback) => {
  db.query("SELECT * FROM bank_accounts WHERE user_id = ?", [user_id], (err, results) => {
    if (err) {
      console.error("❌ DB Select Error:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = {
  addBankAccount,
  getBankAccounts
};
