const express = require('express');
const router = express.Router();
const db = require('../db'); // Database connection
const { verifyToken, verifyRole } = require('../middlewares/auth');
const { successResponse, errorResponse } = require('../utils/responseHelper'); // Response helpers

// ✅ Get all treatments with validation
router.get('/', verifyToken, (req, res) => {
  db.query('SELECT * FROM treatments', (err, results) => {
    if (err) return errorResponse(res, 'Error fetching treatments.', err.message, 500);
    if (results.length === 0) return errorResponse(res, 'No treatments found.', null, 404);
    successResponse(res, 'Treatments retrieved successfully.', results);
  });
});

// ✅ Get a treatment by ID with validation
router.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM treatments WHERE id = ?', [id], (err, results) => {
    if (err) return errorResponse(res, 'Error fetching treatment by ID.', err.message, 500);
    if (results.length === 0) return errorResponse(res, 'Treatment not found.', null, 404);
    successResponse(res, 'Treatment retrieved successfully.', results[0]);
  });
});

// ✅ Get treatments by patient ID with validation
router.get('/patient/:patientId', verifyToken, (req, res) => {
  const { patientId } = req.params;

  db.query('SELECT * FROM treatments WHERE patient_id = ?', [patientId], (err, results) => {
    if (err) return errorResponse(res, 'Error fetching treatments for patient.', err.message, 500);
    if (results.length === 0) return errorResponse(res, 'No treatments found for this patient.', null, 404);
    successResponse(res, 'Treatments retrieved successfully.', results);
  });
});

// ✅ Create a new treatment with validation
router.post('/', verifyToken, verifyRole('admin', 'dentist'), (req, res) => {
  const { patient_id, dentist_id, date_visit, teeth, treatment, description, fees, remarks } = req.body;

  if (!patient_id || !dentist_id || !date_visit || !treatment) {
    return errorResponse(res, 'Missing required fields.', null, 400);
  }

  db.query(
    'INSERT INTO treatments (patient_id, dentist_id, date_visit, teeth, treatment, description, fees, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [patient_id, dentist_id, date_visit, teeth, treatment, description, fees, remarks],
    (err, results) => {
      if (err) return errorResponse(res, 'Error adding treatment.', err.message, 500);
      successResponse(res, 'Treatment added successfully.', { id: results.insertId });
    }
  );
});

// ✅ Update a treatment with validation
router.put('/:id', verifyToken, verifyRole('admin', 'dentist'), (req, res) => {
  const { id } = req.params;
  const { patient_id, dentist_id, date_visit, teeth, treatment, description, fees, remarks } = req.body;

  if (!patient_id || !dentist_id || !date_visit || !treatment) {
    return errorResponse(res, 'Missing required fields.', null, 400);
  }

  db.query('SELECT * FROM treatments WHERE id = ?', [id], (err, results) => {
    if (err) return errorResponse(res, 'Error checking treatment existence.', err.message, 500);
    if (results.length === 0) return errorResponse(res, 'Treatment not found.', null, 404);

    db.query(
      'UPDATE treatments SET patient_id = ?, dentist_id = ?, date_visit = ?, teeth = ?, treatment = ?, description = ?, fees = ?, remarks = ? WHERE id = ?',
      [patient_id, dentist_id, date_visit, teeth, treatment, description, fees, remarks, id],
      (err) => {
        if (err) return errorResponse(res, 'Error updating treatment.', err.message, 500);
        successResponse(res, 'Treatment updated successfully.');
      }
    );
  });
});

// ✅ Delete a treatment with validation
router.delete('/:id', verifyToken, verifyRole('admin', 'dentist'), (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM treatments WHERE id = ?', [id], (err, results) => {
    if (err) return errorResponse(res, 'Error checking treatment existence.', err.message, 500);
    if (results.length === 0) return errorResponse(res, 'Treatment not found.', null, 404);

    db.query('DELETE FROM treatments WHERE id = ?', [id], (err) => {
      if (err) return errorResponse(res, 'Error deleting treatment.', err.message, 500);
      successResponse(res, 'Treatment deleted successfully.');
    });
  });
});

module.exports = router;
