-- Create the `dental_app` database
CREATE DATABASE IF NOT EXISTS dental_app;
USE dental_app;

-- Create the `patients` table
CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId VARCHAR(50) UNIQUE NOT NULL,
    photo VARCHAR(255),
    name VARCHAR(100) NOT NULL,
    birthday DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    contact VARCHAR(15) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the `appointments` table
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    doctor VARCHAR(100) NOT NULL,
    status ENUM('Pending', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE
);

-- Create the `prescriptions` table
CREATE TABLE prescriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT NOT NULL,
    date DATE NOT NULL,
    medicine TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE
);

-- Create the `treatments` table
CREATE TABLE treatments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT NOT NULL,
    dateVisit DATE NOT NULL,
    teethNos VARCHAR(50) NOT NULL, -- E.g., "11, 12, 14"
    treatment TEXT NOT NULL,
    description TEXT,
    fees DECIMAL(10, 2) NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE
);

-- Create the `dental_histories` table
CREATE TABLE dental_histories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT NOT NULL,
    previousDentist VARCHAR(100),
    lastDentalVisit DATE,
    action TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE
);

-- Create the `medical_histories` table
CREATE TABLE medical_histories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patientId INT NOT NULL,
    conditions TEXT NOT NULL,
    symptoms TEXT,
    lastVisitDate DATE,
    ongoingTreatment TEXT,
    medicationDetails TEXT,
    allergies TEXT,
    illnesses TEXT,
    action TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE
);

-- Create the `schedules` table
CREATE TABLE schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    dentistId INT NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    duration INT NOT NULL, -- Duration in minutes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
