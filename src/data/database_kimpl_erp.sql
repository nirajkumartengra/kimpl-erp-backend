-- ==================================================================
-- KARTIK INDIA MANPOWER PRIVATE LIMITED (KIMPL) - CLEAN ERP DATABASE
-- Hostinger MySQL / phpMyAdmin Compatible SQL Dump (Clean Zero State)
-- All Users Login Intact | Operational Tables Clean & Ready
-- Generated Date: 2026-11-04T14:11:30.108Z
-- ==================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'ACTIVE',
  `loginType` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `department`, `title`, `status`, `loginType`) VALUES
('u1', 'Alok Kumar', 'md@kartikindiamanpower.com', '123', 'OWNER', 'Management', 'Managing Director & Owner', 'ACTIVE', 'owner'),
('u2', 'Rahul Kumar', 'gm@kartikindiamanpower.com', '123', 'MANAGER', 'Operations', 'General Manager', 'ACTIVE', 'department'),
('u3', 'Pooja Sharma', 'hr@kartikindiamanpower.com', '123', 'DEPT_MANAGER', 'HR', 'HR & Recruitment Manager', 'ACTIVE', 'department'),
('u4', 'Arpita Sinha', 'accounts@kartikindiamanpower.com', '123', 'DEPT_MANAGER', 'Accounts', 'Chief Accounts Officer', 'ACTIVE', 'department'),
('u5', 'Vikas Verma', 'tender@kartikindiamanpower.com', '123', 'DEPT_MANAGER', 'Tender', 'Tender & Bidding Lead', 'ACTIVE', 'department'),
('u6', 'Manoj Tiwary', 'compliance@kartikindiamanpower.com', '123', 'DEPT_MANAGER', 'Compliance', 'Legal & PSARA Compliance Head', 'ACTIVE', 'department'),
('u7', 'Sanjay Mishra', 'deo@kartikindiamanpower.com', '123', 'EMPLOYEE', 'Operations', 'Senior DEO Operator', 'ACTIVE', 'employee'),
('u8', 'Ramesh Singh', 'supervisor@kartikindiamanpower.com', '123', 'EMPLOYEE', 'HR', 'Site Guard Supervisor', 'ACTIVE', 'employee'),
('u9', 'Ankit Roy', 'ankit.roy@kartikindiamanpower.com', '123', 'EMPLOYEE', 'Accounts', 'Junior Billing Assistant', 'ACTIVE', 'employee');

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `department` varchar(150) DEFAULT NULL,
  `tenderNo` varchar(100) DEFAULT NULL,
  `deptHead` varchar(150) DEFAULT NULL,
  `portal` varchar(100) DEFAULT 'Eproc 2',
  `location` varchar(150) DEFAULT NULL,
  `tenure` varchar(50) DEFAULT NULL,
  `budget` decimal(15,2) DEFAULT 0,
  `spent` decimal(15,2) DEFAULT 0,
  `status` varchar(50) DEFAULT 'Running',
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `tenders`;
CREATE TABLE `tenders` (
  `id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `client` varchar(255) DEFAULT NULL,
  `tenderNo` varchar(100) DEFAULT NULL,
  `type` varchar(50) DEFAULT 'Govt. Sector',
  `contractValue` decimal(15,2) DEFAULT 0,
  `monthlyValue` decimal(15,2) DEFAULT 0,
  `totalStaff` int DEFAULT 0,
  `status` varchar(50) DEFAULT 'Active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees` (
  `id` varchar(50) NOT NULL,
  `empCode` varchar(50) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `category` varchar(50) DEFAULT 'Site Employees',
  `site` varchar(150) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Active',
  `uan` varchar(50) DEFAULT NULL,
  `esicNo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `invoices`;
CREATE TABLE `invoices` (
  `id` varchar(50) NOT NULL,
  `billNo` varchar(100) NOT NULL,
  `client` varchar(255) NOT NULL,
  `date` date DEFAULT NULL,
  `billed` decimal(15,2) DEFAULT 0,
  `paid` decimal(15,2) DEFAULT 0,
  `status` varchar(50) DEFAULT 'Paid',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
