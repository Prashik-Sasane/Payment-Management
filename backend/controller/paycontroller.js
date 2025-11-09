const db = require("../config/db");


const getAllPayRuns = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        id,
        name,
        start_date AS startDate,
        end_date AS endDate,
        total_employees AS totalEmployees,
        total_amount AS totalAmount,
        status,
        DATE_FORMAT(processed_date, '%Y-%m-%d %H:%i:%s') AS processedDate,
        created_by AS createdBy,
        created_at AS createdAt
      FROM pay_runs
      ORDER BY created_at DESC
    `);
    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Error fetching pay runs:", err);
    res.status(500).json({ error: "Failed to fetch pay runs" });
  }
};


const createPayRun = async (req, res) => {
  const { name, startDate, endDate } = req.body;

  try {
    //  Fetch HR name and id where role = 'hr'
    const [hrRows] = await db.query("SELECT id, name FROM users WHERE role = 'hr' LIMIT 1");
    if (hrRows.length === 0) {
      return res.status(400).json({ error: "No HR found in system" });
    }

    const hr = hrRows[0];

    // 🔹 Insert new pay run using HR info
    const [result] = await db.query(
      "INSERT INTO pay_runs (name, start_date, end_date, created_by) VALUES (?, ?, ?, ?)",
      [name, startDate, endDate, hr.id]
    );

    res.json({
      id: result.insertId,
      name,
      startDate,
      endDate,
      createdBy: hr.name,
      status: "Draft",
    });
  } catch (err) {
    console.error("Error creating pay run:", err);
    res.status(500).json({ error: "Failed to create pay run" });
  }
};


const processPayRun = async (req, res) => {
  const { id } = req.params;
  const { bonusPercent = 0 } = req.body;

  try {
    // Step 1: Check pay run exists
    const [payRun] = await db.query("SELECT * FROM pay_runs WHERE id = ?", [id]);
    if (payRun.length === 0)
      return res.status(404).json({ error: "Pay run not found" });

    // Step 2: Get all employees
    const [employees] = await db.query(
      "SELECT id, salary FROM users WHERE role = 'employee'"
    );
    if (employees.length === 0)
      return res.status(400).json({ error: "No employees found for payroll" });

    // Step 3: Calculate total
    let totalAmount = 0;
    for (const emp of employees) {
      const baseSalary = Number(emp.salary || 0);
      const bonusAmount = (baseSalary * bonusPercent) / 100;
      const totalPay = baseSalary + bonusAmount;
      totalAmount += totalPay;

      // Insert payroll transaction
      await db.query(
        `INSERT INTO payroll_transactions 
          (pay_run_id, employee_id, amount, bonus, status)
         VALUES (?, ?, ?, ?, 'PENDING')`,
        [id, emp.id, baseSalary, bonusAmount]
      );
    }

    // Step 4: Update pay run summary
    await db.query(
      `UPDATE pay_runs 
       SET total_employees = ?, 
           total_amount = ?, 
           status = 'In Progress', 
           processed_date = NOW() 
       WHERE id = ?`,
      [employees.length, totalAmount.toFixed(2), id]
    );

    res.json({
      success: true,
      message: "✅ Payroll processed successfully",
      totalEmployees: employees.length,
      totalAmount: totalAmount.toFixed(2),
      processedDate: new Date().toISOString(),
    });
  } catch (err) {
    console.error("❌ Error processing payroll:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const completePayRun = async (req, res) => {
  const { id } = req.params;

  try {
    // Step 1: Mark all transactions as PAID
    await db.query(
      "UPDATE payroll_transactions SET status = 'PAID' WHERE pay_run_id = ?",
      [id]
    );

    // Step 2: Update user salary status
    await db.query("UPDATE users SET status = 'PAID' WHERE role = 'employee'");

    // Step 3: Update pay run status
    await db.query(
      "UPDATE pay_runs SET status = 'Completed', processed_date = NOW() WHERE id = ?",
      [id]
    );

    res.json({ message: "✅ Pay run completed successfully!" });
  } catch (err) {
    console.error("❌ Error completing pay run:", err);
    res.status(500).json({ error: "Failed to complete pay run" });
  }
};

const deletePayRun = async (req, res) => {
  const { id } = req.params;
  try {
  
    const [result] = await db.query("DELETE FROM pay_runs WHERE id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Pay run not found" });

    res.json({ message: "🗑️ Pay run deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting pay run:", err);
    res.status(500).json({ message: "Error deleting pay run" });
  }
};

const getPayrollSummary = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        MIN(MONTHNAME(pr.start_date)) AS month,
        SUM(pt.amount + pt.bonus) AS total_net_pay,
        SUM(pt.bonus) AS total_bonus,
        SUM(pt.amount * 0.05) AS total_deductions,
        SUM(pt.tax) AS total_tax
      FROM pay_runs pr
      JOIN payroll_transactions pt ON pr.id = pt.pay_run_id
      WHERE YEAR(pr.start_date) = YEAR(CURDATE())
      GROUP BY MONTH(pr.start_date)
      ORDER BY MONTH(pr.start_date)
    `);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching payroll summary:", err);
    res.status(500).json({ error: "Failed to fetch payroll summary" });
  }
};


module.exports = {
  getAllPayRuns,
  createPayRun,
  processPayRun,
  completePayRun,
  deletePayRun,
  getPayrollSummary
};
