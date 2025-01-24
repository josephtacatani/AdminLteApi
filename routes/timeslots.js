const express = require('express');
const db = require('../db');
const { verifyToken } = require('../middlewares/auth');
const { successResponse, errorResponse } = require('../utils/responseHelper');

const router = express.Router();

/**
 * Get all timeslots
 */
router.get('/all', verifyToken, (req, res) => {
  const sql = `
    SELECT id, schedule_id, start_time, end_time, created_at, updated_at
    FROM timeslots;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching all timeslots.', err.message, 500);
    }

    successResponse(res, results.length ? 'All timeslots retrieved successfully.' : 'No timeslots found.', results);
  });
});

/**
 * Get available timeslots by schedule ID
 */
router.get('/available/:schedule_id', verifyToken, (req, res) => {
  const { schedule_id } = req.params;

  const sql = `
    SELECT t.id, t.schedule_id, t.start_time, t.end_time, t.created_at, t.updated_at
    FROM timeslots t
    LEFT JOIN appointments a ON t.id = a.timeslot_id AND a.status != 'canceled'  -- Exclude canceled appointments
    WHERE a.timeslot_id IS NULL AND t.schedule_id = ?;
  `;

  db.query(sql, [schedule_id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching available timeslots.', err.message, 500);
    }

    successResponse(res, results.length ? 'Available timeslots retrieved successfully.' : 'No available timeslots found.', results);
  });
});


/**
 * Get all timeslots by schedule ID (Includes booked & available)
 */
router.get('/all/:schedule_id', verifyToken, (req, res) => {
  const { schedule_id } = req.params;

  const sql = `
    SELECT id, schedule_id, start_time, end_time, created_at, updated_at
    FROM timeslots
    WHERE schedule_id = ?;
  `;

  db.query(sql, [schedule_id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching timeslots by schedule ID.', err.message, 500);
    }

    successResponse(res, results.length ? 'All timeslots retrieved successfully for the given schedule ID.' : 'No timeslots found for the given schedule ID.', results);
  });
});

/**
 * Get a single timeslot by ID
 */
router.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT id, schedule_id, start_time, end_time, created_at, updated_at
    FROM timeslots
    WHERE id = ?;
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching the timeslot.', err.message, 500);
    }

    if (results.length === 0) {
      return errorResponse(res, 'Timeslot not found.', 'No timeslot found with the given ID.', 404);
    }

    successResponse(res, 'Timeslot retrieved successfully.', results[0]);
  });
});


module.exports = router;
