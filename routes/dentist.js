const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const { verifyToken, verifyRole } = require('../middlewares/auth');

const router = express.Router();

/**
 * ✅ Register a new dentist (Admin only)
 */
router.post('/register', verifyToken, verifyRole('admin'), async (req, res) => {
  const {
    email, password, fullname, photo, birthday, address,
    gender, contact_number, degree, specialty
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into `users` table
    const userSql = `
      INSERT INTO users (email, password, role, status, fullname, photo, birthday, address, gender, contact_number, email_verified)
      VALUES (?, ?, 'dentist', 'active', ?, ?, ?, ?, ?, ?, 1)
    `;

    db.query(userSql, [email, hashedPassword, fullname, photo, birthday, address, gender, contact_number], (err, userResults) => {
      if (err) {
        return res.status(500).json({ message: "Registration failed.", data: null, error: err.message });
      }

      const userId = userResults.insertId;

      // Insert into `dentists` table
      const dentistSql = `INSERT INTO dentists (id, degree, specialty) VALUES (?, ?, ?)`;
      db.query(dentistSql, [userId, degree, specialty], (dentistErr) => {
        if (dentistErr) {
          return res.status(500).json({ message: "Failed to register dentist.", data: null, error: dentistErr.message });
        }

        res.status(201).json({
          message: "Dentist registered successfully.",
          data: {
            id: userId, email, fullname, status: 'active', degree, specialty, email_verified: 1
          },
          error: null
        });
      });
    });

  } catch (error) {
    res.status(500).json({ message: "An error occurred during registration.", data: null, error: error.message });
  }
});

/**
 * ✅ Get all dentists
 */
router.get('/', verifyToken, (req, res) => {
  const sql = `
    SELECT 
      users.id AS user_id, users.email, users.fullname, users.status,
      users.photo, users.birthday, users.address, users.gender, 
      users.contact_number, dentists.degree, dentists.specialty
    FROM users
    LEFT JOIN dentists ON users.id = dentists.id
    WHERE users.role = 'dentist'
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching dentists.", data: null, error: err.message });
    }
    res.status(200).json({ message: "Dentists retrieved successfully.", data: results, error: null });
  });
});

/**
 * ✅ Get a specific dentist by ID
 */
router.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  // Ensure the ID is a valid number
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid dentist ID.", data: null, error: null });
  }

  const sql = `
    SELECT 
      users.id AS user_id, users.email, users.fullname, users.status,
      users.photo, users.birthday, users.address, users.gender, 
      users.contact_number, dentists.degree, dentists.specialty
    FROM users
    LEFT JOIN dentists ON users.id = dentists.id
    WHERE users.id = ? AND users.role = 'dentist' -- ✅ Ensures only dentists are retrieved
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching dentist by ID.", data: null, error: err.message });
    }
    if (!results.length) {
      return res.status(404).json({ message: "Dentist not found.", data: null, error: null });
    }
    res.status(200).json({ message: "Dentist retrieved successfully.", data: results[0], error: null });
  });
});


/**
 * ✅ Update a dentist's details
 */
router.put('/:id', verifyToken, verifyRole('admin', 'dentist'), (req, res) => {
  const { id } = req.params;
  const { fullname, photo, birthday, address, gender, contact_number, degree, specialty } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid dentist ID.", data: null, error: null });
  }

  const updateUserSql = `
    UPDATE users 
    SET fullname = ?, photo = ?, birthday = ?, address = ?, gender = ?, contact_number = ?
    WHERE id = ?
  `;

  db.query(updateUserSql, [fullname, photo, birthday, address, gender, contact_number, id], (userErr, userResults) => {
    if (userErr) {
      return res.status(500).json({ message: "Error updating dentist details.", data: null, error: userErr.message });
    }
    if (userResults.affectedRows === 0) {
      return res.status(404).json({ message: "Dentist not found.", data: null, error: null });
    }

    const updateDentistSql = `UPDATE dentists SET degree = ?, specialty = ? WHERE id = ?`;
    db.query(updateDentistSql, [degree, specialty, id], (dentistErr) => {
      if (dentistErr) {
        return res.status(500).json({ message: "Error updating dentist specialization.", data: null, error: dentistErr.message });
      }

      res.status(200).json({ message: "Dentist details updated successfully.", data: null, error: null });
    });
  });
});

/**
 * ✅ Delete a dentist (Admin only)
 */
router.delete('/:id', verifyToken, verifyRole('admin'), (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid dentist ID.", data: null, error: null });
  }

  const sql = `DELETE FROM users WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting dentist.", data: null, error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Dentist not found.", data: null, error: null });
    }
    res.status(200).json({ message: "Dentist deleted successfully.", data: null, error: null });
  });
});

module.exports = router;
