const express = require('express');
const db = require('../db'); // Database connection
const { verifyToken, verifyRole } = require('../middlewares/auth'); // JWT middleware
const { successResponse, errorResponse } = require('../utils/responseHelper'); // Response helpers

const router = express.Router();

/**
 * ✅ Get all prescriptions
 */
router.get('/', verifyToken, (req, res) => {
  db.query('SELECT * FROM prescriptions', (err, results) => {
    if (err) return errorResponse(res, 'Error fetching prescriptions.', err.message, 500);
    successResponse(res, 'Prescriptions retrieved successfully.', results);
  });
});

/**
 * ✅ Get a prescription by ID
 */
router.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM prescriptions WHERE id = ?', [id], (err, results) => {
    if (err) return errorResponse(res, 'Error fetching prescription.', err.message, 500);
    if (results.length === 0) return errorResponse(res, 'Prescription not found.', null, 404);
    successResponse(res, 'Prescription retrieved successfully.', results[0]);
  });
});

/**
 * ✅ Get all prescriptions by Patient ID
 */
router.get('/patient/:patientId', verifyToken, (req, res) => {
  const { patientId } = req.params;

  db.query('SELECT * FROM prescriptions WHERE patient_id = ?', [patientId], (err, results) => {
    if (err) return errorResponse(res, 'Error fetching prescriptions for the patient.', err.message, 500);
    successResponse(res, 'Prescriptions retrieved successfully.', results);
  });
});

/**
 * ✅ Create a new prescription
 */
router.post('/', verifyToken, verifyRole('dentist', 'admin'), (req, res) => {
  const { patient_id, dentist_id, medicine, notes } = req.body;

  if (!patient_id || !dentist_id || !medicine) {
    return errorResponse(res, 'Missing required fields.', null, 400);
  }

  const currentDate = new Date().toISOString().split('T')[0];

  db.query(
    'INSERT INTO prescriptions (patient_id, dentist_id, date, medicine, notes) VALUES (?, ?, ?, ?, ?)',
    [patient_id, dentist_id, currentDate, medicine, notes],
    (err, results) => {
      if (err) return errorResponse(res, 'Error creating prescription.', err.message, 500);
      successResponse(res, 'Prescription created successfully.', { id: results.insertId });
    }
  );
});

/**
 * ✅ Update a prescription with validation
 */
router.put('/:id', verifyToken, verifyRole('dentist', 'admin'), (req, res) => {
  const { id } = req.params;
  const { patient_id, dentist_id, date, medicine, notes } = req.body;

  if (!patient_id || !dentist_id || !date || !medicine) {
    return errorResponse(res, 'Missing required fields.', null, 400);
  }

  db.query('SELECT * FROM prescriptions WHERE id = ?', [id], (err, results) => {
    if (err) return errorResponse(res, 'Error checking prescription existence.', err.message, 500);
    if (results.length === 0) return errorResponse(res, 'Prescription not found.', null, 404);

    db.query(
      'UPDATE prescriptions SET patient_id = ?, dentist_id = ?, date = ?, medicine = ?, notes = ? WHERE id = ?',
      [patient_id, dentist_id, date, medicine, notes, id],
      (err, updateResults) => {
        if (err) return errorResponse(res, 'Error updating prescription.', err.message, 500);
        successResponse(res, 'Prescription updated successfully.');
      }
    );
  });
});

/**
 * ✅ Delete a prescription with validation
 */
router.delete('/:id', verifyToken, verifyRole('dentist', 'admin'), (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM prescriptions WHERE id = ?', [id], (err, results) => {
    if (err) return errorResponse(res, 'Error checking prescription existence.', err.message, 500);
    if (results.length === 0) return errorResponse(res, 'Prescription not found.', null, 404);

    db.query('DELETE FROM prescriptions WHERE id = ?', [id], (err, deleteResults) => {
      if (err) return errorResponse(res, 'Error deleting prescription.', err.message, 500);
      successResponse(res, 'Prescription deleted successfully.');
    });
  });
});

module.exports = router;
