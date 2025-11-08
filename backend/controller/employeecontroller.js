// const db = require("../config/db");


// const getAllEmployees = async (req, res) => {
//   try {
//     const [employees] = await db.query("SELECT * FROM users");
//     res.status(200).json(employees);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch employees" });
//   }
// };


// const addEmployee = async (req, res) => {
//   try {
//     const { name, email, department, position, salary, joinDate } = req.body;
//     await db.query(
//       "INSERT INTO users (name, email, department, position, salary) VALUES (?, ?, ?, ?, ?, ?)",
//       [name, email, department, position, salary, joinDate]
//     );
//     res.status(201).json({ message: "Employee added successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to add employee" });
//   }
// };


// const deleteEmployee = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await db.query("DELETE FROM users WHERE id = ?", [id]);
//     res.status(200).json({ message: "Employee deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to delete employee" });
//   }
// };

// module.exports = { getAllEmployees, addEmployee, deleteEmployee };
