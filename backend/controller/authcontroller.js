const bcrypt = require("bcryptjs");
const db = require("../config/db");
const { generateToken } = require("../services/auth");

const createEmployee = async (req, res) => {
  const { name, email, password, department, position, salary } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role, department, position, salary) VALUES (?, ?, ?, 'employee', ?, ?, ?)",
      [name, email, hashedPassword, department, position, salary]
    );

    // Auto-generate token
    const token = generateToken({ id: result.insertId, role: "employee" });

    // Set cookie
    res.cookie("employee_token", token, { httpOnly: true, secure: false });

    // Return response with token
    res.status(201).json({ message: "Employee registered successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Employee registration failed" });
  }
};

// ✅ Login Employee
const loginEmployee = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ? AND role = 'employee'", [email]);
    const user = rows[0];
    if (!user) return res.status(404).json({ error: "Employee not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken({ id: user.id, role: user.role });
    res.cookie("employee_token", token, { httpOnly: true, secure: false });
    res.json({ message: "Employee logged in successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};

// ✅ Register HR
const createHR = async (req, res) => {
  const { name, email, password, department } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role, department) VALUES (?, ?, ?, 'hr', ?)",
      [name, email, hashedPassword, department]
    );

    const token = generateToken({ id: result.insertId, role: "hr" });
    res.cookie("hr_token", token, { httpOnly: true, secure: false });

    res.status(201).json({ message: "HR registered successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "HR registration failed" });
  }
};


// ✅ Login HR
const loginHR = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ? AND role = 'hr'", [email]);
    const user = rows[0];
    if (!user) return res.status(404).json({ error: "HR not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken({ id: user.id, role: user.role });
    res.cookie("hr_token", token, { httpOnly: true, secure: false });
    res.json({ message: "HR logged in successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { createEmployee, loginEmployee, createHR, loginHR };
