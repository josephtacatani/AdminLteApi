const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const { verifyToken, verifyRole } = require('../middlewares/auth');

const router = express.Router();

// ✅ Get all patients
router.get('/', verifyToken, (req, res) => {
  const sql = `
    SELECT id, fullname, address, birthday, gender, email, contact_number, photo 
    FROM users
    WHERE role = 'patient'
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err);
      return res.status(500).json({ message: "Internal server error.", error: err.message });
    }
    res.status(200).json({ message: "Patients retrieved successfully.", data: results });
  });
});

// ✅ Get a specific patient by ID
router.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT id, fullname, email, photo 
    FROM users 
    WHERE id = ? AND role = 'patient'
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(`Error fetching patient ID ${id}:`, err);
      return res.status(500).json({ message: "Internal server error.", error: err.message });
    }
    if (!results.length) return res.status(404).json({ message: "Patient not found." });
    res.status(200).json({ message: "Patient retrieved successfully.", data: results[0] });
  });
});

// ✅ Update patient details
router.put('/:id', verifyToken, verifyRole('admin', 'patient'), (req, res) => {
  const { id } = req.params;
  const { fullname, address, birthday, gender, contact_number, photo } = req.body;

  const sql = `
    UPDATE users 
    SET fullname = ?, address = ?, birthday = ?, gender = ?, contact_number = ?, photo = ?
    WHERE id = ? AND role = 'patient'
  `;

  db.query(sql, [fullname, address, birthday, gender, contact_number, photo, id], (err, result) => {
    if (err) {
      console.error(`Error updating patient ID ${id}:`, err);
      return res.status(500).json({ message: "Internal server error.", error: err.message });
    }
    if (result.affectedRows === 0) return res.status(404).json({ message: "Patient not found." });
    res.status(200).json({ message: "Patient details updated successfully." });
  });
});

// ✅ Reset a patient's password
router.put('/reset-password/:id', verifyToken, verifyRole('admin', 'patient'), async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) return res.status(400).json({ message: "Validation failed. Missing required fields." });

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const sql = `UPDATE users SET password = ? WHERE id = ? AND role = 'patient'`;

    db.query(sql, [hashedPassword, id], (err, results) => {
      if (err) {
        console.error(`Error resetting password for patient ID ${id}:`, err);
        return res.status(500).json({ message: "Error resetting password.", error: err.message });
      }
      if (results.affectedRows === 0) return res.status(404).json({ message: "Patient not found." });
      res.status(200).json({ message: "Patient password reset successfully." });
    });
  } catch (error) {
    console.error(`Error hashing password for patient ID ${id}:`, error);
    res.status(500).json({ message: "An error occurred while resetting the password.", error: error.message });
  }
});

module.exports = router;
