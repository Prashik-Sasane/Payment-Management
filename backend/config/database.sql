-- Payment Management System Database Schema
CREATE DATABASE IF NOT EXISTS payment_system_db;
USE payment_system_db;
-- Users table
CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Bank accounts table
CREATE TABLE banks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  bank_name VARCHAR(100) NOT NULL,
  account_number VARCHAR(30) NOT NULL UNIQUE,
  ifsc_code VARCHAR(20) NOT NULL,
  balance DECIMAL(12,2) DEFAULT 0.00,
  linked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Transactions table
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_bank_id INT NOT NULL,
  receiver_bank_id INT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  transaction_type ENUM('SEND', 'RECEIVE') NOT NULL,
  status ENUM('SUCCESS', 'FAILED', 'PENDING') DEFAULT 'SUCCESS',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_bank_id) REFERENCES banks(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_bank_id) REFERENCES banks(id) ON DELETE CASCADE
);
-- Payment methods table
CREATE TABLE rewards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  points INT DEFAULT 0,
  reward_type ENUM('CASHBACK', 'BONUS', 'OFFER') DEFAULT 'CASHBACK',
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE payment_score (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  score INT DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Transaction logs for audit trail
CREATE TABLE otp_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone VARCHAR(15),
  otp VARCHAR(6),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 5 MINUTE)
);
