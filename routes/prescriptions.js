const express = require('express');
const db = require('../db'); // Database connection
const { verifyToken, verifyRole } = require('../middlewares/auth'); // JWT middleware
const { successResponse, errorResponse } = require('../utils/responseHelper'); // Envelope response helpers
const router = express.Router();

/**
 * Get all prescriptions
 */
router.get('/', verifyToken, (req, res) => {
  db.query('SELECT * FROM prescriptions', (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching prescriptions.', err.message, 500);
    }
    if (results.length === 0) {
      return successResponse(res, 'No prescriptions found.', []);
    }
    successResponse(res, 'Prescriptions retrieved successfully.', results);
  });
});

/**
 * Get a specific prescription by ID
 */
router.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM prescriptions WHERE id = ?', [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching prescription.', err.message, 500);
    }
    if (results.length === 0) {
      return errorResponse(res, 'Prescription not found.', null, 404);
    }
    successResponse(res, 'Prescription retrieved successfully.', results[0]);
  });
});

/**
 * Create a new prescription
 */
router.post('/', verifyToken, verifyRole('dentist', 'admin'), (req, res) => {
  const { patient_id, dentist_id, medicine, notes } = req.body;

  // Validate required fields
  if (!patient_id || !dentist_id || !medicine) {
    return errorResponse(res, 'Missing required fields.', null, 400);
  }

  // Generate the current date (format: YYYY-MM-DD)
  const currentDate = new Date().toISOString().split('T')[0];

  const sql = `
    INSERT INTO prescriptions (patient_id, dentist_id, date, medicine, notes)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [patient_id, dentist_id, currentDate, medicine, notes], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error creating prescription.', err.message, 500);
    }

    // Return the created prescription ID
    successResponse(res, 'Prescription created successfully.', { id: results.insertId });
  });
});

/**
 * Update a prescription
 */
router.put('/:id', verifyToken, verifyRole('dentist', 'admin'), (req, res) => {
  const { id } = req.params;
  const { patient_id, dentist_id, date, medicine, notes } = req.body;

  // Validate required fields
  if (!patient_id || !dentist_id || !date || !medicine) {
    return errorResponse(res, 'Missing required fields.', null, 400);
  }

  const sql = `
    UPDATE prescriptions
    SET patient_id = ?, dentist_id = ?, date = ?, medicine = ?, notes = ?
    WHERE id = ?
  `;
  db.query(sql, [patient_id, dentist_id, date, medicine, notes, id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error updating prescription.', err.message, 500);
    }
    if (results.affectedRows === 0) {
      return errorResponse(res, 'Prescription not found.', null, 404);
    }
    successResponse(res, 'Prescription updated successfully.');
  });
});

/**
 * Delete a prescription
 */
router.delete('/:id', verifyToken, verifyRole('dentist', 'admin'), (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM prescriptions WHERE id = ?', [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error deleting prescription.', err.message, 500);
    }
    if (results.affectedRows === 0) {
      return errorResponse(res, 'Prescription not found.', null, 404);
    }
    successResponse(res, 'Prescription deleted successfully.', null);
  });
});

module.exports = router;
