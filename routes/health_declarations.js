const express = require('express');
const db = require('../db'); // Database connection
const { verifyToken } = require('../middlewares/auth'); // JWT middleware
const { successResponse, errorResponse } = require('../utils/responseHelper'); // Envelope response helpers
const router = express.Router();

/**
 * Get all health declarations
 */
router.get('/', verifyToken, (req, res) => {
  db.query('SELECT * FROM health_declarations', (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching health declarations.', err.message, 500);
    }
    if (results.length === 0) {
      return successResponse(res, 'No health declarations found.', []);
    }
    successResponse(res, 'Health declarations retrieved successfully.', results);
  });
});

/**
 * Get a specific health declaration by ID
 */
router.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM health_declarations WHERE id = ?', [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching health declaration.', err.message, 500);
    }
    if (results.length === 0) {
      return errorResponse(res, 'Health declaration not found.', null, 404);
    }
    successResponse(res, 'Health declaration retrieved successfully.', results[0]);
  });
});

/**
 * Create a new health declaration
 */
router.post('/', verifyToken, (req, res) => {
  const {
    patient_id,
    question1, question2, question3, question4,
    question5, question6, question7, question8,
    question9, question10, question11, question12,
    question13, question14,
  } = req.body;

  // Validate required fields
  if (!patient_id) {
    return errorResponse(res, 'Patient ID is required.', null, 400);
  }

  const sql = `
    INSERT INTO health_declarations (
      patient_id, question1, question2, question3, question4, question5,
      question6, question7, question8, question9, question10, question11,
      question12, question13, question14
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [
    patient_id, question1, question2, question3, question4, question5,
    question6, question7, question8, question9, question10, question11,
    question12, question13, question14,
  ], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error creating health declaration.', err.message, 500);
    }

    // Fetch the full record after insertion
    const fetchSql = 'SELECT * FROM health_declarations WHERE id = ?';
    db.query(fetchSql, [results.insertId], (fetchErr, fetchResults) => {
      if (fetchErr) {
        return errorResponse(res, 'Error fetching health declaration.', fetchErr.message, 500);
      }
      successResponse(res, 'Health declaration created successfully.', fetchResults[0]);
    });
  });
});

/**
 * Update a health declaration
 */
router.put('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const {
    patient_id,
    question1, question2, question3, question4,
    question5, question6, question7, question8,
    question9, question10, question11, question12,
    question13, question14,
  } = req.body;

  if (!patient_id) {
    return errorResponse(res, 'Patient ID is required.', null, 400);
  }

  const sql = `
    UPDATE health_declarations SET
      patient_id = ?, question1 = ?, question2 = ?, question3 = ?, question4 = ?,
      question5 = ?, question6 = ?, question7 = ?, question8 = ?, question9 = ?,
      question10 = ?, question11 = ?, question12 = ?, question13 = ?, question14 = ?
    WHERE id = ?
  `;
  db.query(sql, [
    patient_id, question1, question2, question3, question4,
    question5, question6, question7, question8, question9,
    question10, question11, question12, question13, question14, id,
  ], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error updating health declaration.', err.message, 500);
    }
    if (results.affectedRows === 0) {
      return errorResponse(res, 'Health declaration not found.', null, 404);
    }
    successResponse(res, 'Health declaration updated successfully.');
  });
});

/**
 * Delete a health declaration
 */
router.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM health_declarations WHERE id = ?', [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error deleting health declaration.', err.message, 500);
    }
    if (results.affectedRows === 0) {
      return errorResponse(res, 'Health declaration not found.', null, 404);
    }
    successResponse(res, 'Health declaration deleted successfully.', null, 204);
  });
});

module.exports = router;
