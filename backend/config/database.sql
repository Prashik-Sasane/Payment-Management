-- CREATE DATABASE
create database payment_system_db;

-- USE COMMAND TO USE DATABASE
use payment_system_db;

-- CREATE USERS TABLE 
CREATE table users (
   id int auto_increment primary key,
   name varchar(100) not null,
   email varchar(100) unique not null,
   role enum('hr' , 'employee') default 'employee'
);
-- SHOW ALL THE DATA
select *from users;

-- ALTER TABLE COMMANDS
ALTER TABLE users ADD COLUMN password VARCHAR(255) NOT NULL;
ALTER TABLE users ADD COLUMN employeeId VARCHAR(20) UNIQUE;

ALTER TABLE users
ADD column department varchar(100) default 'General',
ADD column position varchar(100) default 'Employee',
ADD column salary decimal(10,2) default 0.00,
ADD column performance ENUM('Good','Moderate','Poor') DEFAULT 'Moderate',
ADD column status ENUM('PAID','PENDING','UNPAID') DEFAULT 'PAID';

-- CREATE EMPLOYEE_BANK_ACCOUNTS TABLE
CREATE TABLE employee_bank_accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    ifsc_code VARCHAR(20) NOT NULL,
    account_holder_name VARCHAR(100) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES users(id)
);

-- CREATE EMPLOYEE_LEAVE_APPLICATIONS TABLE
CREATE TABLE employee_leave_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    leave_type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    days INT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES users(id)
);
-- SHOW ALL THE DATA IN THIS TABLE
select *from employee_leave_applications;

-- CREATE EMPLOYEE_LEAVE_BALANCES TABLE
CREATE TABLE employee_leave_balances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    leave_type VARCHAR(50) DEFAULT 'Annual',
    total_leaves INT DEFAULT 15,
    used_leaves INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES users(id)
);
-- ALL DATA IN THIS TABLES
select *from employee_bank_accounts;