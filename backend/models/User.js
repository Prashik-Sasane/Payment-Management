// const db = require("../config/db");
// const bcrypt = require("bcryptjs");

// function ensureUsersTable() {
//   const sql = `
//     CREATE TABLE IF NOT EXISTS users (
//       id INT PRIMARY KEY AUTO_INCREMENT,
//       email VARCHAR(100) UNIQUE NOT NULL,
//       password VARCHAR(255) NOT NULL,
//       full_name VARCHAR(100) NOT NULL,
//       role ENUM('hr','employee') NOT NULL DEFAULT 'employee',
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
//   `;
//   db.query(sql, () => {});
// }

// function seedDefaultUsers(callback) {
//   const candidates = [
//     { email: "hr@company.com", password: "hr123", full_name: "HR Admin", role: "hr" },
//     { email: "emp@company.com", password: "emp123", full_name: "Employee One", role: "employee" },
//   ];

//   let remaining = candidates.length;
//   candidates.forEach((u) => {
//     db.query("SELECT id FROM users WHERE email = ?", [u.email], (err, rows) => {
//       if (!rows || rows.length === 0) {
//         bcrypt.hash(u.password, 10, (e, hash) => {
//           if (e) return doneOne();
//           db.query(
//             "INSERT INTO users (email, password, full_name, role) VALUES (?,?,?,?)",
//             [u.email, hash, u.full_name, u.role],
//             () => doneOne()
//           );
//         });
//       } else {
//         doneOne();
//       }
//     });
//   });

//   function doneOne() {
//     remaining -= 1;
//     if (remaining === 0 && typeof callback === "function") callback();
//   }
// }

// function findUserByEmail(email, cb) {
//   db.query("SELECT * FROM user WHERE email = ?", [email], (err, rows) => {
//     if (err) return cb(err);
//     cb(null, rows && rows[0]);
//   });
// }

// function getUserById(id, cb) {
//   db.query("SELECT id, email, full_name, role, created_at FROM user WHERE id = ?", [id], (err, rows) => {
//     if (err) return cb(err);
//     cb(null, rows && rows[0]);
//   });
// }

// module.exports = {
//   ensureUsersTable,
//   seedDefaultUsers,
//   findUserByEmail,
//   getUserById,
// };
