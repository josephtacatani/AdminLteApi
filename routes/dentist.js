const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const { verifyToken, verifyRole } = require('../middlewares/auth');

const router = express.Router();

/**
 * Create a new user (Admin only)
 */
router.post('/register', verifyToken, verifyRole('admin'), async (req, res) => {
  const {
    email,
    password,
    role = 'dentist', // Default role is dentist
    fullname,
    photo,
    birthday,
    address,
    gender,
    contact_number,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (email, password, role, status, fullname, photo, birthday, address, gender, contact_number, email_verified)
      VALUES (?, ?, ?, 'active', ?, ?, ?, ?, ?, ?, 1)
    `;

    db.query(
      sql,
      [email, hashedPassword, role, fullname, photo, birthday, address, gender, contact_number],
      (err, results) => {
        if (err) {
          return res.status(500).json({
            message: 'Registration failed.',
            error: err.message,
          });
        }

        res.status(201).json({
          message: 'User registered successfully.',
          data: {
            id: results.insertId,
            email,
            role,
            status: 'active',
            fullname,
            photo,
            birthday,
            address,
            gender,
            contact_number,
            email_verified: 1,
          },
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred during registration.',
      error: error.message,
    });
  }
});

/**
 * Get all users (Admin only)
 */
router.get('/', verifyToken, (req, res) => {
  const sql = `
    SELECT 
      users.id AS user_id, 
      users.email, 
      users.role, 
      users.status, 
      users.fullname, 
      users.photo, 
      users.birthday, 
      users.address, 
      users.gender, 
      users.contact_number, 
      users.email_verified,
      dentists.degree, 
      dentists.specialty
    FROM 
      users
    LEFT JOIN 
      dentists 
    ON 
      users.id = dentists.id
    WHERE
      users.role = 'dentist'
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Error fetching dentists.',
        error: err.message,
      });
    }
    res.status(200).json({
      message: 'Dentists retrieved successfully.',
      data: results,
    });
  });
});

/**
 * Get a specific user by ID
 */
router.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      users.id AS user_id, 
      users.email, 
      users.role, 
      users.status, 
      users.fullname, 
      users.photo, 
      users.birthday, 
      users.address, 
      users.gender, 
      users.contact_number, 
      users.email_verified,
      dentists.degree, 
      dentists.specialty
    FROM 
      users
    LEFT JOIN 
      dentists 
    ON 
      users.id = dentists.id
    WHERE 
      users.id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Error fetching user by ID.',
        error: err.message,
      });
    }
    if (results.length === 0) {
      return res.status(404).json({
        message: 'User not found.',
        error: null,
      });
    }
    res.status(200).json({
      message: 'User retrieved successfully.',
      data: results[0],
    });
  });
});

/**
 * Delete a user by ID (Admin only)
 */
router.delete('/:id', verifyToken, verifyRole('admin'), (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM users WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Error deleting user.',
        error: err.message,
      });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({
        message: 'User not found.',
        error: null,
      });
    }
    res.status(200).json({
      message: 'User deleted successfully.',
      data: null,
    });
  });
});

/**
 * Update user and dentist details
 */
router.put('/:id', verifyToken, verifyRole('admin', 'dentist'), (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    photo,
    birthday,
    address,
    gender,
    contact_number,
    degree,
    specialty,
  } = req.body;

  const updateUserSql = `
    UPDATE users 
    SET fullname = ?, photo = ?, birthday = ?, address = ?, gender = ?, contact_number = ?
    WHERE id = ?
  `;

  db.query(
    updateUserSql,
    [fullname, photo, birthday, address, gender, contact_number, id],
    (userErr, userResults) => {
      if (userErr) {
        return res.status(500).json({
          message: 'Error updating user details.',
          error: userErr.message,
        });
      }

      if (userResults.affectedRows === 0) {
        return res.status(404).json({
          message: 'User not found.',
          error: null,
        });
      }

      const updateDentistSql = `
        UPDATE dentists 
        SET degree = ?, specialty = ? 
        WHERE id = ?
      `;

      db.query(updateDentistSql, [degree, specialty, id], (dentistErr, dentistResults) => {
        if (dentistErr) {
          return res.status(500).json({
            message: 'Error updating dentist details.',
            error: dentistErr.message,
          });
        }

        if (dentistResults.affectedRows === 0) {
          return res.status(404).json({
            message: 'Dentist not found.',
            error: null,
          });
        }

        res.status(200).json({
          message: 'Dentist details updated successfully.',
          data: null,
        });
      });
    }
  );
});

/**
 * Reset a dentist's password (Dentist only)
 */
router.put('/reset-password/:id', verifyToken, verifyRole('dentist','super_admin','admin'), async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  // Validate input
  if (!newPassword) {
    return errorResponse(res, 'Validation failed. Missing required fields.', null, 400);
  }

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the dentist's password in the database
    const sql = `
      UPDATE users
      SET password = ?
      WHERE id = ? AND role = 'dentist'
    `;

    db.query(sql, [hashedPassword, id], (err, results) => {
      if (err) {
        return errorResponse(res, 'Error resetting password.', err.message, 500);
      }

      if (results.affectedRows === 0) {
        return errorResponse(res, 'Dentist not found.', null, 404);
      }

      successResponse(res, 'Dentist password reset successfully.', null);
    });
  } catch (error) {
    errorResponse(res, 'An error occurred while resetting the password.', error.message, 500);
  }
});

module.exports = router;
