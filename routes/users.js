const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database connection
const bcrypt = require('bcrypt');


// Get all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Get a user by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(results[0]);
    }
  });
});
  

// Update a user
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    email,
    password,
    role,
    status,
    fullname,
    photo,
    birthday,
    address,
    gender,
    contact_number,
    refresh_token,
    email_verified,
  } = req.body;

  const sql = `UPDATE users SET email = ?, password = ?, role = ?, status = ?, fullname = ?, photo = ?, birthday = ?, address = ?, gender = ?, contact_number = ?, refresh_token = ?, email_verified = ? WHERE id = ?`;

  db.query(
    sql,
    [email, password, role, status, fullname, photo, birthday, address, gender, contact_number, refresh_token, email_verified, id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    }
  );
});

// Delete a user
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(204).send(); // No content response
    }
  });
});

module.exports = router;
