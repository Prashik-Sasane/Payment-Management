// const mysql = require('mysql2');
// const fs = require('fs');
// const path = require('path');

// // Database configuration
// const dbConfig = {
//   host: "localhost",
//   user: "root",
//   password: "12410279",
//   multipleStatements: true
// };

// // Create connection
// const connection = mysql.createConnection(dbConfig);

// console.log('🚀 Setting up Payment Management System Database...\n');

// // Connect to MySQL
// connection.connect((err) => {
//   if (err) {
//     console.error('❌ MySQL connection error:', err.message);
//     process.exit(1);
//   }
  
//   console.log('✅ Connected to MySQL server');
  
//   // Read and execute SQL file
//   const sqlPath = path.join(__dirname, 'config', 'database.sql');
  
//   if (!fs.existsSync(sqlPath)) {
//     console.error('❌ Database SQL file not found:', sqlPath);
//     process.exit(1);
//   }
  
//   const sqlContent = fs.readFileSync(sqlPath, 'utf8');
  
//   console.log('📊 Creating database and tables...');
  
//   connection.query(sqlContent, (err, results) => {
//     if (err) {
//       console.error('❌ Database setup error:', err.message);
//       process.exit(1);
//     }
    
//     console.log('✅ Database and tables created successfully!');
//     console.log('\n📋 Database setup completed:');
//     console.log('   - Database: payment');
//     console.log('   - Tables: users, bank_accounts, transactions, transaction_logs, payment_methods');
//     console.log('\n🎉 You can now start the backend server with: npm run dev');
    
//     connection.end();
//   });
// });
