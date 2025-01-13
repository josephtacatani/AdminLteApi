const express = require('express');
const router = express.Router();
const moment = require('moment');
const db = require('../db'); // Import your database connection
const { body, validationResult } = require('express-validator');

// Get all schedules
router.get('/', (req, res) => {
  db.query('SELECT * FROM schedules', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
    res.json(results);
  });
});

// Add a new schedule
router.post(
  '/',
  [
    body('date').isDate().withMessage('Invalid date'),
    body('dentistId').isInt().withMessage('Dentist ID must be an integer'),
    body('startTime').notEmpty().withMessage('Start time is required'),
    body('endTime').notEmpty().withMessage('End time is required'),
    body('duration').isInt().withMessage('Duration must be an integer'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { date, dentistId, startTime, endTime, duration } = req.body;

    // Convert startTime and endTime to 24-hour format
    const formattedStartTime = moment(startTime, ['h:mm A']).format('HH:mm:ss');
    const formattedEndTime = moment(endTime, ['h:mm A']).format('HH:mm:ss');

    const sql = 'INSERT INTO schedules (date, dentistId, startTime, endTime, duration) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [date, dentistId, formattedStartTime, formattedEndTime, duration], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error', details: err.message });
      }
      res.status(201).json({ id: result.insertId, date, dentistId, startTime: formattedStartTime, endTime: formattedEndTime, duration });
    });
  }
);

// Update a schedule
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { date, dentistId, startTime, endTime, duration } = req.body;

  const sql = 'UPDATE schedules SET date = ?, dentistId = ?, startTime = ?, endTime = ?, duration = ? WHERE id = ?';
  db.query(sql, [date, dentistId, startTime, endTime, duration, id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
    res.json({ message: 'Schedule updated successfully.' });
  });
});

// Delete a schedule
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM schedules WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
    res.json({ message: 'Schedule deleted successfully.' });
  });
});

module.exports = router;