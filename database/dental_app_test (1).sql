-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jan 11, 2025 at 06:03 PM
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
-- Database: `dental_app_test`
--

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
  `appointment_date` date NOT NULL,
  `status` enum('pending','confirmed','canceled') DEFAULT 'pending',
  `service_list_id` int UNSIGNED DEFAULT NULL,
  `appointment_type` enum('online','walk_in') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `patient_id`, `dentist_id`, `health_declaration_id`, `schedule_id`, `timeslot_id`, `date_submitted`, `appointment_date`, `status`, `service_list_id`, `appointment_type`, `created_at`, `updated_at`) VALUES
(1, 6, 10, 1, 2, 1, '2025-01-11 16:42:48', '2025-01-20', 'confirmed', 1, 'walk_in', '2025-01-11 16:42:48', '2025-01-11 16:46:17');

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
(1, 6, 'Dr. Sarah White', '2024-06-01', '2025-01-11 16:58:23', '2025-01-11 16:58:23'),
(2, 7, 'Dr. James Black', '2024-05-15', '2025-01-11 16:58:23', '2025-01-11 16:58:23'),
(3, 8, 'Dr. Emily Johnson', '2024-07-20', '2025-01-11 16:58:23', '2025-01-11 16:58:23'),
(4, 9, 'Dr. Robert Brown', '2024-08-10', '2025-01-11 16:58:23', '2025-01-11 16:58:23');

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
(10, NULL, NULL),
(11, NULL, NULL),
(12, NULL, NULL),
(13, NULL, NULL);

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
(1, 6, 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', '2025-01-11 16:38:35', '2025-01-11 16:38:35'),
(2, 7, 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', '2025-01-11 16:38:35', '2025-01-11 16:38:35'),
(3, 8, 'no', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', '2025-01-11 16:38:35', '2025-01-11 16:38:35'),
(4, 9, 'no', 'no', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', '2025-01-11 16:38:35', '2025-01-11 16:38:35');

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
(1, 6, 'No known allergies', 'No surgeries', 'No medication', 'No', 'No', 'No', 'No', 'No', 'No', 'No', '2025-01-11 16:58:39', '2025-01-11 16:58:39'),
(2, 7, 'Allergic to penicillin', 'Appendectomy in 2010', 'Taking vitamin supplements', 'No', 'No', 'No', 'No', 'No', 'No', 'No', '2025-01-11 16:58:39', '2025-01-11 16:58:39'),
(3, 8, 'No allergies', 'Knee surgery in 2015', 'Blood pressure medication', 'No', 'No', 'No', 'No', 'No', 'No', 'No', '2025-01-11 16:58:39', '2025-01-11 16:58:39'),
(4, 9, 'Asthmatic', 'No surgeries', 'Using an inhaler', 'No', 'No', 'No', 'No', 'No', 'No', 'No', '2025-01-11 16:58:39', '2025-01-11 16:58:39');

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
(6),
(7),
(8),
(9);

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
(1, 6, 10, '2025-01-15', 'Ibuprofen 400mg', 'Take 1 tablet every 6 hours after meals for 3 days to manage pain.', '2025-01-11 16:52:01', '2025-01-11 16:52:01'),
(2, 6, 10, '2025-01-16', 'Amoxicillin 500mg', 'Take 1 capsule every 8 hours for 7 days to prevent infection post-root canal.', '2025-01-11 16:52:01', '2025-01-11 16:52:01'),
(3, 6, 10, '2025-01-17', 'Chlorhexidine Mouthwash', 'Rinse twice daily for 7 days after scaling to maintain oral hygiene.', '2025-01-11 16:52:01', '2025-01-11 16:52:01');

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
(2, 10, '2025-01-15', '09:00:00', '17:00:00', '2025-01-11 16:32:13', '2025-01-11 16:32:13');

--
-- Triggers `schedules`
--
DELIMITER $$
CREATE TRIGGER `AfterScheduleInsert` AFTER INSERT ON `schedules` FOR EACH ROW BEGIN
    -- Initialize session variables for current time and interval
    SET @current_time = NEW.start_time;
    SET @interval_minutes = 60; -- 1-hour interval

    -- Loop to generate timeslots
    WHILE @current_time < NEW.end_time DO
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
    END WHILE;
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
(1, 2, '09:00:00', '10:00:00', '2025-01-11 16:32:13', '2025-01-11 16:32:13'),
(2, 2, '10:00:00', '11:00:00', '2025-01-11 16:32:13', '2025-01-11 16:32:13'),
(3, 2, '11:00:00', '12:00:00', '2025-01-11 16:32:13', '2025-01-11 16:32:13'),
(4, 2, '12:00:00', '13:00:00', '2025-01-11 16:32:13', '2025-01-11 16:32:13'),
(5, 2, '13:00:00', '14:00:00', '2025-01-11 16:32:13', '2025-01-11 16:32:13'),
(6, 2, '14:00:00', '15:00:00', '2025-01-11 16:32:13', '2025-01-11 16:32:13'),
(7, 2, '15:00:00', '16:00:00', '2025-01-11 16:32:13', '2025-01-11 16:32:13'),
(8, 2, '16:00:00', '17:00:00', '2025-01-11 16:32:13', '2025-01-11 16:32:13');

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

--
-- Dumping data for table `treatments`
--

INSERT INTO `treatments` (`id`, `patient_id`, `dentist_id`, `date_visit`, `teeth`, `treatment`, `description`, `fees`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 6, 10, '2025-01-15', '11,12,13', 'Filling', 'Composite filling for cavities on teeth 11, 12, and 13.', 150.00, 'Follow-up in 6 months', '2025-01-11 16:50:14', '2025-01-11 16:50:14');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('patient','dentist','admin','staff') NOT NULL DEFAULT 'patient',
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
(1, 'admin@example.com', '$2y$10$hashedpassword', 'admin', 'active', 'System Administrator', NULL, '1990-01-01', '123 Admin Street', 'male', '123-456-7890', '2025-01-11 16:17:50', '2025-01-11 16:17:50', NULL, 0),
(6, 'patient1@example.com', '$2y$10$hashedpassword1', 'patient', 'active', 'John Doe', 'patient1.jpg', '1990-01-01', '123 Pine Street', 'male', '123-456-7890', '2025-01-11 16:22:40', '2025-01-11 16:22:40', NULL, 0),
(7, 'patient2@example.com', '$2y$10$hashedpassword2', 'patient', 'active', 'Jane Smith', 'patient2.jpg', '1985-05-20', '456 Oak Avenue', 'female', '987-654-3210', '2025-01-11 16:22:40', '2025-01-11 16:22:40', NULL, 0),
(8, 'patient3@example.com', '$2y$10$hashedpassword3', 'patient', 'active', 'Michael Brown', 'patient3.jpg', '2000-03-15', '789 Maple Drive', 'male', '654-321-1234', '2025-01-11 16:22:40', '2025-01-11 16:22:40', NULL, 0),
(9, 'patient4@example.com', '$2y$10$hashedpassword4', 'patient', 'active', 'Emily Johnson', 'patient4.jpg', '1995-10-30', '321 Elm Street', 'female', '456-789-0123', '2025-01-11 16:22:40', '2025-01-11 16:22:40', NULL, 0),
(10, 'dentist1@example.com', '$2y$10$hashedpassword1', 'dentist', 'active', 'Dr. Emily Johnson', 'dentist1.jpg', '1980-01-15', '123 Elm Street', 'female', '123-456-7890', '2025-01-11 16:29:46', '2025-01-11 16:29:46', NULL, 0),
(11, 'dentist2@example.com', '$2y$10$hashedpassword2', 'dentist', 'active', 'Dr. Robert Brown', 'dentist2.jpg', '1985-03-22', '456 Oak Avenue', 'male', '987-654-3210', '2025-01-11 16:29:46', '2025-01-11 16:29:46', NULL, 0),
(12, 'dentist3@example.com', '$2y$10$hashedpassword3', 'dentist', 'active', 'Dr. Sarah White', 'dentist3.jpg', '1978-06-10', '789 Maple Drive', 'female', '456-789-1234', '2025-01-11 16:29:46', '2025-01-11 16:29:46', NULL, 0),
(13, 'dentist4@example.com', '$2y$10$hashedpassword4', 'dentist', 'active', 'Dr. James Black', 'dentist4.jpg', '1982-11-05', '321 Pine Avenue', 'male', '654-321-9870', '2025-01-11 16:29:46', '2025-01-11 16:29:46', NULL, 0);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `dentist_id` (`dentist_id`);

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
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `calendars`
--
ALTER TABLE `calendars`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dental_histories`
--
ALTER TABLE `dental_histories`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `health_declarations`
--
ALTER TABLE `health_declarations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `medical_histories`
--
ALTER TABLE `medical_histories`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `prescriptions`
--
ALTER TABLE `prescriptions`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `serviceslist`
--
ALTER TABLE `serviceslist`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `timeslots`
--
ALTER TABLE `timeslots`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `treatments`
--
ALTER TABLE `treatments`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
-- Constraints for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD CONSTRAINT `prescriptions_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `prescriptions_ibfk_2` FOREIGN KEY (`dentist_id`) REFERENCES `dentists` (`id`) ON DELETE CASCADE;

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
