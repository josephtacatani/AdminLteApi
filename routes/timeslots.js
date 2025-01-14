const express = require('express');
const db = require('../db');
const { verifyToken } = require('../middlewares/auth');
const { successResponse, errorResponse } = require('../utils/responseHelper');
const router = express.Router();

/**
 * Get available timeslots by schedule ID
 */
router.get('/available/:schedule_id', verifyToken, (req, res) => {
  const { schedule_id } = req.params;

  const sql = `
    SELECT t.id, t.schedule_id, t.start_time, t.end_time, t.created_at, t.updated_at
    FROM timeslots t
    LEFT JOIN appointments a ON t.id = a.timeslot_id
    WHERE a.timeslot_id IS NULL
      AND t.schedule_id = ?;
  `;

  db.query(sql, [schedule_id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching available timeslots.', err.message, 500);
    }

    if (results.length === 0) {
      return successResponse(res, 'No available timeslots found for the given schedule ID.', []);
    }

    successResponse(res, 'Available timeslots retrieved successfully.', results);
  });
});

module.exports = router;
