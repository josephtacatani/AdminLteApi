const express = require('express');
const db = require('../db'); // Database connection
const { verifyToken, verifyRole } = require('../middlewares/auth'); // JWT middleware
const { successResponse, errorResponse } = require('../utils/responseHelper'); // Envelope response helpers
const router = express.Router();

/**
 * Get all dental histories
 */
router.get('/', verifyToken, (req, res) => {
  db.query('SELECT * FROM dental_histories', (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching dental histories.', err.message, 500);
    }
    if (results.length === 0) {
      return successResponse(res, 'No dental histories found.', []);
    }
    successResponse(res, 'Dental histories retrieved successfully.', results);
  });
});

router.get('/by-patient/:patient_id', verifyToken, (req, res) => {
  const { patient_id } = req.params;

  db.query('SELECT * FROM dental_histories WHERE patient_id = ?', [patient_id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching dental histories by patient ID.', err.message, 500);
    }
    if (results.length === 0) {
      return successResponse(res, 'No dental histories found for this patient.', []);
    }
    successResponse(res, 'Dental histories retrieved successfully.', results);
  });
});

/**
 * Get a specific dental history by ID
 */
router.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM dental_histories WHERE id = ?', [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching dental history.', err.message, 500);
    }
    if (results.length === 0) {
      return errorResponse(res, 'Dental history not found.', null, 404);
    }
    successResponse(res, 'Dental history retrieved successfully.', results[0]);
  });
});

/**
 * Create a new dental history
 */
router.post('/', verifyToken, verifyRole('dentist', 'staff', 'admin'), async (req, res) => {
  const { patient_id, previous_dentist, last_dentist_visit } = req.body;

  // Validate required fields
  if (!patient_id) {
    return errorResponse(res, 'Patient ID is required.', null, 400);
  }

  const sql = `
    INSERT INTO dental_histories (patient_id, previous_dentist, last_dentist_visit)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [patient_id, previous_dentist, last_dentist_visit], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error creating dental history.', err.message, 500);
    }

    // Return the created dental history ID
    successResponse(res, 'Dental history created successfully.', { id: results.insertId });
  });
});

/**
 * Update a dental history
 */
router.put('/:id', verifyToken, verifyRole('dentist', 'staff', 'admin'), async (req, res) => {
  const { id } = req.params;
  const { patient_id, previous_dentist, last_dentist_visit } = req.body;

  // Validate required fields
  if (!patient_id) {
    return errorResponse(res, 'Patient ID is required.', null, 400);
  }

  const sql = `
    UPDATE dental_histories
    SET patient_id = ?, previous_dentist = ?, last_dentist_visit = ?
    WHERE id = ?
  `;
  db.query(sql, [patient_id, previous_dentist, last_dentist_visit, id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error updating dental history.', err.message, 500);
    }
    if (results.affectedRows === 0) {
      return errorResponse(res, 'Dental history not found.', null, 404);
    }
    successResponse(res, 'Dental history updated successfully.');
  });
});

/**
 * Delete a dental history
 */
router.delete('/:id', verifyToken, verifyRole('dentist', 'staff', 'admin'), async (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM dental_histories WHERE id = ?', [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error deleting dental history.', err.message, 500);
    }
    if (results.affectedRows === 0) {
      return errorResponse(res, 'Dental history not found.', null, 404);
    }
    successResponse(res, 'Dental history deleted successfully.', null);
  });
});

module.exports = router;
