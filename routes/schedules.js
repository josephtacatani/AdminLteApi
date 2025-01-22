const express = require('express');
const db = require('../db');
const { verifyToken, verifyRole } = require('../middlewares/auth');
const { successResponse, errorResponse } = require('../utils/responseHelper');
const router = express.Router();

/**
 * Get all schedules (Token required, no role restrictions)
 */
router.get('/', verifyToken, (req, res) => {
  const sql = `
    SELECT schedules.id, dentists.id AS dentist_id, schedules.date, schedules.start_time, schedules.end_time, schedules.created_at, schedules.updated_at
    FROM schedules
    INNER JOIN dentists ON schedules.dentist_id = dentists.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching schedules.', err.message, 500);
    }
    successResponse(res, 'Schedules retrieved successfully.', results);
  });
});

/**
 * Get a specific schedule by ID (Token required, no role restrictions)
 */
router.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT schedules.id, dentists.id AS dentist_id, schedules.date, schedules.start_time, schedules.end_time, schedules.created_at, schedules.updated_at
    FROM schedules
    INNER JOIN dentists ON schedules.dentist_id = dentists.id
    WHERE schedules.id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching schedule.', err.message, 500);
    }
    if (results.length === 0) {
      return errorResponse(res, 'Schedule not found.', null, 404);
    }
    successResponse(res, 'Schedule retrieved successfully.', results[0]);
  });
});

/**
 * Create a new schedule (Token and Dentist role required)
 */
router.post('/', verifyToken, verifyRole('dentist', 'admin'), (req, res) => {
  const { dentist_id, date, start_time, end_time } = req.body;

  if (!dentist_id || !date || !start_time || !end_time) {
    return errorResponse(res, 'Missing required fields.', 'Validation Error', 400);
  }

  const sql = `
    INSERT INTO schedules (dentist_id, date, start_time, end_time)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [dentist_id, date, start_time, end_time], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error creating schedule.', err.message, 500);
    }
    successResponse(res, 'Schedule created successfully.', {
      id: results.insertId,
      dentist_id,
      date,
      start_time,
      end_time,
    });
  });
});

/**
 * Delete a schedule (Token and Dentist role required)
 */
router.delete('/:id', verifyToken, verifyRole('dentist', 'admin'), (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM schedules WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error deleting schedule.', err.message, 500);
    }
    if (results.affectedRows === 0) {
      return errorResponse(res, 'Schedule not found.', null, 404);
    }
    successResponse(res, 'Schedule deleted successfully.', null);
  });
});

/**
 * Get schedules by dentist ID (Token required, no role restrictions)
 */
router.get('/dentist/:dentistId', verifyToken, (req, res) => {
  const { dentistId } = req.params;

  const sql = `
    SELECT schedules.id, schedules.date, schedules.start_time, schedules.end_time, schedules.created_at, schedules.updated_at
    FROM schedules
    WHERE schedules.dentist_id = ?
  `;

  db.query(sql, [dentistId], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching schedules for dentist.', err.message, 500);
    }
    if (results.length === 0) {
      return successResponse(res, 'No schedules found for this dentist.', []);
    }
    successResponse(res, 'Schedules retrieved successfully.', results);
  });
});

module.exports = router;
