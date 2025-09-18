const db = require("../config/db.js");
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// User operations
const createUser = (userData, callback) => {
  const { username, email, password, full_name, phone } = userData;
  
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return callback(err, null);
    }
    
    const query = "INSERT INTO users (username, email, password, full_name, phone) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [username, email, hashedPassword, full_name, phone], (err, result) => {
      if (err) {
        console.error("❌ User creation error:", err);
        return callback(err, null);
      }
      callback(null, result);
    });
  });
};

const getUserByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("❌ Get user by email error:", err);
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

const getUserById = (id, callback) => {
  const query = "SELECT id, username, email, full_name, phone, balance, is_verified, created_at FROM users WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("❌ Get user by ID error:", err);
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

const updateUserBalance = (userId, amount, callback) => {
  const query = "UPDATE users SET balance = balance + ? WHERE id = ?";
  db.query(query, [amount, userId], (err, result) => {
    if (err) {
      console.error("❌ Update balance error:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Bank account operations
const addBankAccount = (user_id, bank_account, callback) => {
  const { account_number, bank_name, ifsc, account_holder_name } = bank_account;
  const query = "INSERT INTO bank_accounts (user_id, account_number, bank_name, ifsc, account_holder_name) VALUES (?, ?, ?, ?, ?)";
  
  db.query(query, [user_id, account_number, bank_name, ifsc, account_holder_name], (err, result) => {
    if (err) {
      console.error("❌ Add bank account error:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

const getBankAccounts = (user_id, callback) => {
  const query = "SELECT * FROM bank_accounts WHERE user_id = ? ORDER BY is_primary DESC, created_at DESC";
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("❌ Get bank accounts error:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

const getBankAccountById = (accountId, userId, callback) => {
  const query = "SELECT * FROM bank_accounts WHERE id = ? AND user_id = ?";
  db.query(query, [accountId, userId], (err, results) => {
    if (err) {
      console.error("❌ Get bank account by ID error:", err);
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

const setPrimaryBankAccount = (accountId, userId, callback) => {
  // First, unset all primary accounts for this user
  const unsetQuery = "UPDATE bank_accounts SET is_primary = FALSE WHERE user_id = ?";
  db.query(unsetQuery, [userId], (err) => {
    if (err) {
      return callback(err, null);
    }
    
    // Then set the specified account as primary
    const setQuery = "UPDATE bank_accounts SET is_primary = TRUE WHERE id = ? AND user_id = ?";
    db.query(setQuery, [accountId, userId], (err, result) => {
      if (err) {
        console.error("❌ Set primary bank account error:", err);
        return callback(err, null);
      }
      callback(null, result);
    });
  });
};

// Transaction operations
const createTransaction = (transactionData, callback) => {
  const transactionId = uuidv4();
  const { sender_id, receiver_id, amount, transaction_type, description, bank_account_id } = transactionData;
  
  const query = `INSERT INTO transactions 
    (transaction_id, sender_id, receiver_id, amount, transaction_type, description, bank_account_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  db.query(query, [transactionId, sender_id, receiver_id, amount, transaction_type, description, bank_account_id], (err, result) => {
    if (err) {
      console.error("❌ Create transaction error:", err);
      return callback(err, null);
    }
    callback(null, { ...result, transactionId });
  });
};

const updateTransactionStatus = (transactionId, status, callback) => {
  const query = "UPDATE transactions SET status = ? WHERE transaction_id = ?";
  db.query(query, [status, transactionId], (err, result) => {
    if (err) {
      console.error("❌ Update transaction status error:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

const getTransactionsByUserId = (userId, limit = 50, offset = 0, callback) => {
  const query = `
    SELECT t.*, 
           sender.username as sender_username, 
           receiver.username as receiver_username,
           ba.account_number, ba.bank_name
    FROM transactions t
    LEFT JOIN users sender ON t.sender_id = sender.id
    LEFT JOIN users receiver ON t.receiver_id = receiver.id
    LEFT JOIN bank_accounts ba ON t.bank_account_id = ba.id
    WHERE t.sender_id = ? OR t.receiver_id = ?
    ORDER BY t.created_at DESC
    LIMIT ? OFFSET ?
  `;
  
  db.query(query, [userId, userId, limit, offset], (err, results) => {
    if (err) {
      console.error("❌ Get transactions error:", err);
      return callback(err, null);
    }
    callback(null, results);
  });
};

const getTransactionById = (transactionId, callback) => {
  const query = `
    SELECT t.*, 
           sender.username as sender_username, 
           receiver.username as receiver_username,
           ba.account_number, ba.bank_name
    FROM transactions t
    LEFT JOIN users sender ON t.sender_id = sender.id
    LEFT JOIN users receiver ON t.receiver_id = receiver.id
    LEFT JOIN bank_accounts ba ON t.bank_account_id = ba.id
    WHERE t.transaction_id = ?
  `;
  
  db.query(query, [transactionId], (err, results) => {
    if (err) {
      console.error("❌ Get transaction by ID error:", err);
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

const getUserByUsername = (username, callback) => {
  const query = "SELECT id, username, email, full_name, phone, balance, is_verified FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("❌ Get user by username error:", err);
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

const logTransaction = (transactionId, action, oldStatus, newStatus, details, callback) => {
  const query = "INSERT INTO transaction_logs (transaction_id, action, old_status, new_status, details) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [transactionId, action, oldStatus, newStatus, JSON.stringify(details)], (err, result) => {
    if (err) {
      console.error("❌ Log transaction error:", err);
      return callback(err, null);
    }
    callback(null, result);
  });
};

module.exports = {
  // User operations
  createUser,
  getUserByEmail,
  getUserById,
  updateUserBalance,
  getUserByUsername,
  
  // Bank account operations
  addBankAccount,
  getBankAccounts,
  getBankAccountById,
  setPrimaryBankAccount,
  
  // Transaction operations
  createTransaction,
  updateTransactionStatus,
  getTransactionsByUserId,
  getTransactionById,
  logTransaction
};