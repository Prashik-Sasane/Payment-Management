const db = require("../config/db.js");

const createUser = (email, phone, callback) => {
  const query = "INSERT INTO user (email, phone) VALUES (?, ?) ON DUPLICATE KEY UPDATE email=?";
  db.query(query, [email, phone, email], callback);
};

const getUserByPhone = (phone, callback) => {
  db.query("SELECT * FROM user WHERE phone = ?", [phone], callback);
};

module.exports = { createUser , getUserByPhone}
