const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db'); // Database connection
const sendEmail = require('../utils/email');
const router = express.Router();
const nodemailer = require('nodemailer');

// ✅ LOGIN ROUTE
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required.", data: null });
  }

  try {
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database query failed.", data: null });
      }

      const user = results[0];
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials.", data: null });
      }

      if (!user.email_verified) {
        return res.status(403).json({ message: "Email is not verified. Please verify your email to log in.", data: null });
      }

      const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
      const refreshToken = jwt.sign({ id: user.id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

      db.query('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, user.id], (updateErr) => {
        if (updateErr) {
          return res.status(500).json({ message: "Failed to save refresh token.", data: null });
        }

        res.status(200).json({
          message: "Login successful.",
          data: { accessToken, refreshToken },
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during login.", data: null });
  }
});

// ✅ REGISTER ROUTE
router.post('/register', async (req, res) => {
  const { email, password, role, status = 'pending', fullname, photo, birthday, address, gender, contact_number } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      `INSERT INTO users (email, password, role, status, fullname, photo, birthday, address, gender, contact_number, email_verified)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [email, hashedPassword, role, status, fullname, photo, birthday, address, gender, contact_number],
      async (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Database error during registration.", data: null });
        }

        const verificationToken = jwt.sign({ id: results.insertId, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

        const verificationLink = `http://localhost:${process.env.PORT || 8082}/auth/verify-email?token=${verificationToken}`;

        try {
          await sendEmail(email, "Verify your email", `<p>Click the link to verify: <a href="${verificationLink}">${verificationLink}</a></p>`);

          res.status(201).json({
            message: "Registration successful. Please check your email to verify your account.",
            data: { id: results.insertId, email, role, status },
          });
        } catch (emailError) {
          res.status(500).json({ message: "Registration successful, but failed to send verification email.", data: null });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred.", data: null });
  }
});

// ✅ REFRESH TOKEN ROUTE
router.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(400).json({ message: "Refresh token is required.", data: null });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid or expired refresh token.", data: null });

    const newAccessToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

    res.status(200).json({
      message: "Access token refreshed successfully.",
      data: { accessToken: newAccessToken },
    });
  });
});

// ✅ LOGOUT ROUTE
router.post('/logout', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required.", data: null });
  }

  db.query('UPDATE users SET refresh_token = NULL WHERE refresh_token = ?', [refreshToken], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database query failed.", data: null });
    }

    if (results.affectedRows === 0) {
      return res.status(401).json({ message: "Invalid refresh token.", data: null });
    }

    res.status(200).json({ message: "Logout successful.", data: null });
  });
});

// ✅ VERIFY EMAIL ROUTE
router.get('/verify-email', (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token is required.", data: null });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: "Invalid or expired token.", data: null });
    }

    db.query('UPDATE users SET email_verified = 1, status = "active" WHERE id = ?', [decoded.id], (err) => {
      if (err) {
        return res.status(500).json({ message: "Database update failed.", data: null });
      }

      res.status(200).json({
        message: "Email verified successfully. Your account is now active.",
        data: null,
      });
    });
  });
});

module.exports = router;
