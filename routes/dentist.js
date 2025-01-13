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
          return res.status(500).json({ message: 'Registration failed.', error: err.message });
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
    res.status(500).json({ message: 'An error occurred during registration.', error: error.message });
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
        users.role = 'dentist' -- Fixed the operator here
    `;
  
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching dentists', error: err.message });
      }
      res.status(200).json(results);
    });
  });
  

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
        return res.status(500).json({ message: 'Error fetching dentist and user by ID.', error: err.message });
      } 
      if (results.length === 0) {
        return res.status(404).json({ message: 'Dentist or user not found.' });
      }
      res.status(200).json(results[0]); // Return only the first (and expected single) result
    });
  });

  //delete
  router.delete('/:id', verifyToken, verifyRole('admin'), (req, res) => {
    const { id } = req.params;
  
    const sql = `DELETE FROM users WHERE id = ?`;
  
    db.query(sql, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting dentist or user.', error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Dentist or user not found.' });
      }
      res.status(200).json({ message: 'Dentist deleted successfully.' });
    });
  });

  /**
 * @swagger
 * /dentists/{id}:
 *   put:
 *     summary: Update a specific dentist and user details by ID (Admin only)
 *     tags: [Dentists]
 *     security:
 *       - bearerAuth: [] # Requires Authorization Header with Bearer Token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the dentist or user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: Dr. Jane Smith
 *               photo:
 *                 type: string
 *                 example: profile.jpg
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: 1980-05-15
 *               address:
 *                 type: string
 *                 example: 123 Main Street
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 example: female
 *               contact_number:
 *                 type: string
 *                 example: 123456789
 *               degree:
 *                 type: string
 *                 example: DDS
 *               specialty:
 *                 type: string
 *                 example: Orthodontics
 *     responses:
 *       200:
 *         description: Dentist and user details updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Dentist and user details updated successfully.
 *       404:
 *         description: Dentist or user not found.
 *       500:
 *         description: Internal server error.
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
  
    // Update the `users` table
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
          return res.status(500).json({ message: 'Error updating user details.', error: userErr.message });
        }
  
        if (userResults.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found.' });
        }
  
        // Update the `dentists` table
        const updateDentistSql = `
          UPDATE dentists 
          SET degree = ?, specialty = ? 
          WHERE id = ?
        `;
  
        db.query(updateDentistSql, [degree, specialty, id], (dentistErr, dentistResults) => {
          if (dentistErr) {
            return res.status(500).json({ message: 'Error updating dentist details.', error: dentistErr.message });
          }
  
          if (dentistResults.affectedRows === 0) {
            return res.status(404).json({ message: 'Dentist not found.' });
          }
  
          res.status(200).json({ message: 'Dentist and user details updated successfully.' });
        });
      }
    );
  });
  
  
  



module.exports = router;
