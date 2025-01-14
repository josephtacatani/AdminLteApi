const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const { verifyToken, verifyRole } = require('../middlewares/auth');
const { successResponse, errorResponse } = require('../utils/responseHelper'); // Envelope response helpers

const router = express.Router();

/**
 * Register a new admin (Super Admin only)
 */
router.post('/register', verifyToken, verifyRole('super_admin'), async (req, res) => {
  const {
    email,
    password,
    fullname,
    photo,
    birthday,
    address,
    gender,
    contact_number,
    role = 'admin', // Default role for this endpoint is admin
  } = req.body;

  try {
    // Validate required fields
    if (!email || !password || !fullname) {
      return errorResponse(res, 'Validation failed. Missing required fields.', null, 400);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new admin into the database
    const sql = `
      INSERT INTO users (email, password, role, status, fullname, photo, birthday, address, gender, contact_number, email_verified)
      VALUES (?, ?, ?, 'active', ?, ?, ?, ?, ?, ?, 1)
    `;

    db.query(
      sql,
      [email, hashedPassword, role, fullname, photo, birthday, address, gender, contact_number],
      (err, results) => {
        if (err) {
          return errorResponse(res, 'Registration failed.', err.message, 500);
        }

        // Send a success response
        successResponse(res, 'Admin registered successfully.', {
          email,
          role,
          status: 'active',
          fullname,
          photo,
          birthday,
          address,
          gender,
          contact_number,
          email_verified: true,
        });
      }
    );
  } catch (error) {
    errorResponse(res, 'An error occurred during registration.', error.message, 500);
  }
});

/**
 * Get all admins (Super Admin only)
 */
router.get('/', verifyToken, verifyRole('super_admin'), (req, res) => {
  const sql = `
    SELECT 
      id, email, fullname, photo, birthday, address, gender, contact_number, role, status, email_verified
    FROM 
      users
    WHERE 
      role = 'admin'
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching admins.', err.message, 500);
    }

    if (results.length === 0) {
      return errorResponse(res, 'No admins found.', null, 404);
    }

    successResponse(res, 'Admins retrieved successfully.', results);
  });
});

/**
 * Get a specific admin by ID
 */
router.get('/:id', verifyToken, verifyRole('super_admin'), (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      id, email, fullname, photo, birthday, address, gender, contact_number, role, status, email_verified
    FROM 
      users
    WHERE 
      id = ? AND role = 'admin'
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching admin by ID.', err.message, 500);
    }
    if (results.length === 0) {
      return errorResponse(res, 'Admin not found.', null, 404);
    }

    successResponse(res, 'Admin retrieved successfully.', results[0]);
  });
});

/**
 * Update a specific admin (Super Admin only)
 */
router.put('/:id', verifyToken, verifyRole('super_admin'), (req, res) => {
  const { id: pathId } = req.params;
  const {
    id: bodyId,
    fullname,
    photo,
    birthday,
    address,
    gender,
    contact_number,
  } = req.body;

  // Ensure the ID in the body matches the ID in the path
  if (parseInt(pathId) !== parseInt(bodyId)) {
    return errorResponse(res, 'Path ID and body ID do not match.', null, 400);
  }

  const sql = `
    UPDATE users 
    SET fullname = ?, photo = ?, birthday = ?, address = ?, gender = ?, contact_number = ?
    WHERE id = ? AND role = 'admin'
  `;

  db.query(
    sql,
    [fullname, photo, birthday, address, gender, contact_number, pathId],
    (err, results) => {
      if (err) {
        return errorResponse(res, 'Error updating admin details.', err.message, 500);
      }
      if (results.affectedRows === 0) {
        return errorResponse(res, 'Admin not found.', null, 404);
      }

      successResponse(res, 'Admin details updated successfully.', null);
    }
  );
});

/**
 * Delete a specific admin (Super Admin only)
 */
router.delete('/:id', verifyToken, verifyRole('super_admin'), (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM users WHERE id = ? AND role = 'admin'`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error deleting admin.', err.message, 500);
    }
    if (results.affectedRows === 0) {
      return errorResponse(res, 'Admin not found.', null, 404);
    }

    successResponse(res, 'Admin deleted successfully.', null);
  });
});

router.put('/reset-password/:id', verifyToken, verifyRole('admin', 'super_admin'), async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;
  
    // Validate input
    if (!newPassword) {
      return errorResponse(res, 'Validation failed. Missing required fields.', null, 400);
    }
  
    try {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password in the database
      const sql = `
        UPDATE users
        SET password = ?
        WHERE id = ?
      `;
  
      db.query(sql, [hashedPassword, id], (err, results) => {
        if (err) {
          return errorResponse(res, 'Error resetting password.', err.message, 500);
        }
  
        if (results.affectedRows === 0) {
          return errorResponse(res, 'User not found.', null, 404);
        }
  
        successResponse(res, 'Password reset successfully.', null);
      });
    } catch (error) {
      errorResponse(res, 'An error occurred while resetting password.', error.message, 500);
    }
  });

module.exports = router;
