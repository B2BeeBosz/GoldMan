-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2021 at 08:10 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `goldman_sample`
--

-- --------------------------------------------------------

--
-- Table structure for table `accountings`
--

CREATE TABLE `accountings` (
  `transactionId` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `date` date DEFAULT NULL,
  `transactionType` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `goldPrice` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `employeeId` int(11) DEFAULT NULL,
  `shopId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `accountings`
--

INSERT INTO `accountings` (`transactionId`, `date`, `transactionType`, `goldPrice`, `employeeId`, `shopId`) VALUES
('20210210130814', '2021-02-10', 'ขายออก', '26,100.00', 1001, 1),
('20210210150934', '2021-02-10', 'ขายออก', '26,100.00', 1201, 1),
('20210210164753', '2021-02-10', 'รับซื้อ', '26,000.00', 1201, 1),
('20210225125626', '2021-02-25', 'ขายออก', '25,600.00', 1001, 1),
('20210226190709', '2021-02-26', 'ขายออก', '25,350.00', 1001, 1),
('20210226190743', '2021-02-26', 'ขายออก', '25,350.00', 1201, 1),
('20210301011152', '2021-03-01', 'ขายออก', '25,100.00', 1001, 1),
('20210304173100', '2021-03-04', 'ขายออก', '24,700.00', 1001, 1),
('20210304173343', '2021-03-04', 'รับซื้อ', '24,600.00', 1001, 1),
('20210309223843', '2021-03-09', 'ขายออก', '24,800.00', 1001, 1),
('20210309231044', '2021-03-09', 'ขายออก', '24,800.00', 1001, 1),
('20210309231520', '2021-03-09', 'ขายออก', '24,800.00', 1201, 1),
('20210311115858', '2021-03-11', 'ขายออก', '25,100.00', 1001, 1),
('20210311120249', '2021-03-11', 'ขายออก', '25,100.00', 1201, 1),
('20210311120337', '2021-03-11', 'ขายออก', '25,100.00', 1201, 1),
('20210314232525', '2021-03-14', 'รับซื้อ', '25,000.00', 1001, 1),
('20210315104252', '2021-03-15', 'ขายออก', '25,150.00', 1001, 1),
('20210315104706', '2021-03-15', 'รับซื้อ', '25,050.00', 1201, 1),
('20210315105027', '2021-03-15', 'รับซื้อ', '25,050.00', 1201, 1),
('20210317174918', '2021-03-17', 'ขายออก', '25,300.00', 1001, 1),
('20210317174946', '2021-03-17', 'รับซื้อ', '25,200.00', 1201, 1),
('20210317202813', '2021-03-17', 'ขายออก', '25,300.00', 1201, 1),
('20210317202918', '2021-03-17', 'ขายออก', '25,300.00', 1201, 1),
('20210317204112', '2021-03-17', 'รับซื้อ', '25,200.00', 1001, 1),
('20210318151219', '2021-03-18', 'ขายออก', '25,400.00', 1201, 1),
('20210318152058', '2021-03-18', 'ขายออก', '25,400.00', 1201, 1),
('20210318152930', '2021-03-18', 'ขายออก', '25,400.00', 1301, 1),
('20210318153730', '2021-03-18', 'ขายออก', '25,400.00', 1001, 1),
('20210320211536', '2021-03-20', 'ขายออก', '25,400.00', 1001, 1),
('20210321030816', '2021-03-21', 'ขายออก', '25,400.00', 1001, 1),
('20210321030951', '2021-03-21', 'รับซื้อ', '25,300.00', 1001, 1),
('20210321032540', '2021-03-21', 'ขายออก', '25,400.00', 1201, 1),
('20210322112552', '2021-03-22', 'ขายออก', '25,450.00', 1001, 1),
('20210322113527', '2021-03-22', 'รับซื้อ', '25,350.00', 1201, 1),
('20210322115245', '2021-03-22', 'ขายออก', '25,450.00', 1201, 1),
('20210322115414', '2021-03-22', 'รับซื้อ', '25,350.00', 1301, 1),
('20210322162512', '2021-03-22', 'ขายออก', '25,350.00', 1301, 1);

-- --------------------------------------------------------

--
-- Table structure for table `accountings_inventories`
--

CREATE TABLE `accountings_inventories` (
  `transactionId` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `productId` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `goldWeightTotal` float DEFAULT NULL,
  `netPrice` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `accountings_inventories`
--

INSERT INTO `accountings_inventories` (`transactionId`, `productId`, `quantity`, `goldWeightTotal`, `netPrice`) VALUES
('20210210130814', 'G96BG41221', 1, 15.16, 26800),
('20210210150934', 'G96ER21301', 1, 7.58, 13750),
('20210210164753', 'G96BG41221', 1, 15.16, 24700),
('20210225125626', 'G96NL21901', 1, 7.58, 14000),
('20210226190709', 'G96ER11501', 1, 3.79, 13875),
('20210226190743', 'G96NL51201', 1, 30.32, 52000),
('20210301011152', 'G96ER21301', 1, 7.58, 13750),
('20210304173100', 'G96BG41221', 1, 15.16, 25900),
('20210304173343', 'G96BG41221', 1, 15.16, 23500),
('20210309223843', 'G96BL51231', 1, 30.32, 50300),
('20210309231044', 'G96BG41221', 1, 15.16, 26000),
('20210309231520', 'G96ER21301', 1, 7.58, 13300),
('20210311115858', 'G96NL51201', 1, 30.32, 51500),
('20210311120249', 'G96ER11501', 1, 3.79, 7275),
('20210311120337', 'G96ER21301', 1, 7.58, 13750),
('20210314232525', '', 0, 0, 22950),
('20210315104252', 'G96NL21901', 1, 7.58, 26400),
('20210315104706', '', 0, 0, 23100),
('20210315105027', '', 0, 0, 10700),
('20210317174918', 'G96NL51201', 1, 30.32, 51800),
('20210317174946', '', 0, 0, 23500),
('20210317202813', 'G96NL21901', 1, 7.58, 13850),
('20210317202918', 'G96BL51231', 1, 30.32, 51500),
('20210317204112', '', 0, 0, 109700),
('20210318151219', 'G96BG41221', 1, 15.16, 2660),
('20210318152058', 'G96ER11501', 1, 3.79, 34000),
('20210318152930', 'G96NL51201', 1, 30.32, 52000),
('20210318153730', 'G96NL21901', 1, 7.58, 12500),
('20210320211536', 'G96BL51231', 1, 30.32, 52000),
('20210321030816', 'G96BG41221', 1, 15.16, 26600),
('20210321030951', '', 0, 0, 24100),
('20210321032540', 'G96ER11501', 1, 3.79, 7050),
('20210322112552', 'G96BL51231', 1, 30.32, 52100),
('20210322113527', '', 0, 0, 12350),
('20210322115245', 'G96BG41221', 1, 15.16, 26650),
('20210322115414', '', 0, 0, 37000),
('20210322162512', 'G96BG41221', 1, 15.16, 26550);

-- --------------------------------------------------------

--
-- Table structure for table `buystocks`
--

CREATE TABLE `buystocks` (
  `stockId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `transactionId` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `productName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `goldWeightTotal` float DEFAULT NULL,
  `categoryId` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `groupId` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bahtId` int(11) DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `shopId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `buystocks`
--

INSERT INTO `buystocks` (`stockId`, `transactionId`, `date`, `productName`, `quantity`, `goldWeightTotal`, `categoryId`, `groupId`, `bahtId`, `customerId`, `shopId`) VALUES
('BS00001', '20210304173343', '2021-03-04', 'ก้านแข็งดาวและหัวใจ 1 บาท', 1, 15.16, 'BG', 'G96', 4, 1, 1),
('BS00002', '20210314232525', '2021-03-14', 'สร้อยคอทอง 96.5% 15 กรัม', 1, 15, NULL, NULL, NULL, 2, 1),
('BS00003', '20210315104706', '2021-03-15', 'กำไลข้อมือ 96.5% 15 กรัม', 1, 15, NULL, NULL, NULL, 3, 1),
('BS00004', '20210221021500', '2021-03-15', 'ก้านแข็งดาวและหัวใจ', 1, 4.02, NULL, NULL, NULL, 1, 1),
('BS00005', '20210317174946', '2021-03-17', 'สร้อยข้อมือ 96.5% 15 กรัม', 1, 15, NULL, NULL, NULL, 1, 1),
('BS00006', '20210317204112', '2021-03-17', 'กรอบพระรูปไข่ 90% 30 กรัม', 1, 30.5, NULL, NULL, NULL, 3, 1),
('BS00007', '20210221021500', '2021-03-18', 'ก้านแข็งดาวและหัวใจ', 1, 4.02, NULL, NULL, NULL, 3, 1),
('BS00008', '20210321030951', '2021-03-21', 'แหวน 96.5% 7 กรัม', 1, 7.61, NULL, NULL, NULL, 2, 1),
('BS00009', '20210322113527', '2021-03-22', 'กรอบพระ 96.5% 8 กรัม', 1, 7.91, NULL, NULL, NULL, 1, 1),
('BS00010', '20210322115414', '2021-03-22', 'กรอบพระรูปไข่ 96.5% 15 กรัม', 1, 15.21, NULL, NULL, NULL, 2, 1),
('BS00011', '20210322115414', '2021-03-22', 'กำไลข้อมือ 96.5% 8 กรัม', 1, 7.6, NULL, NULL, NULL, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customerId` int(11) NOT NULL,
  `customerName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customerId`, `customerName`, `userId`) VALUES
(1, 'โดม โพธิกานนท์', 4),
(2, 'เฮงเฮง ร่ำรวย', 5),
(3, 'มัถยัสถ์ ตระหนี่ถี่เหนียว', 6);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employeeId` int(11) NOT NULL,
  `employeeName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `position` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `shopId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employeeId`, `employeeName`, `position`, `userId`, `shopId`) VALUES
(1001, 'ศุภเดช บริสุทธนารักษ์', 'เจ้าของร้าน', 1, 1),
(1201, 'ชัญญารัตน์ ทองแหยม', 'พนักงานจัดการระบบร้าน', 2, 1),
(2001, 'กฤษฎิ์ อุปนันท์', 'พนักงานขาย', 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `goldprices`
--

CREATE TABLE `goldprices` (
  `goldPriceId` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `date` date DEFAULT NULL,
  `gbSellPrice` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gbBuyPrice` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sellPrice` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `buyPrice` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `goldprices`
--

INSERT INTO `goldprices` (`goldPriceId`, `date`, `gbSellPrice`, `gbBuyPrice`, `sellPrice`, `buyPrice`) VALUES
('202101230919', '2021-01-23', '26,350.00', '26,250.00', '26,850.00', '24,937.50'),
('202101250924', '2021-01-25', '26,350.00', '26,250.00', '26,850.00', '24,937.50'),
('202101251329', '2021-01-25', '26,300.00', '26,200.00', '26,800.00', '24,890.00'),
('202101260928', '2021-01-26', '26,350.00', '26,250.00', '26,850.00', '24,937.50'),
('202101261222', '2021-01-26', '26,350.00', '26,250.00', '26,850.00', '24,937.50'),
('202102011545', '2021-02-01', '26,450.00', '26,350.00', '26,950.00', '25,032.50'),
('202102021012', '2021-02-02', '26,350.00', '26,250.00', '26,850.00', '24,937.50'),
('202102021655', '2021-02-02', '26,300.00', '26,200.00', '26,800.00', '24,890.00'),
('202102040958', '2021-02-04', '25,950.00', '25,850.00', '26,450.00', '24,557.50'),
('202102041633', '2021-02-04', '25,900.00', '25,800.00', '26,400.00', '24,510.00'),
('202102100943', '2021-02-10', '26,100.00', '26,000.00', '26,600.00', '24,700.00'),
('202102101426', '2021-02-10', '26,150.00', '26,050.00', '26,650.00', '24,747.50'),
('202102101512', '2021-02-10', '26,100.00', '26,000.00', '26,600.00', '24,700.00'),
('202102101700', '2021-02-10', '26,050.00', '25,950.00', '26,550.00', '24,652.50'),
('202102110940', '2021-02-11', '26,050.00', '25,950.00', '26,550.00', '24,652.50'),
('202102151408', '2021-02-15', '25,750.00', '25,650.00', '26,250.00', '24,367.50'),
('202102160928', '2021-02-16', '25,800.00', '25,700.00', '26,300.00', '24,415.00'),
('202102171620', '2021-02-17', '25,400.00', '25,300.00', '25,900.00', '24,035.00'),
('202102181016', '2021-02-18', '25,400.00', '25,300.00', '25,900.00', '24,035.00'),
('202102200918', '2021-02-21', '25,350.00', '25,250.00', '25,850.00', '23,987.50'),
('202102241115', '2021-02-24', '25,700.00', '25,600.00', '26,200.00', '24,320.00'),
('202102241444', '2021-02-25', '25,700.00', '25,600.00', '26,200.00', '24,320.00'),
('202102250926', '2021-02-25', '25,600.00', '25,500.00', '26,100.00', '24,225.00'),
('202102251412', '2021-02-25', '25,550.00', '25,450.00', '26,050.00', '24,177.50'),
('202102261643', '2021-02-26', '25,350.00', '25,250.00', '25,850.00', '23,987.50'),
('202102270915', '2021-02-27', '25,100.00', '25,000.00', '25,600.00', '23,750.00'),
('202103011530', '2021-03-01', '25,150.00', '25,050.00', '25,650.00', '23,797.50'),
('202103021445', '2021-03-02', '24,750.00', '24,650.00', '25,250.00', '23,417.50'),
('202103021606', '2021-03-02', '24,800.00', '24,700.00', '25,300.00', '23,465.00'),
('202103030929', '2021-03-03', '24,900.00', '24,800.00', '25,400.00', '23,560.00'),
('202103041300', '2021-03-04', '24,750.00', '24,650.00', '25,250.00', '23,417.50'),
('202103041606', '2021-03-04', '24,650.00', '24,550.00', '25,150.00', '23,322.50'),
('202103041654', '2021-03-04', '24,700.00', '24,600.00', '25,200.00', '23,370.00'),
('202103051503', '2021-03-05', '24,500.00', '24,400.00', '25,000.00', '23,180.00'),
('202103081457', '2021-03-08', '24,750.00', '24,650.00', '25,250.00', '23,417.50'),
('202103091553', '2021-03-09', '24,800.00', '24,700.00', '25,300.00', '23,465.00'),
('202103100927', '2021-03-10', '24,950.00', '24,850.00', '25,450.00', '23,607.50'),
('202103101516', '2021-03-10', '24,950.00', '24,850.00', '25,450.00', '23,607.50'),
('202103110927', '2021-03-11', '25,100.00', '25,000.00', '25,600.00', '23,750.00'),
('202103130922', '2021-03-14', '25,100.00', '25,000.00', '25,600.00', '23,750.00'),
('202103150927', '2021-03-15', '25,150.00', '25,050.00', '25,650.00', '23,797.50'),
('202103151557', '2021-03-15', '25,150.00', '25,050.00', '25,650.00', '23,797.50'),
('202103161404', '2021-03-16', '25,200.00', '25,100.00', '25,700.00', '23,845.00'),
('202103171023', '2021-03-17', '25,300.00', '25,200.00', '25,800.00', '23,940.00'),
('202103171525', '2021-03-17', '25,300.00', '25,200.00', '25,800.00', '23,940.00'),
('202103181432', '2021-03-18', '25,400.00', '25,300.00', '25,900.00', '24,035.00'),
('202103190933', '2021-03-19', '25,350.00', '25,250.00', '25,850.00', '23,987.50'),
('202103191326', '2021-03-19', '25,400.00', '25,300.00', '25,900.00', '24,035.00'),
('202103200922', '2021-03-20', '25,400.00', '25,300.00', '25,900.00', '24,035.00'),
('202103221019', '2021-03-22', '25,450.00', '25,350.00', '25,950.00', '24,082.50'),
('202103221319', '2021-03-22', '25,350.00', '25,250.00', '25,850.00', '23,987.50'),
('202103270923', '2021-03-28', '25,550.00', '25,450.00', '26,050.00', '24,177.50'),
('202104011004', '2021-04-01', '25,350.00', '25,250.00', '25,850.00', '23,987.50'),
('202104011238', '2021-04-01', '25,400.00', '25,300.00', '25,900.00', '24,035.00'),
('202104011419', '2021-04-01', '25,450.00', '25,350.00', '25,950.00', '24,082.50');

-- --------------------------------------------------------

--
-- Table structure for table `interests`
--

CREATE TABLE `interests` (
  `interestId` int(11) NOT NULL,
  `amountDay` float DEFAULT NULL,
  `percentMonth` float DEFAULT NULL,
  `shopId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `interests`
--

INSERT INTO `interests` (`interestId`, `amountDay`, `percentMonth`, `shopId`) VALUES
(1, 20, 2, 1),
(2, 20, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `inventories`
--

CREATE TABLE `inventories` (
  `productId` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'NEWGD99999',
  `styleName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `productName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `quantitySold` int(11) DEFAULT 0,
  `goldWeight` float DEFAULT NULL,
  `goldWeightTotal` float DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `groupId` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `categoryId` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bahtId` int(11) DEFAULT NULL,
  `shopId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `inventories`
--

INSERT INTO `inventories` (`productId`, `styleName`, `productName`, `quantity`, `quantitySold`, `goldWeight`, `goldWeightTotal`, `description`, `image`, `groupId`, `categoryId`, `bahtId`, `shopId`) VALUES
('G96BG41221', 'ก้านแข็งดาวและหัวใจ', 'ก้านแข็งดาวและหัวใจ 1 บาท', 1, 2, 15.16, 15.16, ' ', '/img/productsamples/ก้านแข็งดาวและหัวใจ_สร้อยข้อมือ.jpg', 'G96', 'BG', 4, 1),
('G96BL51231', 'หงษ์มังกร', 'หงษ์มังกร 2 บาท', 2, 0, 30.32, 60.64, ' ', '/img/productsamples/หงษ์มังกร_กำไลข้อมือ.jpg', 'G96', 'BL', 5, 1),
('G96ER11501', 'ดอกลีลาวดี', 'ดอกลีลาวดี 4 กรัม', 1, 0, 3.79, 3.79, '', '/img/productsamples/ดอกลีลาวดี_ต่างหู.jpg', 'G96', 'ER', 1, 1),
('G96ER21301', 'ดอกไม้ในหัวใจ', 'ดอกไม้ในหัวใจ 7 กรัม', 0, 2, 7.58, 0, ' ', '/img/productsamples/ดอกไม้ในหัวใจ_ต่างหู.jpg', 'G96', 'ER', 2, 1),
('G96NL21901', 'โซ่อิตาลี', 'โซ่อิตาลี', 3, 1, 7.58, 22.74, '', '/img/productsamples/โซ่อิตาลี_สร้อยคอ.jpg', 'G96', 'NL', 2, 1),
('G96NL51201', 'มีนาคั่นปล้อง', 'มีนาคั่นปล้อง 2 บาท', 4, 0, 30.32, 121.28, ' ', '/img/productsamples/มีนาคั่นปล้อง_สร้อยคอ.jpg', 'G96', 'NL', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `performancegraphs`
--

CREATE TABLE `performancegraphs` (
  `graphId` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `netPriceSell` float DEFAULT NULL,
  `netPriceBuy` float DEFAULT NULL,
  `shopId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `performancegraphs`
--

INSERT INTO `performancegraphs` (`graphId`, `date`, `month`, `netPriceSell`, `netPriceBuy`, `shopId`) VALUES
(1, '2021-02-10', 2, 40550, 24700, 1),
(2, '2021-02-25', 2, 14000, 0, 1),
(3, '2021-02-26', 2, 65875, 0, 1),
(4, '2021-02-27', 2, 0, 0, 1),
(5, '2021-03-01', 3, 13750, 0, 1),
(6, '2021-03-02', 3, 0, 0, 1),
(7, '2021-03-04', 3, 25900, 23500, 1),
(8, '2021-03-05', 3, 0, 0, 1),
(9, '2021-03-08', 3, 0, 0, 1),
(10, '2021-03-09', 3, 97000, 0, 1),
(11, '2021-03-10', 3, 0, 0, 1),
(12, '2021-03-11', 3, 72525, 0, 1),
(13, '2021-03-14', 3, 0, 22950, 1),
(14, '2021-03-15', 3, 0, 33800, 1),
(15, '2021-03-16', 3, 0, 0, 1),
(16, '2021-03-17', 3, 117150, 133200, 1),
(17, '2021-03-18', 3, 0, 0, 1),
(18, '2021-03-19', 3, 0, 0, 1),
(19, '2021-03-20', 3, 52000, 0, 1),
(20, '2021-03-21', 3, 33650, 24100, 1),
(21, '2021-03-22', 3, 105300, 49350, 1),
(22, '2021-03-28', 3, 0, 0, 1),
(23, '2021-04-01', 4, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `pledginginventories`
--

CREATE TABLE `pledginginventories` (
  `stockId` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `transactionId` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `productName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `goldWeight` float DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `shopId` int(11) DEFAULT NULL,
  `deleteFlag` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `pledginginventories`
--

INSERT INTO `pledginginventories` (`stockId`, `transactionId`, `productName`, `goldWeight`, `quantity`, `customerId`, `shopId`, `deleteFlag`) VALUES
('A000001', '20210221021500', 'ก้านแข็งดาวและหัวใจ', 4.02, 1, 1, 1, 0),
('A000002', '20210302152410', 'มีนาคั่นปล้อง', 30.15, 1, 2, 1, 0),
('A000003', '20210320202746', 'สร้อยข้อมือ 96.5% 15 กรัม', 15.12, 1, 3, 1, 0),
('A000004', '20210320202746', 'กำไลข้อมือ 96.5% 30 กรัม', 30.27, 1, 3, 1, 0),
('A000005', '20210320204116', 'กรอบพระ 96.5% 7 กรัม', 7.59, 1, 2, 1, 0),
('A000006', '20210320204116', 'ต่างหู 96.5% 4 กรัม', 3.81, 1, 2, 1, 0),
('A000007', '20210322115807', 'สร้อยคอปล้องอ้อย 96.5% 15 กรัม', 15.2, 1, 1, 1, 0),
('A000010', '20210401190633', 'แหวนโปร่ง 96.5% 15 กรัม', 15.12, 1, 3, 1, 0),
('A000011', '20210401190633', 'สร้อยคอ 96.5% 30 กรัม', 30.25, 2, 3, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `pledgings`
--

CREATE TABLE `pledgings` (
  `transactionId` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `interests` float DEFAULT NULL,
  `interestsRate` float DEFAULT NULL,
  `netPrice` float DEFAULT NULL,
  `date` date DEFAULT NULL,
  `nextDueDate` date DEFAULT NULL,
  `dueDate` date DEFAULT NULL,
  `returnDate` date DEFAULT NULL,
  `interestId` int(11) DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `shopId` int(11) DEFAULT NULL,
  `deleteFlag` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `pledgings`
--

INSERT INTO `pledgings` (`transactionId`, `interests`, `interestsRate`, `netPrice`, `date`, `nextDueDate`, `dueDate`, `returnDate`, `interestId`, `customerId`, `shopId`, `deleteFlag`) VALUES
('20210221021500', 350, 2, 23750, '2021-02-21', '2021-05-23', '2021-07-23', NULL, 1, 1, 1, 0),
('20210302152410', 870, 2, 43500, '2021-03-02', '2021-05-01', '2021-07-01', NULL, 1, 2, 1, 0),
('20210320202746', 1480, 2, 74000, '2021-03-20', '2021-05-19', '2021-06-19', NULL, 1, 3, 1, 0),
('20210320204116', 370, 2, 18500, '2021-03-20', '2021-04-19', '2021-05-19', NULL, 2, 2, 1, 0),
('20210322115807', 494, 2, 24700, '2021-03-22', '2021-05-21', '2021-07-21', NULL, 2, 1, 1, 0),
('20210401190633', 1500, 2, 75000, '2021-04-01', '2021-04-30', '2021-06-30', NULL, 2, 3, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `productcategories`
--

CREATE TABLE `productcategories` (
  `categoryId` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `nameThai` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nameEng` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `productcategories`
--

INSERT INTO `productcategories` (`categoryId`, `nameThai`, `nameEng`) VALUES
('AL', 'กรอบพระ', 'Amulet'),
('BG', 'กำไลข้อมือ', 'Bangle'),
('BL', 'สร้อยข้อมือ', 'Bracelet'),
('ER', 'ต่างหู', 'Earrings'),
('GB', 'ทองคำแท่ง', 'Gold Bar'),
('NL', 'สร้อยคอ', 'Necklace'),
('PD', 'จี้', 'Pendant'),
('RG', 'แหวน', 'Ring');

-- --------------------------------------------------------

--
-- Table structure for table `productgroups`
--

CREATE TABLE `productgroups` (
  `groupId` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `productgroups`
--

INSERT INTO `productgroups` (`groupId`, `name`) VALUES
('G96', 'ทองรูปพรรณ 96.5%'),
('G99', 'ทองรูปพรรณ 99.99%'),
('GB96', 'ทองคำแท่ง 96.5%'),
('GB99', 'ทองคำแท่ง 99.99%');

-- --------------------------------------------------------

--
-- Table structure for table `productweights`
--

CREATE TABLE `productweights` (
  `bahtId` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `goldWeight` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `productweights`
--

INSERT INTO `productweights` (`bahtId`, `name`, `goldWeight`) VALUES
('1', '1 สลึง', 3.79),
('2', '2 สลึง', 7.58),
('3', '3 สลึง', 11.37),
('4', '1 บาท', 15.16),
('5', '2 บาท', 30.32),
('6', '3 บาท', 45.48),
('7', '4 บาท', 60.64),
('8', '5 บาท', 75.8);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `nameThai` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nameEng` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `nameThai`, `nameEng`) VALUES
(1, 'ผู้ดูแลระบบ', 'Admin'),
(2, 'เจ้าของร้าน', 'Shop Owner'),
(3, 'พนักงานจัดการระบบร้าน', 'Shop Admin'),
(4, 'พนักงานขาย', 'Sales Employee'),
(5, 'ลูกค้า', 'Customer');

-- --------------------------------------------------------

--
-- Table structure for table `shops`
--

CREATE TABLE `shops` (
  `shopId` int(11) NOT NULL,
  `shopName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `addressLine` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `subDistrict` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `district` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `province` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `postalCode` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telephone` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `about` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longtitude` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `shops`
--

INSERT INTO `shops` (`shopId`, `shopName`, `addressLine`, `subDistrict`, `district`, `province`, `country`, `postalCode`, `telephone`, `about`, `image`, `latitude`, `longtitude`) VALUES
(1, 'ห้างทองซีพีอี จำกัด', 'ตึก 30 ปี คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่', 'สุเทพ', 'เมืองเชียงใหม่', 'เชียงใหม่', 'ไทย', '50200', '053222222', 'ห้างทองซีพีอี เป็นร้านทองประเภทธุรกิจค้าปลีก จำหน่ายทองคำแท่ง และทองรูปพรรณ ทั้ง 99.99% และ 96.5%\r\n\r\nวันเปิดทำการ: วันจันทร์ - วันศุภร์ เวลา 08.30-16.30น. \r\n\r\nเพจของร้าน: -- Facebook Page link here --', '/img/shops/ห้างทองย่งไท้ฮวด.jpg', 18.791058830619743, 99.00059801381124),
(2, 'ห้างทองซัมซานเทค', '39/4 ถ.ศิริมังคลาจารย์', 'สุเทพ', 'เมืองเชียงใหม่', 'เชียงใหม่', 'ไทย', '50200', '053433333', 'ห้างทองอังอังอัง โดราเอมอน เป็นร้านค้าปลีก ทองรูปพรรณ 96.5% และ 99.99%\r\n\r\nวันทำการ: วันจันทร์ - วันศุกร์\r\nเวลา 09.00 - 16.30 น.\r\n\r\nเพจของร้าน\r\nFacebook: -- Facebook Page link here --', NULL, 18.79463611772687, 98.97078191302978);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `firstNameThai` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastNameThai` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `firstNameEng` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastNameEng` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `citizenId` varchar(13) COLLATE utf8_unicode_ci DEFAULT NULL,
  `addressLine` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `subDistrict` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `district` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `province` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `postalCode` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phoneNum` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `username`, `password`, `firstNameThai`, `lastNameThai`, `firstNameEng`, `lastNameEng`, `gender`, `citizenId`, `addressLine`, `subDistrict`, `district`, `province`, `country`, `postalCode`, `phoneNum`, `email`, `image`, `roleId`) VALUES
(1, 'User1', 'User1', 'ศุภเดช', 'บริสุทธนารักษ์', 'Supadet', 'Borisutthanarak', 'ชาย', '1234567890123', '234/68', 'หนองหอย', 'เมืองเชียงใหม่', 'เชียงใหม่', 'ไทย', '50000', '0882111111', 'boss.supadet@gmail.com', '/img/users/Boss2.jpg', 2),
(2, 'User2', 'User2', 'ชัญญารัตน์', 'ทองแหยม', 'Chunyarat', 'Thongyaem', 'หญิง', '1509912345678', '123/45', 'สุเทพ', 'เมืองเชียงใหม่', 'เชียงใหม่', 'ไทย', '50200', '0555555555', 'plaifa.chunyarat@gmail.com', '/img/users/Plaifa.jpg', 4),
(3, 'User3', 'User3', 'วิญญูชน', 'คนดียิ่ง', 'Winyouchon', 'Kondeeying', 'ชาย', '1509934567890', '345/67', 'สุเทพ', 'เมืองเชียงใหม่', 'เชียงใหม่', 'ไทย', '50200', '0666666666', 'win.winyou@gmail.com', '/img/users/mike.jpg', 2),
(4, 'User4', 'User4', 'โดม', 'โพธิกานนท์', 'Dome', 'Potikanond', 'ชาย', '3509912345678', '125/13', 'สุเทพ', 'เมืองเชียงใหม่', 'เชียงใหม่', 'ไทย', '50200', '0811111111', 'dome.potikanond@gmail.com', '/img/users/Dome.jpg', 5),
(5, 'User5', 'User5', 'เฮงเฮง', 'ร่ำรวย', 'Hengheng', 'Rumruay', 'ชาย', '1901267890159', '91/2', 'สุเทพ', 'เมื่องเชียงใหม่', 'เชียงใหม่', 'ไทย', '50200', '0125555555', 'heng.hengheng@gmail.com', '/img/users/james.jpg', 5),
(6, 'User6', 'User6', 'มัถยัสถ์', 'ตระหนี่ถี่เหนียว', 'Mutthayat', 'Traneeteeniao', 'ชาย', '1943210555555', '41/2', 'สุเทพ', 'เมืองเชียงใหม่', 'เชียงใหม่', 'ไทย', '50200', '0772222222', 'yat.mutthayat@gmail.com', '/img/users/robi.jpg', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accountings`
--
ALTER TABLE `accountings`
  ADD PRIMARY KEY (`transactionId`),
  ADD KEY `employeeId` (`employeeId`),
  ADD KEY `shopId` (`shopId`);

--
-- Indexes for table `accountings_inventories`
--
ALTER TABLE `accountings_inventories`
  ADD PRIMARY KEY (`transactionId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `buystocks`
--
ALTER TABLE `buystocks`
  ADD PRIMARY KEY (`stockId`),
  ADD KEY `shopId` (`shopId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `bahtId` (`bahtId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `groupId` (`groupId`),
  ADD KEY `transactionId` (`transactionId`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employeeId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `shopId` (`shopId`);

--
-- Indexes for table `goldprices`
--
ALTER TABLE `goldprices`
  ADD PRIMARY KEY (`goldPriceId`);

--
-- Indexes for table `interests`
--
ALTER TABLE `interests`
  ADD PRIMARY KEY (`interestId`),
  ADD KEY `shopId` (`shopId`);

--
-- Indexes for table `inventories`
--
ALTER TABLE `inventories`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `shopId` (`shopId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `groupId` (`groupId`),
  ADD KEY `bahtId` (`bahtId`);

--
-- Indexes for table `performancegraphs`
--
ALTER TABLE `performancegraphs`
  ADD PRIMARY KEY (`graphId`),
  ADD KEY `shopId` (`shopId`),
  ADD KEY `date` (`date`);

--
-- Indexes for table `pledginginventories`
--
ALTER TABLE `pledginginventories`
  ADD PRIMARY KEY (`stockId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `shopId` (`shopId`),
  ADD KEY `transactionId` (`transactionId`);

--
-- Indexes for table `pledgings`
--
ALTER TABLE `pledgings`
  ADD PRIMARY KEY (`transactionId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `interestId` (`interestId`),
  ADD KEY `shopId` (`shopId`);

--
-- Indexes for table `productcategories`
--
ALTER TABLE `productcategories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `productgroups`
--
ALTER TABLE `productgroups`
  ADD PRIMARY KEY (`groupId`);

--
-- Indexes for table `productweights`
--
ALTER TABLE `productweights`
  ADD PRIMARY KEY (`bahtId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`shopId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `citizenId` (`citizenId`),
  ADD KEY `roleId` (`roleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `interests`
--
ALTER TABLE `interests`
  MODIFY `interestId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `performancegraphs`
--
ALTER TABLE `performancegraphs`
  MODIFY `graphId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
