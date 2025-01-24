const express = require('express');
const db = require('../db');
const { verifyToken, verifyRole } = require('../middlewares/auth');
const { successResponse, errorResponse } = require('../utils/responseHelper');

const router = express.Router();

/**
 * Get all schedules (Token required, no role restrictions)
 */
router.get('/', verifyToken, (req, res) => {
  const sql = `SELECT id, dentist_id, date, start_time, end_time, created_at, updated_at FROM schedules`;

  db.query(sql, (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching schedules.', null, err.message, 500);
    }
    successResponse(res, 'Schedules retrieved successfully.', results, null);
  });
});

/**
 * Get a specific schedule by ID (Token required, no role restrictions)
 */
router.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return errorResponse(res, 'Invalid schedule ID.', null, 'Validation Error', 400);
  }

  const sql = `SELECT * FROM schedules WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching schedule.', null, err.message, 500);
    }
    if (results.length === 0) {
      return errorResponse(res, 'Schedule not found.', null, null, 404);
    }
    successResponse(res, 'Schedule retrieved successfully.', results[0], null);
  });
});

/**
 * Create a new schedule with transactional timeslot generation
 */
router.post('/', verifyToken, verifyRole('dentist', 'admin'), (req, res) => {
  const { dentist_id, date, start_time, end_time } = req.body;

  // ✅ Validate required fields
  if (!dentist_id || !date || !start_time || !end_time) {
    return errorResponse(res, 'Missing required fields.', null, 400);
  }

  db.beginTransaction((err) => {
    if (err) {
      return errorResponse(res, 'Failed to start transaction.', err.message, 500);
    }

    // ✅ Step 1: Check if the dentist exists
    db.query(`SELECT id FROM dentists WHERE id = ?`, [dentist_id], (err, dentistCheck) => {
      if (err) {
        db.rollback(() => {});
        return errorResponse(res, 'Error checking dentist.', err.message, 500);
      }

      if (dentistCheck.length === 0) {
        db.rollback(() => {});
        return errorResponse(res, 'Invalid dentist ID.', null, 400);
      }

      // ✅ Step 2: Insert Schedule
      db.query(
        `INSERT INTO schedules (dentist_id, date, start_time, end_time) VALUES (?, ?, ?, ?)`,
        [dentist_id, date, start_time, end_time],
        (err, scheduleResult) => {
          if (err) {
            db.rollback(() => {});
            return errorResponse(res, 'Error inserting schedule.', err.message, 500);
          }

          const schedule_id = scheduleResult.insertId;

          // ✅ Step 3: Generate Timeslots with Proper Time Format
          let currentTime = start_time;
          const timeslots = [];
          const intervalMinutes = 60;
          const breakStartTime = '12:00:00';
          const breakEndTime = '13:00:00';

          while (currentTime < end_time) {
            if (currentTime >= breakStartTime && currentTime < breakEndTime) {
              currentTime = breakEndTime;
            } else {
              let nextTime = new Date(`1970-01-01T${currentTime}Z`);
              nextTime.setMinutes(nextTime.getMinutes() + intervalMinutes);

              let formattedEndTime = nextTime.toISOString().substr(11, 8); // ✅ Converts to "HH:MM:SS"

              timeslots.push([schedule_id, currentTime, formattedEndTime]);

              currentTime = formattedEndTime; // ✅ Use properly formatted time for next iteration
            }
          }

          if (timeslots.length > 0) {
            db.query(
              `INSERT INTO timeslots (schedule_id, start_time, end_time) VALUES ?`,
              [timeslots],
              (err) => {
                if (err) {
                  db.rollback(() => {});
                  return errorResponse(res, 'Error inserting timeslots.', err.message, 500);
                }

                // ✅ Step 4: Commit transaction
                db.commit((err) => {
                  if (err) {
                    db.rollback(() => {});
                    return errorResponse(res, 'Error committing transaction.', err.message, 500);
                  }

                  successResponse(res, 'Schedule and timeslots created successfully.', {
                    schedule_id,
                    dentist_id,
                    date,
                    start_time,
                    end_time,
                  });
                });
              }
            );
          } else {
            db.rollback(() => {});
            return errorResponse(res, 'No valid timeslots generated.', null, 400);
          }
        }
      );
    });
  });
});

/**
 * Delete a schedule (Token and Dentist role required)
 */
router.delete('/:id', verifyToken, verifyRole('dentist', 'admin'), (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return errorResponse(res, 'Invalid schedule ID.', null, 'Validation Error', 400);
  }

  const sql = `DELETE FROM schedules WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error deleting schedule.', null, err.message, 500);
    }
    if (results.affectedRows === 0) {
      return errorResponse(res, 'Schedule not found.', null, null, 404);
    }
    successResponse(res, 'Schedule and associated timeslots deleted successfully.', { deleted_schedule_id: id }, null);
  });
});

/**
 * Get schedules by dentist ID (Token required, no role restrictions)
 */
router.get('/dentist/:dentistId', verifyToken, (req, res) => {
  const { dentistId } = req.params;

  if (isNaN(dentistId)) {
    return errorResponse(res, 'Invalid dentist ID.', null, 'Validation Error', 400);
  }

  const sql = `
    SELECT schedules.id, schedules.date, schedules.start_time, schedules.end_time, schedules.created_at, schedules.updated_at
    FROM schedules
    WHERE schedules.dentist_id = ?;
  `;

  db.query(sql, [dentistId], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching schedules for dentist.', null, err.message, 500);
    }
    successResponse(res, 'Schedules retrieved successfully.', results, null);
  });
});

router.get('/confirmed/:schedule_id', verifyToken, (req, res) => {
  const { schedule_id } = req.params;

  if (isNaN(schedule_id)) {
      return errorResponse(res, 'Invalid schedule ID.', null, 'Validation Error', 400);
  }

  const sql = `
      SELECT timeslots.id, timeslots.schedule_id, timeslots.start_time, timeslots.end_time, appointments.status 
      FROM timeslots 
      JOIN appointments ON timeslots.id = appointments.timeslot_id
      WHERE timeslots.schedule_id = ? AND appointments.status = 'confirmed';
  `;

  db.query(sql, [schedule_id], (err, results) => {
      if (err) {
          return errorResponse(res, 'Error fetching confirmed timeslots.', null, err.message, 500);
      }
      successResponse(res, 'Confirmed timeslots retrieved successfully.', results, null);
  });
});

module.exports = router;
