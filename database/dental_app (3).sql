-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jan 14, 2025 at 08:51 AM
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
  `service_list_id` int UNSIGNED DEFAULT NULL,
  `appointment_type` enum('online','walk_in') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(5, 31, 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', '2025-01-14 03:15:56', '2025-01-14 03:15:56');

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
(31);

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
(23, 39, '2025-01-14', '09:00:00', '16:00:00', '2025-01-14 07:00:49', '2025-01-14 07:00:49');

--
-- Triggers `schedules`
--
DELIMITER $$
CREATE TRIGGER `AfterScheduleInsert` AFTER INSERT ON `schedules` FOR EACH ROW BEGIN
    -- Initialize session variables for current time and interval
    SET @current_time = NEW.start_time;
    SET @interval_minutes = 60; -- 1-hour interval
    SET @break_start_time = '12:00:00'; -- Start of the break
    SET @break_end_time = '13:00:00'; -- End of the break

    -- Loop to generate timeslots
    WHILE @current_time < NEW.end_time DO
        -- Check if the current time falls within the break period
        IF @current_time >= @break_start_time AND @current_time < @break_end_time THEN
            -- Skip the break period
            SET @current_time = @break_end_time;
        ELSE
            -- Insert the timeslot
            INSERT INTO timeslots (schedule_id, start_time, end_time, created_at, updated_at)
            VALUES (
                NEW.id,
                @current_time,
                ADDTIME(@current_time, SEC_TO_TIME(@interval_minutes * 60)), -- Add 1 hour
                CURRENT_TIMESTAMP,
                CURRENT_TIMESTAMP
            );

            -- Increment the current time by the interval
            SET @current_time = ADDTIME(@current_time, SEC_TO_TIME(@interval_minutes * 60));
        END IF;
    END WHILE;
END
$$
DELIMITER ;
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
(6, 'Teeth Whitening', 'Cosmetic Dentistry', 'Brighten your smile with professional whitening.', 'whitening.jpg', '2025-01-11 16:23:05', '2025-01-11 16:23:05');

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
(100, 23, '09:00:00', '10:00:00', '2025-01-14 07:00:49', '2025-01-14 07:00:49'),
(101, 23, '10:00:00', '11:00:00', '2025-01-14 07:00:49', '2025-01-14 07:00:49'),
(102, 23, '11:00:00', '12:00:00', '2025-01-14 07:00:49', '2025-01-14 07:00:49'),
(103, 23, '13:00:00', '14:00:00', '2025-01-14 07:00:49', '2025-01-14 07:00:49'),
(104, 23, '14:00:00', '15:00:00', '2025-01-14 07:00:49', '2025-01-14 07:00:49'),
(105, 23, '15:00:00', '16:00:00', '2025-01-14 07:00:49', '2025-01-14 07:00:49');

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
(34, 'admin', '$2b$10$p3si/HMAkGHC3J0aqsgh2eTHDmqssyaU4RVLqJPTGLe863iYQUPjy', 'admin', 'active', 'Admin', 'profile.jpg', '1990-01-01', '123 Main Street', 'male', '123456789', '2025-01-13 16:26:15', '2025-01-14 08:40:38', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNjg0NDAzOCwiZXhwIjoxNzM3NDQ4ODM4fQ.X9nUMDHq-Y4lXlRTIhrwc2BXtOcY_pXdB_YxcJwXLxQ', 1),
(39, 'dentist3@example.com', '$2b$10$MgpVE3surwZIBgqlHahkBOVz/EfU2/4XnPdyzTvyjXUanSjMpr48G', 'dentist', 'active', 'Dr. Neil Smith', 'profile.jpg', '1980-05-15', '123 Main Street', 'male', '123456789', '2025-01-13 17:17:50', '2025-01-14 07:41:30', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksInJvbGUiOiJkZW50aXN0IiwiaWF0IjoxNzM2ODI4MjM5LCJleHAiOjE3Mzc0MzMwMzl9.gV6c_cSbaTM8P6sg2r-eyU_hgC_jr4-OrybahORqZ9s', 1),
(41, 'dentist4@example.com', '$2b$10$9FQtBl6fJVss/lQmbP4j/eR.we3XCIvGAnNR.a.CTOB87a5kM.nfW', 'dentist', 'active', 'Dr. Jane Smith', 'profile.jpg', '1980-05-15', '123 Main Street', 'female', '123456789', '2025-01-14 06:00:55', '2025-01-14 07:54:09', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsInJvbGUiOiJkZW50aXN0IiwiaWF0IjoxNzM2ODQxMjQ5LCJleHAiOjE3Mzc0NDYwNDl9.mneiqnXQc6yygdeZxIpqhXlObXZvxCOPaMX7_91LUhk', 1),
(42, 'staff@example.com', '$2b$10$KykDCPQB4GSfbCM5ujPwFOwegXqEX8nETYH5fbQ5yhkxOdZvpR9Gy', 'staff', 'active', 'John Doe', 'profile.jpg', '1990-01-01', '123 Main Street', 'male', '123456789', '2025-01-14 08:05:50', '2025-01-14 08:05:50', NULL, 1),
(43, 'staff2@example.com', '$2b$10$umVGa6UkRR.LQ.tVaQh.NerXNiM0vtslmO6ZnH/o4/ByYedSJyb0G', 'staff', 'active', 'John Doe', 'profile.jpg', '1990-01-01', '123 Main Street', 'male', '123456789', '2025-01-14 08:07:55', '2025-01-14 08:07:55', NULL, 1);

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `after_user_insert` AFTER INSERT ON `users` FOR EACH ROW BEGIN
    -- Check if the role is 'patient' and insert into the patients table
    IF NEW.role = 'patient' THEN
        INSERT INTO patients (id) VALUES (NEW.id);
    END IF;

    -- Check if the role is 'dentist' and insert into the dentists table
    IF NEW.role = 'dentist' THEN
        INSERT INTO dentists (id) VALUES (NEW.id);
    END IF;
END
$$
DELIMITER ;

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
  ADD KEY `timeslot_id` (`timeslot_id`),
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
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `serviceslist`
--
ALTER TABLE `serviceslist`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `timeslots`
--
ALTER TABLE `timeslots`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `treatments`
--
ALTER TABLE `treatments`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

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
  ADD CONSTRAINT `appointments_ibfk_5` FOREIGN KEY (`timeslot_id`) REFERENCES `timeslots` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_6` FOREIGN KEY (`service_list_id`) REFERENCES `serviceslist` (`id`) ON DELETE SET NULL;

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
