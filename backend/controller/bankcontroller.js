const db = require("../config/db");


const getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, department, position, salary FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0)
      return res.status(404).json({ error: "Employee not found" });

    res.status(200).json({ user: rows[0] });
  } catch (err) {
    console.error("Error in getProfile:", err);
    res.status(500).json({ error: "Server error while fetching profile" });
  }
};

const updateEmployeeProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, department, position, salary } = req.body;

  try {
    await db.query(
      "UPDATE users SET name = ?, department = ?, position = ?, salary = ? WHERE id = ?",
      [name, department, position, salary, userId]
    );
    res.json({ message: "Employee profile updated successfully!" });
  } catch (err) {
    console.error("Error in updateEmployeeProfile:", err);
    res.status(500).json({ error: "Server error while updating profile" });
  }
};


const getBankAccounts = async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await db.query(
      "SELECT * FROM employee_bank_accounts WHERE user_id = ?",
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error in getBankAccounts:", err);
    res.status(500).json({ error: "Server error while fetching bank accounts" });
  }
};


const getLeaveBalance = async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await db.query(
      "SELECT leave_type, total_leaves, used_leaves, (total_leaves - used_leaves) AS remaining_leaves FROM employee_leave_balances WHERE id = ?",
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error in getLeaveBalance:", err);
    res.status(500).json({ error: "Server error while fetching leave balance" });
  }
};


const getEmployeeDetails = async (req, res) => {
  const userId = req.user.id;

  try {
    const [userRows] = await db.query(
      "SELECT id, name, email, department, position, salary FROM users WHERE id = ?",
      [userId]
    );

    if (userRows.length === 0)
      return res.status(404).json({ error: "Employee not found" });

    const user = userRows[0];

    const [bankAccounts] = await db.query(
      "SELECT bank_name, account_number, ifsc_code, account_holder_name, is_primary FROM employee_bank_accounts WHERE user_id = ?",
      [userId]
    );

    const [leaveBalanceRows] = await db.query(
      "SELECT leave_type, total_leaves, used_leaves, (total_leaves - used_leaves) AS remaining_leaves FROM employee_leave_balances WHERE user_id = ?",
      [userId]
    );

    const [leaveHistory] = await db.query(
      "SELECT leave_type, start_date, end_date, days, status FROM employee_leave_applications WHERE user_id = ? ORDER BY applied_at DESC",
      [userId]
    );

    res.json({
      ...user,
      bankAccounts,
      leaveBalances: leaveBalanceRows,
      leaveHistory,
    });
  } catch (err) {
    console.error("Error in getEmployeeDetails:", err);
    res.status(500).json({ error: "Server error while fetching employee details" });
  }
};


const addBankAccount = async (req, res) => {
  const { accountNumber, bankName, ifscCode, accountHolderName } = req.body;
  const userId = req.user.id;

  try {
    await db.query(
      "INSERT INTO employee_bank_accounts (user_id, account_number, bank_name, ifsc_code, account_holder_name, is_primary) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, accountNumber, bankName, ifscCode, accountHolderName, false]
    );
    res.json({ message: "Bank account saved successfully!" });
  } catch (err) {
    console.error("Error in addBankAccount:", err);
    res.status(500).json({ error: "Server error while saving bank account" });
  }
};


const deleteBankAccount = async (req, res) => {
  const userId = req.user.id;
  const { accountId } = req.params;

  try {
    const [result] = await db.query(
      "DELETE FROM employee_bank_accounts WHERE id = ? AND user_id = ?",
      [accountId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Bank account not found or unauthorized" });
    }

    res.json({ message: "Bank account deleted successfully!" });
  } catch (err) {
    console.error("Error in deleteBankAccount:", err);
    res.status(500).json({ error: "Server error while deleting bank account" });
  }
};


const applyLeave = async (req, res) => {
  const { leaveType, startDate, endDate, reason, days } = req.body;
  const userId = req.user.id;

  try {
    await db.query(
      "INSERT INTO employee_leave_applications (user_id, leave_type, start_date, end_date, reason, days) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, leaveType, startDate, endDate, reason, days]
    );
    res.json({ message: "Leave application submitted successfully!" });
  } catch (err) {
    console.error("Error in applyLeave:", err);
    res.status(500).json({ error: "Server error while submitting leave" });
  }
};

const getLeaveHistory = async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await db.query(
      "SELECT  id, leave_type, start_date, end_date, days, status FROM employee_leave_applications WHERE user_id = ? ORDER BY applied_at DESC",
      [userId]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error in getLeaveHistory:", err);
    res.status(500).json({ error: "Failed to fetch leave history" });
  }
};

const deleteLeave = async (req, res) => {
  const userId = req.user.id;
  const { leaveId } = req.params;

  try {
    const [result] = await db.query(
      "DELETE FROM employee_leave_applications WHERE id = ? AND user_id = ? AND status = 'PENDING'",
      [leaveId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Leave not found or cannot delete" });
    }

    res.json({ message: "Leave application deleted successfully!" });
  } catch (err) {
    console.error("Error in deleteLeave:", err);
    res.status(500).json({ error: "Server error while deleting leave application" });
  }
};


module.exports = {
  getProfile,
  getBankAccounts,
  getLeaveBalance,
  deleteBankAccount,
  addBankAccount,
  applyLeave,
  getLeaveHistory,
  deleteLeave,
  updateEmployeeProfile,
  getEmployeeDetails,
};
