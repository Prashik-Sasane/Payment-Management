// const db = require("../config/db");

// const createPayRun = async (req, res) => {
//   const { name, startDate, endDate } = req.body;
//   const createdBy = req.user?.email || "HR_Admin";

//   try {
//     const [result] = await db.query(
//       `INSERT INTO payruns 
//         (name, startDate, endDate, status, totalEmployees, totalAmount, createdBy, createdAt)
//        VALUES (?, ?, ?, 'Draft', 0, 0.00, ?, NOW())`,
//       [name, startDate, endDate, createdBy]
//     );

//     res.json({
//       id: result.insertId,
//       name,
//       startDate,
//       endDate,
//       status: "Draft",
//       totalEmployees: 0,
//       totalAmount: 0.0,
//       createdBy,
//       createdAt: new Date(),
//     });
//   } catch (err) {
//     console.error("Error creating pay run:", err);
//     res.status(500).json({ message: "Error creating pay run" });
//   }
// };


// //  Process Pay Run (bulk send salary)
// const processPayRun = async (req, res) => {
//   const { id } = req.params;
//   const { bonusPercent = 0 } = req.body;

//   try {
//     const [employees] = await db.query("SELECT employeeId, salary FROM users WHERE role = 'employee'");
//     if (employees.length === 0)
//       return res.status(404).json({ message: "No employees found" });

//     let totalAmount = 0;

//     for (const emp of employees) {
//       const bonus = (emp.salary * bonusPercent) / 100;
//       const amount = emp.salary + bonus;
//       totalAmount += amount;

//       const txnId = "TXN" + Math.floor(100000 + Math.random() * 900000);

//       await db.query(
//         "INSERT INTO payments (payrunId, employeeId, amount, month, bonus, txnId, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
//         [id, emp.employeeId, amount, "Monthly", bonus, txnId, "PAID"]
//       );
//     }

//     await db.query(
//       "UPDATE payruns SET status = ?, totalEmployees = ?, totalAmount = ? WHERE id = ?",
//       ["Completed", employees.length, totalAmount, id]
//     );

//     res.json({
//       message: "Pay run processed successfully",
//       totalEmployees: employees.length,
//       totalAmount,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error processing pay run" });
//   }
// };

// // Get All Pay Runs
// const getPayRuns = async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT * FROM payruns ORDER BY createdAt DESC");
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching pay runs" });
//   }
// };

// module.exports = {getPayRuns , processPayRun , createPayRun};