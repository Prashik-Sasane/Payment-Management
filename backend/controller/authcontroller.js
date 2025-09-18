const bcrypt = require('bcryptjs');
const { 
  createUser, 
  getUserByEmail, 
  getUserById, 
  updateUserBalance,
  getUserByUsername,
  addBankAccount,
  getBankAccounts,
  getBankAccountById,
  setPrimaryBankAccount,
  createTransaction,
  updateTransactionStatus,
  getTransactionsByUserId,
  getTransactionById,
  logTransaction
} = require('../models/userModel');
const { generateToken } = require('../middleware/auth');

// User Registration
const register = (req, res) => {
  const { username, email, password, full_name, phone } = req.body;

  if (!username || !email || !password || !full_name) {
    return res.status(400).json({ error: "Username, email, password, and full name are required" });
  }

  // Check if user already exists
  getUserByEmail(email, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Create new user
    createUser({ username, email, password, full_name, phone }, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: "Username or email already exists" });
        }
        return res.status(500).json({ error: "Failed to create user" });
      }

      const token = generateToken(result.insertId);
      res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
          id: result.insertId,
          username,
          email,
          full_name,
          phone
        }
      });
    });
  });
};

// User Login
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  getUserByEmail(email, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: "Authentication error" });
      }

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = generateToken(user.id);
      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          full_name: user.full_name,
          phone: user.phone,
          balance: user.balance,
          is_verified: user.is_verified
        }
      });
    });
  });
};

// Get user profile
const getProfile = (req, res) => {
  res.json({
    message: "Profile retrieved successfully",
    user: req.user
  });
};

// Add bank account
const addBank = (req, res) => {
  const { account_number, bank_name, ifsc, account_holder_name } = req.body;
  const user_id = req.user.id;

  if (!account_number || !bank_name || !ifsc || !account_holder_name) {
    return res.status(400).json({ error: "All bank account fields are required" });
  }

  addBankAccount(user_id, { account_number, bank_name, ifsc, account_holder_name }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to add bank account", details: err.sqlMessage });
    }
    
    res.status(201).json({
      message: "Bank account added successfully",
      data: {
        id: result.insertId,
        user_id,
        account_number,
        bank_name,
        ifsc,
        account_holder_name
      }
    });
  });
};

// Get user's bank accounts
const getBanks = (req, res) => {
  const user_id = req.user.id;

  getBankAccounts(user_id, (err, accounts) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve bank accounts" });
    }
    
    res.json({
      message: "Bank accounts retrieved successfully",
      accounts
    });
  });
};

// Set primary bank account
const setPrimaryBank = (req, res) => {
  const { id: accountId } = req.params;
  const user_id = req.user.id;

  setPrimaryBankAccount(accountId, user_id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to set primary bank account" });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Bank account not found" });
    }
    
    res.json({
      message: "Primary bank account updated successfully"
    });
  });
};

// Transfer money
const transferMoney = (req, res) => {
  const { receiver_username, amount, description, bank_account_id } = req.body;
  const sender_id = req.user.id;

  if (!receiver_username || !amount || amount <= 0) {
    return res.status(400).json({ error: "Valid receiver username and amount are required" });
  }

  if (sender_id === receiver_username) {
    return res.status(400).json({ error: "Cannot transfer to yourself" });
  }

  // Check if sender has sufficient balance
  if (req.user.balance < amount) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  // Get receiver by username
  getUserByUsername(receiver_username, (err, receiver) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (!receiver) {
      return res.status(404).json({ error: "Receiver not found" });
    }

    // Create transaction
    createTransaction({
      sender_id,
      receiver_id: receiver.id,
      amount,
      transaction_type: 'transfer',
      description,
      bank_account_id
    }, (err, transactionResult) => {
      if (err) {
        return res.status(500).json({ error: "Failed to create transaction" });
      }

      const transactionId = transactionResult.transactionId;

      // Log transaction
      logTransaction(transactionId, 'created', null, 'pending', {
        sender_id,
        receiver_id: receiver.id,
        amount,
        description
      }, (err) => {
        if (err) {
          console.error("Failed to log transaction:", err);
        }
      });

      // Update balances
      updateUserBalance(sender_id, -amount, (err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to update sender balance" });
        }

        updateUserBalance(receiver.id, amount, (err) => {
          if (err) {
            // Rollback sender balance
            updateUserBalance(sender_id, amount, () => {});
            return res.status(500).json({ error: "Failed to update receiver balance" });
          }

          // Update transaction status
          updateTransactionStatus(transactionId, 'completed', (err) => {
            if (err) {
              console.error("Failed to update transaction status:", err);
            }

            // Log completion
            logTransaction(transactionId, 'completed', 'pending', 'completed', {
              final_amount: amount
            }, (err) => {
              if (err) {
                console.error("Failed to log transaction completion:", err);
              }
            });

            res.json({
              message: "Transfer completed successfully",
              transaction: {
                transaction_id: transactionId,
                amount,
                receiver: receiver.username,
                status: 'completed'
              }
            });
          });
        });
      });
    });
  });
};

// Get user transactions
const getTransactions = (req, res) => {
  const user_id = req.user.id;
  const limit = parseInt(req.query.limit) || 50;
  const offset = parseInt(req.query.offset) || 0;

  getTransactionsByUserId(user_id, limit, offset, (err, transactions) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve transactions" });
    }
    
    res.json({
      message: "Transactions retrieved successfully",
      transactions,
      pagination: {
        limit,
        offset,
        count: transactions.length
      }
    });
  });
};

// Get specific transaction
const getTransaction = (req, res) => {
  const { transactionId } = req.params;
  const user_id = req.user.id;

  getTransactionById(transactionId, (err, transaction) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // Check if user is involved in this transaction
    if (transaction.sender_id !== user_id && transaction.receiver_id !== user_id) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json({
      message: "Transaction retrieved successfully",
      transaction
    });
  });
};

// Add money to wallet (deposit)
const addMoney = (req, res) => {
  const { amount, bank_account_id } = req.body;
  const user_id = req.user.id;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Valid amount is required" });
  }

  if (!bank_account_id) {
    return res.status(400).json({ error: "Bank account is required for deposit" });
  }

  // Verify bank account belongs to user
  getBankAccountById(bank_account_id, user_id, (err, bankAccount) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (!bankAccount) {
      return res.status(404).json({ error: "Bank account not found" });
    }

    // Create deposit transaction
    createTransaction({
      sender_id: user_id,
      receiver_id: null,
      amount,
      transaction_type: 'deposit',
      description: `Deposit from ${bankAccount.bank_name} - ${bankAccount.account_number}`,
      bank_account_id
    }, (err, transactionResult) => {
      if (err) {
        return res.status(500).json({ error: "Failed to create transaction" });
      }

      const transactionId = transactionResult.transactionId;

      // Update user balance
      updateUserBalance(user_id, amount, (err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to update balance" });
        }

        // Update transaction status
        updateTransactionStatus(transactionId, 'completed', (err) => {
          if (err) {
            console.error("Failed to update transaction status:", err);
          }

          res.json({
            message: "Money added successfully",
            transaction: {
              transaction_id: transactionId,
              amount,
              status: 'completed'
            }
          });
        });
      });
    });
  });
};

module.exports = {
  register,
  login,
  getProfile,
  addBank,
  getBanks,
  setPrimaryBank,
  transferMoney,
  getTransactions,
  getTransaction,
  addMoney
};