// const db = require("../config/db.js");

// const sendMoney = (req, res) => {
//   const { sender_acc, receiver_acc, amount } = req.body;
//   if (!sender_acc || !receiver_acc || !amount)
//     return res.status(400).json({ message: "All fields required" });

//   db.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.beginTransaction(async (err) => {
//       if (err) throw err;

//       try {
//         const [sender] = await connection.promise().query("SELECT * FROM banks WHERE account_number = ?", [sender_acc]);
//         const [receiver] = await connection.promise().query("SELECT * FROM banks WHERE account_number = ?", [receiver_acc]);

//         if (!sender.length || !receiver.length)
//           throw new Error("Invalid account number");
//         if (sender[0].balance < amount)
//           throw new Error("Insufficient balance");

//         await connection.promise().query("UPDATE banks SET balance = balance - ? WHERE account_number = ?", [amount, sender_acc]);
//         await connection.promise().query("UPDATE banks SET balance = balance + ? WHERE account_number = ?", [amount, receiver_acc]);

//         await connection.promise().query(
//           "INSERT INTO transactions (sender_id, receiver_id, amount, status) VALUES (?, ?, ?, 'SUCCESS')",
//           [sender[0].user_id, receiver[0].user_id, amount]
//         );

//         await connection.commit();
//         res.json({ success: true, message: "Transaction successful" });
//       } catch (error) {
//         await connection.rollback();
//         res.status(400).json({ success: false, message: error.message });
//       } finally {
//         connection.release();
//       }
//     });
//   });
// };

// module.exports = { sendMoney };
