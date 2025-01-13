const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const db = require('../db');

const router = express.Router();

// Get Profile
router.get('/', verifyToken, (req, res) => {
  db.query('SELECT id, email, fullname, role FROM users WHERE id = ?', [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found.' });

    res.json(results[0]);
  });
});

module.exports = router;
