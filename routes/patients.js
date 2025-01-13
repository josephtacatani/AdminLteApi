const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db'); // Centralized database connection

// Get All Patients
router.get('/', (req, res) => {
  const sql = 'SELECT id, firstName, lastName, dateOfBirth, gender, email, mobileNumber, address, profilePicture FROM patients';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database Query Error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(results);
  });
});

// Get a Specific Patient by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT id, firstName, lastName, dateOfBirth, gender, email, mobileNumber, address, profilePicture FROM patients WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Database Query Error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json(results[0]);
  });
});

// Add a New Patient
router.post('/', async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    mobileNumber,
    address,
    profilePicture,
    password,
  } = req.body;

  try {
    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const sql = `
      INSERT INTO patients (firstName, lastName, dateOfBirth, gender, email, mobileNumber, address, profilePicture, password_hash)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [firstName, lastName, dateOfBirth, gender, email, mobileNumber, address, profilePicture, passwordHash],
      (err, result) => {
        if (err) {
          console.error('Database Insertion Error:', err);
          return res.status(500).json({ error: 'Failed to add patient', details: err });
        }
        res.status(201).json({
          id: result.insertId,
          firstName,
          lastName,
          dateOfBirth,
          gender,
          email,
          mobileNumber,
          address,
          profilePicture,
        });
      }
    );
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'Failed to process the request' });
  }
});

// Update a Patient
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    dateOfBirth,
    gender,
    email,
    mobileNumber,
    address,
    profilePicture,
  } = req.body;

  const sql = `
    UPDATE patients
    SET firstName = ?, lastName = ?, dateOfBirth = ?, gender = ?, email = ?, mobileNumber = ?, address = ?, profilePicture = ?
    WHERE id = ?
  `;
  db.query(
    sql,
    [firstName, lastName, dateOfBirth, gender, email, mobileNumber, address, profilePicture, id],
    (err, result) => {
      if (err) {
        console.error('Database Update Error:', err);
        return res.status(500).json({ error: 'Failed to update patient', details: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.status(200).json({ message: 'Patient updated successfully' });
    }
  );
});

// Update Patient Password
router.put('/:id/password', async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Both old and new passwords are required' });
  }

  try {
    // Fetch the current password hash from the database
    const sqlSelect = 'SELECT password_hash FROM patients WHERE id = ?';
    db.query(sqlSelect, [id], async (err, results) => {
      if (err) {
        console.error('Database Query Error:', err);
        return res.status(500).json({ error: 'Database query failed' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      const { password_hash } = results[0];

      // Verify the old password
      const isMatch = await bcrypt.compare(oldPassword, password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Old password is incorrect' });
      }

      // Hash the new password
      const saltRounds = 10;
      const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

      // Update the password in the database
      const sqlUpdate = 'UPDATE patients SET password_hash = ? WHERE id = ?';
      db.query(sqlUpdate, [newPasswordHash, id], (err, result) => {
        if (err) {
          console.error('Database Update Error:', err);
          return res.status(500).json({ error: 'Failed to update password', details: err });
        }
        res.status(200).json({ message: 'Password updated successfully' });
      });
    });
  } catch (error) {
    console.error('Error processing password update:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a Patient
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM patients WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Database Deletion Error:', err);
      return res.status(500).json({ error: 'Failed to delete patient', details: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  });
});

module.exports = router;