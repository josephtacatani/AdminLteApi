const express = require('express');
const db = require('../db'); // Database connection
const { verifyToken, verifyRole } = require('../middlewares/auth'); // JWT middleware
const { successResponse, errorResponse } = require('../utils/responseHelper'); // Envelope response helpers
const router = express.Router();

/**
 * Get all medical histories
 */
router.get('/', verifyToken, (req, res) => {
  db.query('SELECT * FROM medical_histories', (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching medical histories.', err.message, 500);
    }
    if (results.length === 0) {
      return successResponse(res, 'No medical histories found.', []);
    }
    successResponse(res, 'Medical histories retrieved successfully.', results);
  });
});

/**
 * Get all medical histories by Patient ID
 */
router.get('/by-patient/:patient_id', verifyToken, (req, res) => {
  const { patient_id } = req.params;

  db.query('SELECT * FROM medical_histories WHERE patient_id = ?', [patient_id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching medical histories for patient.', err.message, 500);
    }
    if (results.length === 0) {
      return successResponse(res, 'No medical histories found for this patient.', []);
    }
    successResponse(res, 'Medical histories retrieved successfully.', results);
  });
});

/**
 * Get a specific medical history by ID
 */
router.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM medical_histories WHERE id = ?', [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching medical history.', err.message, 500);
    }
    if (results.length === 0) {
      return errorResponse(res, 'Medical history not found.', null, 404);
    }
    successResponse(res, 'Medical history retrieved successfully.', results[0]);
  });
});

/**
 * Create a new medical history
 */
router.post('/', verifyToken, verifyRole('dentist', 'staff', 'admin'), (req, res) => {
  const { patient_id, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10 } = req.body;

  if (!patient_id) {
    return errorResponse(res, 'Patient ID is required.', null, 400);
  }

  const sql = `
    INSERT INTO medical_histories (patient_id, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [patient_id, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error creating medical history.', err.message, 500);
    }
    successResponse(res, 'Medical history created successfully.', { id: results.insertId });
  });
});

/**
 * Update a medical history
 */
router.put('/:id', verifyToken, verifyRole('dentist', 'staff', 'admin'), (req, res) => {
  const { id } = req.params;
  const { patient_id, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10 } = req.body;

  if (!patient_id) {
    return errorResponse(res, 'Patient ID is required.', null, 400);
  }

  const sql = `
    UPDATE medical_histories SET patient_id = ?, question1 = ?, question2 = ?, question3 = ?, question4 = ?, question5 = ?, question6 = ?, question7 = ?, question8 = ?, question9 = ?, question10 = ?
    WHERE id = ?
  `;
  db.query(sql, [patient_id, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error updating medical history.', err.message, 500);
    } else if (results.affectedRows === 0) {
      return errorResponse(res, 'Medical history not found.', null, 404);
    }
    successResponse(res, 'Medical history updated successfully.');
  });
});

/**
 * Delete a medical history
 */
router.delete('/:id', verifyToken, verifyRole('dentist', 'staff', 'admin'), (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM medical_histories WHERE id = ?', [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error deleting medical history.', err.message, 500);
    } else if (results.affectedRows === 0) {
      return errorResponse(res, 'Medical history not found.', null, 404);
    }
    successResponse(res, 'Medical history deleted successfully.');
  });
});

module.exports = router;