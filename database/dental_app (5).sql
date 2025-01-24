-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jan 24, 2025 at 03:16 PM
-- Server version: 8.0.40
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dental_app`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`%` PROCEDURE `UpdateTimeslotsForSchedule` (IN `schedule_id` INT, IN `new_start_time` TIME, IN `new_end_time` TIME)   BEGIN
  -- Delete existing timeslots for the specific schedule
  DELETE FROM timeslots WHERE schedule_id = `schedule_id`; -- FIX: Correctly reference the parameter

  -- Initialize variables for generating new timeslots
  SET @current_time = new_start_time;
  SET @interval_minutes = 60; -- 1-hour interval
  SET @break_start_time = '12:00:00'; -- Start of the break
  SET @break_end_time = '13:00:00'; -- End of the break

  -- Loop to generate new timeslots
  WHILE @current_time < new_end_time DO
    -- Check if the current time falls within the break period
    IF @current_time >= @break_start_time AND @current_time < @break_end_time THEN
      -- Skip the break period
      SET @current_time = @break_end_time;
    ELSE
      -- Insert the timeslot
      INSERT INTO timeslots (schedule_id, start_time, end_time, created_at, updated_at)
      VALUES (
        schedule_id,
        @current_time,
        ADDTIME(@current_time, SEC_TO_TIME(@interval_minutes * 60)), -- Add 1 hour
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      );

      -- Increment the current time by the interval
      SET @current_time = ADDTIME(@current_time, SEC_TO_TIME(@interval_minutes * 60));
    END IF;
  END WHILE;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int UNSIGNED NOT NULL,
  `patient_id` int UNSIGNED NOT NULL,
  `dentist_id` int UNSIGNED NOT NULL,
  `health_declaration_id` int UNSIGNED DEFAULT NULL,
  `schedule_id` int UNSIGNED NOT NULL,
  `timeslot_id` int UNSIGNED NOT NULL,
  `date_submitted` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','confirmed','canceled') DEFAULT 'pending',
  `appointment_type` enum('online','walk_in') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `patient_id`, `dentist_id`, `health_declaration_id`, `schedule_id`, `timeslot_id`, `date_submitted`, `status`, `appointment_type`, `created_at`, `updated_at`) VALUES
(36, 47, 39, 5, 33, 113, '2025-01-23 09:22:15', 'pending', 'online', '2025-01-23 09:22:15', '2025-01-23 09:22:15'),
(37, 47, 39, 5, 33, 118, '2025-01-23 09:22:29', 'pending', 'online', '2025-01-23 09:22:29', '2025-01-23 09:22:29'),
(38, 47, 39, 5, 33, 114, '2025-01-23 09:23:22', 'canceled', 'online', '2025-01-23 09:23:22', '2025-01-23 10:15:36'),
(39, 47, 39, 5, 33, 114, '2025-01-23 10:19:53', 'canceled', 'online', '2025-01-23 10:19:53', '2025-01-23 10:20:05'),
(40, 47, 39, 5, 33, 114, '2025-01-23 10:23:20', 'canceled', 'online', '2025-01-23 10:23:20', '2025-01-23 10:23:30'),
(41, 47, 39, 5, 33, 114, '2025-01-23 10:28:23', 'canceled', 'online', '2025-01-23 10:28:23', '2025-01-23 10:28:30'),
(42, 47, 39, 5, 33, 114, '2025-01-23 10:32:31', 'canceled', 'online', '2025-01-23 10:32:31', '2025-01-23 10:32:37'),
(43, 47, 39, 5, 33, 114, '2025-01-23 13:39:44', 'canceled', 'online', '2025-01-23 13:39:44', '2025-01-23 13:40:49'),
(44, 47, 39, 5, 33, 114, '2025-01-23 13:41:11', 'canceled', 'online', '2025-01-23 13:41:11', '2025-01-23 13:41:15'),
(45, 47, 39, 5, 33, 115, '2025-01-23 13:41:25', 'canceled', 'online', '2025-01-23 13:41:25', '2025-01-24 03:18:25'),
(46, 47, 39, 5, 33, 115, '2025-01-24 03:18:36', 'canceled', 'online', '2025-01-24 03:18:36', '2025-01-24 03:18:48'),
(47, 47, 39, 5, 33, 117, '2025-01-24 03:19:16', 'canceled', 'online', '2025-01-24 03:19:16', '2025-01-24 03:30:05'),
(48, 47, 39, 5, 33, 114, '2025-01-24 06:28:47', 'pending', 'online', '2025-01-24 06:28:47', '2025-01-24 06:28:47'),
(49, 47, 39, 5, 33, 115, '2025-01-24 06:31:39', 'canceled', 'online', '2025-01-24 06:31:39', '2025-01-24 06:50:31'),
(50, 47, 39, 5, 33, 117, '2025-01-24 08:43:31', 'pending', 'online', '2025-01-24 08:43:31', '2025-01-24 08:43:31'),
(51, 47, 39, 5, 33, 115, '2025-01-24 08:44:49', 'pending', 'online', '2025-01-24 08:44:49', '2025-01-24 08:44:49'),
(52, 47, 39, 5, 33, 116, '2025-01-24 09:35:25', 'canceled', 'online', '2025-01-24 09:35:25', '2025-01-24 09:35:54'),
(53, 47, 39, 5, 33, 116, '2025-01-24 09:38:25', 'canceled', 'online', '2025-01-24 09:38:25', '2025-01-24 09:41:53'),
(54, 47, 39, 5, 33, 116, '2025-01-24 09:43:57', 'canceled', 'online', '2025-01-24 09:43:57', '2025-01-24 10:10:37'),
(55, 47, 39, 5, 33, 112, '2025-01-24 10:24:32', 'canceled', 'online', '2025-01-24 10:24:32', '2025-01-24 10:29:19'),
(56, 47, 39, 5, 33, 112, '2025-01-24 10:29:46', 'pending', 'online', '2025-01-24 10:29:46', '2025-01-24 10:29:46');

--
-- Triggers `appointments`
--
DELIMITER $$
CREATE TRIGGER `after_appointment_insert` AFTER INSERT ON `appointments` FOR EACH ROW BEGIN
    -- Example: Automatically set status to 'pending' for new appointments
    IF NEW.status IS NULL THEN
        UPDATE appointments SET status = 'pending' WHERE id = NEW.id;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_services`
--

CREATE TABLE `appointment_services` (
  `id` int UNSIGNED NOT NULL,
  `appointment_id` int UNSIGNED NOT NULL,
  `service_list_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `appointment_services`
--

INSERT INTO `appointment_services` (`id`, `appointment_id`, `service_list_id`, `created_at`) VALUES
(30, 36, 1, '2025-01-23 09:22:15'),
(31, 37, 1, '2025-01-23 09:22:29'),
(32, 38, 2, '2025-01-23 09:23:22'),
(33, 39, 2, '2025-01-23 10:19:53'),
(34, 40, 1, '2025-01-23 10:23:20'),
(35, 41, 1, '2025-01-23 10:28:23'),
(36, 42, 1, '2025-01-23 10:32:31'),
(37, 43, 1, '2025-01-23 13:39:44'),
(38, 44, 1, '2025-01-23 13:41:11'),
(39, 45, 1, '2025-01-23 13:41:25'),
(40, 46, 1, '2025-01-24 03:18:36'),
(41, 47, 1, '2025-01-24 03:19:16'),
(42, 48, 9, '2025-01-24 06:28:47'),
(43, 49, 1, '2025-01-24 06:31:39'),
(44, 49, 2, '2025-01-24 06:31:39'),
(45, 50, 1, '2025-01-24 08:43:31'),
(46, 51, 1, '2025-01-24 08:44:49'),
(47, 52, 5, '2025-01-24 09:35:25'),
(48, 53, 9, '2025-01-24 09:38:25'),
(49, 54, 2, '2025-01-24 09:43:57'),
(50, 55, 2, '2025-01-24 10:24:32'),
(51, 56, 1, '2025-01-24 10:29:46');

-- --------------------------------------------------------

--
-- Table structure for table `calendars`
--

CREATE TABLE `calendars` (
  `id` int UNSIGNED NOT NULL,
  `appointment_id` int UNSIGNED NOT NULL,
  `status` enum('pending','confirmed','canceled') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dental_histories`
--

CREATE TABLE `dental_histories` (
  `id` int UNSIGNED NOT NULL,
  `patient_id` int UNSIGNED NOT NULL,
  `previous_dentist` varchar(255) DEFAULT NULL,
  `last_dentist_visit` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dental_histories`
--

INSERT INTO `dental_histories` (`id`, `patient_id`, `previous_dentist`, `last_dentist_visit`, `created_at`, `updated_at`) VALUES
(5, 31, 'Draa. Jane Doe', '2025-01-01', '2025-01-14 03:42:45', '2025-01-14 03:44:08');

-- --------------------------------------------------------

--
-- Table structure for table `dentists`
--

CREATE TABLE `dentists` (
  `id` int UNSIGNED NOT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `specialty` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dentists`
--

INSERT INTO `dentists` (`id`, `degree`, `specialty`) VALUES
(39, 'DDS', 'Orthodontics');

-- --------------------------------------------------------

--
-- Table structure for table `health_declarations`
--

CREATE TABLE `health_declarations` (
  `id` int UNSIGNED NOT NULL,
  `patient_id` int UNSIGNED NOT NULL,
  `question1` enum('yes','no') DEFAULT NULL,
  `question2` enum('yes','no') DEFAULT NULL,
  `question3` enum('yes','no') DEFAULT NULL,
  `question4` enum('yes','no') DEFAULT NULL,
  `question5` enum('yes','no') DEFAULT NULL,
  `question6` enum('yes','no') DEFAULT NULL,
  `question7` enum('yes','no') DEFAULT NULL,
  `question8` enum('yes','no') DEFAULT NULL,
  `question9` enum('yes','no') DEFAULT NULL,
  `question10` enum('yes','no') DEFAULT NULL,
  `question11` enum('yes','no') DEFAULT NULL,
  `question12` enum('yes','no') DEFAULT NULL,
  `question13` enum('yes','no') DEFAULT NULL,
  `question14` enum('yes','no') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `health_declarations`
--

INSERT INTO `health_declarations` (`id`, `patient_id`, `question1`, `question2`, `question3`, `question4`, `question5`, `question6`, `question7`, `question8`, `question9`, `question10`, `question11`, `question12`, `question13`, `question14`, `created_at`, `updated_at`) VALUES
(5, 47, 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', '2025-01-14 03:15:56', '2025-01-23 09:17:37'),
(6, 31, 'yes', 'no', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', '2025-01-22 09:35:14', '2025-01-23 08:12:56');

-- --------------------------------------------------------

--
-- Table structure for table `medical_histories`
--

CREATE TABLE `medical_histories` (
  `id` int UNSIGNED NOT NULL,
  `patient_id` int UNSIGNED NOT NULL,
  `question1` text,
  `question2` text,
  `question3` text,
  `question4` text,
  `question5` text,
  `question6` text,
  `question7` text,
  `question8` text,
  `question9` text,
  `question10` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `medical_histories`
--

INSERT INTO `medical_histories` (`id`, `patient_id`, `question1`, `question2`, `question3`, `question4`, `question5`, `question6`, `question7`, `question8`, `question9`, `question10`, `created_at`, `updated_at`) VALUES
(5, 31, 'No', 'No', 'Yes', 'No', 'Yes', 'No', 'Yes', 'No', 'Yes', 'No', '2025-01-14 03:00:23', '2025-01-14 03:03:25');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`) VALUES
(31),
(47),
(48),
(50);

-- --------------------------------------------------------

--
-- Table structure for table `prescriptions`
--

CREATE TABLE `prescriptions` (
  `id` int UNSIGNED NOT NULL,
  `patient_id` int UNSIGNED NOT NULL,
  `dentist_id` int UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `medicine` text,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `prescriptions`
--

INSERT INTO `prescriptions` (`id`, `patient_id`, `dentist_id`, `date`, `medicine`, `notes`, `created_at`, `updated_at`) VALUES
(1, 31, 39, '2025-01-14', 'Amoxicillin 500mg, Paracetamol 650mg', 'Take medications after meals.', '2025-01-14 04:17:39', '2025-01-14 04:17:39'),
(2, 31, 39, '2025-01-14', 'Mefenamic 500mg, Paracetamol 650mg', 'Take medications after meals.', '2025-01-14 04:18:14', '2025-01-14 04:18:43');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` int UNSIGNED NOT NULL,
  `dentist_id` int UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `dentist_id`, `date`, `start_time`, `end_time`, `created_at`, `updated_at`) VALUES
(33, 39, '2025-02-01', '09:00:00', '17:00:00', '2025-01-23 09:15:44', '2025-01-23 09:15:44');

--
-- Triggers `schedules`
--
DELIMITER $$
CREATE TRIGGER `AfterScheduleUpdate` AFTER UPDATE ON `schedules` FOR EACH ROW BEGIN
  -- Check if start_time or end_time is updated
  IF NEW.start_time <> OLD.start_time OR NEW.end_time <> OLD.end_time THEN
    CALL UpdateTimeslotsForSchedule(NEW.id, NEW.start_time, NEW.end_time);
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `serviceslist`
--

CREATE TABLE `serviceslist` (
  `id` int UNSIGNED NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `serviceslist`
--

INSERT INTO `serviceslist` (`id`, `service_name`, `title`, `content`, `photo`, `created_at`, `updated_at`) VALUES
(1, 'Teeth Cleaning', 'Basic Cleaning', 'Professional cleaning to remove plaque and tartar.', 'cleaning.jpg', '2025-01-11 16:23:05', '2025-01-11 16:23:05'),
(2, 'Root Canal', 'Endodontic Therapy', 'Treatment for infected or damaged tooth pulp.', 'root_canal.jpg', '2025-01-11 16:23:05', '2025-01-11 16:23:05'),
(3, 'Dental Filling', 'Cavity Repair', 'Restore decayed teeth with durable fillings.', 'filling.jpg', '2025-01-11 16:23:05', '2025-01-11 16:23:05'),
(4, 'Tooth Extraction', 'Removal Service', 'Safe and gentle removal of damaged or wisdom teeth.', 'extraction.jpg', '2025-01-11 16:23:05', '2025-01-11 16:23:05'),
(5, 'Braces', 'Orthodontic Treatment', 'Align and straighten teeth with braces.', 'braces.jpg', '2025-01-11 16:23:05', '2025-01-11 16:23:05'),
(6, 'Teeth Whitening', 'Cosmetic Dentistry', 'Brighten your smile with professional whitening.', 'whitening.jpg', '2025-01-11 16:23:05', '2025-01-11 16:23:05'),
(9, 'dsdsdsdCheckup', 'Comprehensive Dental Checkup', 'A thorough examination of your dental health.', 'http://example.com/photo.jpg', '2025-01-24 06:28:24', '2025-01-24 06:28:24');

-- --------------------------------------------------------

--
-- Table structure for table `timeslots`
--

CREATE TABLE `timeslots` (
  `id` int UNSIGNED NOT NULL,
  `schedule_id` int UNSIGNED NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `timeslots`
--

INSERT INTO `timeslots` (`id`, `schedule_id`, `start_time`, `end_time`, `created_at`, `updated_at`) VALUES
(112, 33, '09:00:00', '10:00:00', '2025-01-23 09:15:44', '2025-01-23 09:15:44'),
(113, 33, '10:00:00', '11:00:00', '2025-01-23 09:15:44', '2025-01-23 09:15:44'),
(114, 33, '11:00:00', '12:00:00', '2025-01-23 09:15:44', '2025-01-23 09:15:44'),
(115, 33, '13:00:00', '14:00:00', '2025-01-23 09:15:44', '2025-01-23 09:15:44'),
(116, 33, '14:00:00', '15:00:00', '2025-01-23 09:15:44', '2025-01-23 09:15:44'),
(117, 33, '15:00:00', '16:00:00', '2025-01-23 09:15:44', '2025-01-23 09:15:44'),
(118, 33, '16:00:00', '17:00:00', '2025-01-23 09:15:44', '2025-01-23 09:15:44');

-- --------------------------------------------------------

--
-- Table structure for table `treatments`
--

CREATE TABLE `treatments` (
  `id` int UNSIGNED NOT NULL,
  `patient_id` int UNSIGNED NOT NULL,
  `dentist_id` int UNSIGNED NOT NULL,
  `date_visit` date NOT NULL,
  `teeth` varchar(255) DEFAULT NULL,
  `treatment` text,
  `description` text,
  `fees` decimal(10,2) DEFAULT NULL,
  `remarks` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('patient','dentist','admin','staff','super_admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'patient',
  `status` enum('active','inactive','pending') DEFAULT 'pending',
  `fullname` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `address` text,
  `gender` enum('male','female','other') DEFAULT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `refresh_token` text,
  `email_verified` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `status`, `fullname`, `photo`, `birthday`, `address`, `gender`, `contact_number`, `created_at`, `updated_at`, `refresh_token`, `email_verified`) VALUES
(31, 'super_admin', '$2b$10$MgpVE3surwZIBgqlHahkBOVz/EfU2/4XnPdyzTvyjXUanSjMpr48G', 'super_admin', 'active', 'John Doe', 'profile.jpg', '1990-01-01', '123 Main Street', 'male', '123456789', '2025-01-13 14:55:04', '2025-01-14 08:27:32', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTczNjg0MzI1MiwiZXhwIjoxNzM3NDQ4MDUyfQ.sI-HHN9fLnaZBvI88Uzg5Q7YcrmVz-tPVe5zInwf8do', 1),
(34, 'admin', '$2b$10$p3si/HMAkGHC3J0aqsgh2eTHDmqssyaU4RVLqJPTGLe863iYQUPjy', 'admin', 'active', 'Admin', 'profile.jpg', '1990-01-01', '123 Main Street', 'male', '123456789', '2025-01-13 16:26:15', '2025-01-24 07:18:54', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNzcwMDA2MywiZXhwIjoxNzM4MzA0ODYzfQ.trb_cJ9h1NilYIU7C7yEhGdjRSyVc8AjKa9XM69Qylw', 1),
(39, 'dentist3@example.com', '$2b$10$EHE/n4ESlgFBmSWNBrErQOh3RQjGP5wTFlAwHrnsCBRkwx6JtUrJa', 'dentist', 'active', 'Dr. Neil Smith', 'profile.jpg', '1980-05-15', '123 Main Street', 'male', '123456789', '2025-01-13 17:17:50', '2025-01-21 16:05:21', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksInJvbGUiOiJkZW50aXN0IiwiaWF0IjoxNzM3NDc1NTIxLCJleHAiOjE3MzgwODAzMjF9.pGp9Pj8mIiuTSh8rZWxTEHFgY1VL0sQWB9HGzpPMzuE', 1),
(41, 'dentist4@example.com', '$2b$10$9FQtBl6fJVss/lQmbP4j/eR.we3XCIvGAnNR.a.CTOB87a5kM.nfW', 'dentist', 'active', 'Dr. Jane Smith', 'profile.jpg', '1980-05-15', '123 Main Street', 'female', '123456789', '2025-01-14 06:00:55', '2025-01-24 05:57:12', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsInJvbGUiOiJkZW50aXN0IiwiaWF0IjoxNzM3Njk4MjMyLCJleHAiOjE3MzgzMDMwMzJ9.Oer9XkKbjTyhiwvBPmKop6XZzjDBS9TXmYbgi7BM2Y8', 1),
(42, 'staff@example.com', '$2b$10$KykDCPQB4GSfbCM5ujPwFOwegXqEX8nETYH5fbQ5yhkxOdZvpR9Gy', 'staff', 'active', 'John Doe', 'profile.jpg', '1990-01-01', '123 Main Street', 'male', '123456789', '2025-01-14 08:05:50', '2025-01-14 08:05:50', NULL, 1),
(43, 'staff2@example.com', '$2b$10$umVGa6UkRR.LQ.tVaQh.NerXNiM0vtslmO6ZnH/o4/ByYedSJyb0G', 'staff', 'active', 'John Doe', 'profile.jpg', '1990-01-01', '123 Main Street', 'male', '123456789', '2025-01-14 08:07:55', '2025-01-14 08:07:55', NULL, 1),
(47, 'user@example.com', '$2b$10$EHE/n4ESlgFBmSWNBrErQOh3RQjGP5wTFlAwHrnsCBRkwx6JtUrJa', 'patient', 'pending', 'John Doe', 'profile.jpg', '1990-01-01', '123 Main Street', 'male', '123456789', '2025-01-20 02:30:54', '2025-01-24 10:24:13', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNzM3NzE0MjUzLCJleHAiOjE3MzgzMTkwNTN9.h1fgzRWj2G6c_mv3Po6vP-jchSr6oDqLgeeQxKQQnsg', 1),
(48, 'user5@example.com', '$2b$10$jCQMm4/Kpa5vUNE7ME5SQODEv7XYt52nJLNjq4Oo/bzeVCtFek1qa', 'patient', 'pending', 'Johny Doe', NULL, NULL, NULL, NULL, NULL, '2025-01-21 10:10:26', '2025-01-21 10:10:26', NULL, 0),
(49, 'user99@example.com', '$2b$10$QlM6iANCBShiwCY.GWnHF.QWLof6NUtmCAYOB.pwl1F.tlYUwlYp.', 'patient', 'pending', 'MyDoe', NULL, NULL, NULL, NULL, NULL, '2025-01-23 10:48:41', '2025-01-23 10:48:41', NULL, 0),
(50, 'johndo34e@example.com', '$2b$10$b/njRqbVxdxXijOH1Y2lfe1Qc.Nu1Miri2J5U7kAYIGpUZwemif8y', 'patient', 'pending', 'John Doe', 'https://example.com/photo.jpg', '1990-05-15', '123 Main Street, New York, NY', 'male', '+1-555-555-5555', '2025-01-23 11:00:37', '2025-01-23 11:00:37', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `dentist_id` (`dentist_id`),
  ADD KEY `health_declaration_id` (`health_declaration_id`),
  ADD KEY `schedule_id` (`schedule_id`),
  ADD KEY `timeslot_id` (`timeslot_id`);

--
-- Indexes for table `appointment_services`
--
ALTER TABLE `appointment_services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_id` (`appointment_id`),
  ADD KEY `service_list_id` (`service_list_id`);

--
-- Indexes for table `calendars`
--
ALTER TABLE `calendars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indexes for table `dental_histories`
--
ALTER TABLE `dental_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `dentists`
--
ALTER TABLE `dentists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `health_declarations`
--
ALTER TABLE `health_declarations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `medical_histories`
--
ALTER TABLE `medical_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dentist_id` (`dentist_id`);

--
-- Indexes for table `serviceslist`
--
ALTER TABLE `serviceslist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timeslots`
--
ALTER TABLE `timeslots`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `schedule_id` (`schedule_id`,`start_time`,`end_time`);

--
-- Indexes for table `treatments`
--
ALTER TABLE `treatments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `dentist_id` (`dentist_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `appointment_services`
--
ALTER TABLE `appointment_services`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `calendars`
--
ALTER TABLE `calendars`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dental_histories`
--
ALTER TABLE `dental_histories`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `health_declarations`
--
ALTER TABLE `health_declarations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `medical_histories`
--
ALTER TABLE `medical_histories`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `prescriptions`
--
ALTER TABLE `prescriptions`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `serviceslist`
--
ALTER TABLE `serviceslist`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `timeslots`
--
ALTER TABLE `timeslots`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `treatments`
--
ALTER TABLE `treatments`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`dentist_id`) REFERENCES `dentists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`health_declaration_id`) REFERENCES `health_declarations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_4` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_5` FOREIGN KEY (`timeslot_id`) REFERENCES `timeslots` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `appointment_services`
--
ALTER TABLE `appointment_services`
  ADD CONSTRAINT `appointment_services_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointment_services_ibfk_2` FOREIGN KEY (`service_list_id`) REFERENCES `serviceslist` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `calendars`
--
ALTER TABLE `calendars`
  ADD CONSTRAINT `calendars_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `dental_histories`
--
ALTER TABLE `dental_histories`
  ADD CONSTRAINT `dental_histories_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `dentists`
--
ALTER TABLE `dentists`
  ADD CONSTRAINT `dentists_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `health_declarations`
--
ALTER TABLE `health_declarations`
  ADD CONSTRAINT `health_declarations_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `medical_histories`
--
ALTER TABLE `medical_histories`
  ADD CONSTRAINT `medical_histories_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`dentist_id`) REFERENCES `dentists` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `timeslots`
--
ALTER TABLE `timeslots`
  ADD CONSTRAINT `fk_timeslots_schedule` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `timeslots_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `treatments`
--
ALTER TABLE `treatments`
  ADD CONSTRAINT `treatments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `treatments_ibfk_2` FOREIGN KEY (`dentist_id`) REFERENCES `dentists` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
