const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db'); // Assume database connection
const sendEmail = require('../utils/email');
const router = express.Router();


// Login Endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
  
    try {
      // Check if the user already has a valid access token in the `Authorization` header
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
          if (!err) {
            return res.status(200).json({
              message: 'You are already logged in.',
            });
          }
          // If token is invalid, proceed to login logic
        });
      }
  
      // Check user in the database
      db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Database query failed.' });
        }
  
        const user = results[0];
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ message: 'Invalid credentials.' });
        }
  
        // Check if email is verified
        if (!user.email_verified) {
          return res.status(403).json({ message: 'Email is not verified. Please verify your email to log in.' });
        }
  
        // Generate tokens
        const accessToken = jwt.sign(
          { id: user.id, role: user.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '15m' } // Access token expires in 15 minutes
        );
  
        const refreshToken = jwt.sign(
          { id: user.id, role: user.role },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '7d' } // Refresh token expires in 7 days
        );
  
        // Update refresh token in the database
        db.query('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, user.id], (updateErr) => {
          if (updateErr) {
            return res.status(500).json({ message: 'Failed to save refresh token.' });
          }
  
          // Return tokens in response
          res.status(200).json({
            message: 'Login successful.',
            data: {
              accessToken,
              refreshToken,
            },
          });
        });
      });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred during login.', error: error.message });
    }
  });
  
  
  
// Login Endpoint
router.post('/register', async (req, res) => {
    const {
      email,
      password,
      role,
      status = 'pending', // Default status
      fullname,
      photo,
      birthday,
      address,
      gender,
      contact_number,
    } = req.body;
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert user into the database with email_verified set to 0
      const sql = `
        INSERT INTO users (email, password, role, status, fullname, photo, birthday, address, gender, contact_number, email_verified)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
      `;
  
      db.query(
        sql,
        [email, hashedPassword, role, status, fullname, photo, birthday, address, gender, contact_number],
        async (err, results) => {
          if (err) {
            return res.status(500).json({
              message: 'Registration failed.',
              error: err.message,
            });
          }
  
          // Generate the verification token
          const verificationToken = jwt.sign(
            { id: results.insertId, email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' } // Token valid for 1 day
          );
  
          // Construct verification link
          const verificationLink = `http://localhost:${process.env.PORT || 8082}/auth/verify-email?token=${verificationToken}`;
  
          // Attempt to send email in the background
          try {
            await sendEmail(
              email,
              'Verify your email',
              `<p>Hi ${fullname},</p>
               <p>Please verify your email by clicking the link below:</p>
               <a href="${verificationLink}">${verificationLink}</a>`
            );
          } catch (emailError) {
            console.error(`Failed to send verification email to ${email}: ${emailError.message}`);
          }
          
  
          // Return the response
          res.status(201).json({
            message: 'Registration successful. Please check your email to verify your account.',
            data: {
              id: results.insertId,
              email,
              role,
              status,
              fullname,
              photo,
              birthday,
              address,
              gender,
              contact_number,
              email_verified: 0, // Explicitly set as not verified
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

  router.post('/resend-verification-email', (req, res) => {
    const { email } = req.body;
  
    // Validate input
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }
  
    // Check if the user exists in the database
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database query failed.', error: err.message });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const user = results[0];
  
      // Check if the user is already verified
      if (user.email_verified) {
        return res.status(400).json({ message: 'Email is already verified.' });
      }
  
      // Generate a new verification token
      const verificationToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' } // Token valid for 1 day
      );
  
      // Construct the verification link
      const verificationLink = `http://localhost:${process.env.PORT || 8082}/auth/verify-email?token=${verificationToken}`;
  
      // Send the verification email
      sendEmail(
        email,
        'Verify your email',
        `<p>Hi ${user.fullname || 'User'},</p>
         <p>Please verify your email by clicking the link below:</p>
         <a href="${verificationLink}">${verificationLink}</a>`
      ).catch((emailError) => {
        console.error(`Failed to send verification email to ${email}: ${emailError.message}`);
        return res.status(500).json({ message: 'Failed to send verification email.' });
      });
  
      // Respond to the client
      res.status(200).json({ message: 'Verification email sent. Please check your inbox.' });
    });
  });

// Refresh Token Endpoint
router.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(400).json({ message: 'Refresh token is required.' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired refresh token.' });

    const newAccessToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  });
});

// Verify email
router.get('/verify-email', (req, res) => {
    const { token } = req.query;
  
    if (!token) {
      return res.status(400).json({ message: 'Token is required.' });
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
      }
  
      const { id } = decoded;
  
      // Update the user's email_verified status to 1 (true)
      db.query('UPDATE users SET email_verified = 1 WHERE id = ?', [id], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
  
        res.json({ message: 'Email verified successfully. You can now log in.' });
      });
    });
  });

  //logout
  router.post('/logout', (req, res) => {
    const { refreshToken } = req.body;
  
    // Validate input
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required.' });
    }
  
    // Check if the refresh token exists in the database
    db.query('SELECT * FROM users WHERE refresh_token = ?', [refreshToken], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database query failed.', error: err.message });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid refresh token.' });
      }
  
      const user = results[0];
  
      // Invalidate the refresh token by setting it to NULL
      db.query('UPDATE users SET refresh_token = NULL WHERE id = ?', [user.id], (updateErr) => {
        if (updateErr) {
          return res.status(500).json({ message: 'Failed to log out.', error: updateErr.message });
        }
  
        res.status(200).json({ message: 'Logout successful.' });
      });
    });
  });

  //reset password request
  router.post('/reset-password-request', (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }
  
    // Check if user exists in the database
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Server error.' });
      }
  
      const user = results[0];
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Generate reset token
      const resetToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' } // Token valid for 1 hour
      );
  
      // Send reset email
      const resetLink = `http://localhost:${process.env.PORT || 8082}/auth/reset-password?token=${resetToken}`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset Your Password',
        html: `<p>Click the link below to reset your password:</p>
               <a href="${resetLink}">${resetLink}</a>`,
      };
  
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email', // Example SMTP
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      transporter.sendMail(mailOptions, (emailErr, info) => {
        if (emailErr) {
          return res.status(500).json({ message: 'Error sending email.' });
        }
  
        res.status(200).json({
          message: 'Password reset email sent successfully.',
          previewUrl: nodemailer.getTestMessageUrl(info), // For testing with Ethereal
        });
      });
    });
  });

  //reset password
  router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
  
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required.' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the password in the database
      db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, decoded.id], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating password.' });
        }
  
        res.status(200).json({ message: 'Password reset successfully.' });
      });
    } catch (err) {
      res.status(400).json({ message: 'Invalid or expired token.' });
    }
  });
  
  
  
  

module.exports = router;
