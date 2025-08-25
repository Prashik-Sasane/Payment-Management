const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12410279",
    database: "payment"
});

db.connect((err) => {
    if (err) {
        console.error("❌ MySQL connection error:", err.message);
    } else {
        console.log("✅ MySQL Connected");
    }
});

module.exports = db;