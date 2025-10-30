const db = require("../config/db");

const getProfile = async (req, res) => {
  const employeeId = req.user.id;
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, employeeId, department, position, salary FROM users WHERE id = ?",
      [employeeId]
    );

    if (rows.length === 0)
      return res.status(404).json({ error: "Employee not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching profile" });
  }
};

const updateEmployeeProfile = async (req, res) => {
  const employeeId = req.user.id; 
  const { name, department, position, salary } = req.body;

  try {
    await db.query(
      "UPDATE users SET name = ?, department = ?, position = ?, salary = ? WHERE id = ?",
      [name, department, position, salary, employeeId]
    );

    res.json({ message: "Employee profile updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while updating profile" });
  }
};

const getBankAccounts = async (req, res) => {
  const employeeId = req.user.id;
  try {
    const [rows] = await db.query(
      "SELECT * FROM employee_bank_accounts WHERE employee_id = ?",
      [employeeId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching bank accounts" });
  }
};


const getLeaveBalance = async (req, res) => {
  const employeeId = req.user.id;
  try {
    const [rows] = await db.query(
      "SELECT leave_type, total_leaves, used_leaves, (total_leaves - used_leaves) AS remaining_leaves FROM employee_leave_balances WHERE employee_id = ?",
      [employeeId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching leave balance" });
  }
};


const addBankAccount = async (req, res) => {
  const { accountNumber, bankName, ifscCode, accountHolderName } = req.body;
  const employeeId = req.user.id;

  try {
    await db.query(
      "INSERT INTO employee_bank_accounts (employee_id, account_number, bank_name, ifsc_code, account_holder_name, is_primary) VALUES (?, ?, ?, ?, ?, ?)",
      [employeeId, accountNumber, bankName, ifscCode, accountHolderName, false]
    );
    res.json({ message: "Bank account saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while saving bank account" });
  }
};

const applyLeave = async (req, res) => {
  const { leaveType, startDate, endDate, reason, days } = req.body;
  const employeeId = req.user.id;

  try {
    await db.query(
      "INSERT INTO employee_leave_applications (employee_id, leave_type, start_date, end_date, reason, days) VALUES (?, ?, ?, ?, ?, ?)",
      [employeeId, leaveType, startDate, endDate, reason, days]
    );
    res.json({ message: "Leave application submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while submitting leave" });
  }
};

module.exports = { getBankAccounts, getLeaveBalance , addBankAccount, applyLeave , getProfile , updateEmployeeProfile};
