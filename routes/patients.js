const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const { verifyToken, verifyRole } = require('../middlewares/auth');

const router = express.Router();

// ✅ Get all patients
router.get('/', verifyToken, async (req, res) => {
  try {
    const sql = `
      SELECT id AS user_id, fullname, address, birthday, gender AS sex, email, contact_number, photo 
      FROM users
      WHERE role = 'patient'
    `;

    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching patients:', err);
        return res.status(500).json({ message: "Internal server error.", data: null });
      }
      res.status(200).json({ message: "Patients retrieved successfully.", data: results });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: "An unexpected error occurred.", data: null });
  }
});

// ✅ Get a specific patient by ID
router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid patient ID.", data: null });
  }

  try {
    const sql = `
      SELECT 
        id AS user_id, 
        fullname, 
        address, 
        birthday, 
        gender AS sex, 
        email, 
        contact_number, 
        photo 
      FROM users 
      WHERE id = ? AND role = 'patient'
    `;

    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error(`Error fetching patient ID ${id}:`, err);
        return res.status(500).json({ message: "Internal server error.", data: null });
      }
      if (!results.length) return res.status(404).json({ message: "Patient not found.", data: null });

      res.status(200).json({ message: "Patient retrieved successfully.", data: results[0] });
    });
  } catch (error) {
    console.error(`Unexpected error fetching patient ID ${id}:`, error);
    res.status(500).json({ message: "An unexpected error occurred.", data: null });
  }
});

// ✅ Update patient details
router.put('/:id', verifyToken, verifyRole('admin', 'patient'), async (req, res) => {
  const { id } = req.params;
  const { fullname, address, birthday, sex, contact_number, photo } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid patient ID.", data: null });
  }

  try {
    const sql = `
      UPDATE users 
      SET fullname = ?, address = ?, birthday = ?, gender = ?, contact_number = ?, photo = ?
      WHERE id = ? AND role = 'patient'
    `;

    db.query(sql, [fullname, address, birthday, sex, contact_number, photo, id], (err, result) => {
      if (err) {
        console.error(`Error updating patient ID ${id}:`, err);
        return res.status(500).json({ message: "Internal server error.", data: null });
      }
      if (result.affectedRows === 0) return res.status(404).json({ message: "Patient not found.", data: null });

      res.status(200).json({ 
        message: "Patient details updated successfully.", 
        data: { id, fullname, address, birthday, sex, contact_number, photo } 
      });
    });
  } catch (error) {
    console.error(`Unexpected error updating patient ID ${id}:`, error);
    res.status(500).json({ message: "An unexpected error occurred.", data: null });
  }
});

// ✅ Reset a patient's password
router.put('/reset-password/:id', verifyToken, verifyRole('admin', 'patient'), async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ message: "Validation failed. Missing required fields.", data: null });
  }

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid patient ID.", data: null });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const sql = `UPDATE users SET password = ? WHERE id = ? AND role = 'patient'`;

    db.query(sql, [hashedPassword, id], (err, results) => {
      if (err) {
        console.error(`Error resetting password for patient ID ${id}:`, err);
        return res.status(500).json({ message: "Error resetting password.", data: null });
      }
      if (results.affectedRows === 0) return res.status(404).json({ message: "Patient not found.", data: null });

      res.status(200).json({ message: "Patient password reset successfully.", data: { id } });
    });
  } catch (error) {
    console.error(`Error hashing password for patient ID ${id}:`, error);
    res.status(500).json({ message: "An unexpected error occurred while resetting the password.", data: null });
  }
});

module.exports = router;
