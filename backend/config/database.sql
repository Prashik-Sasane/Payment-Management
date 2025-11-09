CREATE DATABASE IF NOT EXISTS payroll_db;

use payroll_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('employee', 'hr') NOT NULL,
  department VARCHAR(100) DEFAULT 'General',
  position VARCHAR(100) DEFAULT 'Employee',
  salary DECIMAL(10,2) DEFAULT 0.00,
  status ENUM('PAID','PENDING','UNPAID') DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee_bank_accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  account_number VARCHAR(20) NOT NULL,
  bank_name VARCHAR(100) NOT NULL,
  ifsc_code VARCHAR(20) NOT NULL,
  account_holder_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(15),
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS employee_leave_balances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  leave_type VARCHAR(50) NOT NULL,
  total_leaves INT DEFAULT 0,
  used_leaves INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE employee_leave_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  leave_type VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  days INT NOT NULL,
  status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pay_runs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_employees INT DEFAULT 0,
  total_amount DECIMAL(10,2) DEFAULT 0.00,
  status ENUM('Draft', 'In Progress', 'Completed') DEFAULT 'Draft',
  processed_date DATE DEFAULT NULL,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS payroll_transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pay_run_id INT NOT NULL,
  employee_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  bonus DECIMAL(10,2) DEFAULT 0.00,
  status ENUM('PENDING', 'PAID') DEFAULT 'PENDING',
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pay_run_id) REFERENCES pay_runs(id) ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE pay_runs 
MODIFY COLUMN total_amount DECIMAL(15,2),
MODIFY COLUMN total_employees INT;  

select *from hr;
select *from payroll_transactions;
select *from employee_bank_accounts;
select *from employee_leave_applications;

ALTER TABLE payroll_transactions
ADD COLUMN tax DECIMAL(10,2) DEFAULT 0.00,
ADD COLUMN net_pay DECIMAL(10,2) GENERATED ALWAYS AS (amount + bonus - tax) STORED;