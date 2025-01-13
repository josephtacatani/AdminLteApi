const express = require('express');
const db = require('../db');
const { verifyToken, verifyRole } = require('../middlewares/auth');
const router = express.Router();

// Get all schedules (Token required, no role restrictions)
router.get('/', verifyToken, (req, res) => {
  const sql = `
    SELECT schedules.id, dentists.id AS dentist_id, schedules.date, schedules.start_time, schedules.end_time, schedules.created_at, schedules.updated_at
    FROM schedules
    INNER JOIN dentists ON schedules.dentist_id = dentists.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching schedules.', error: err.message });
    }
    res.status(200).json(results);
  });
});

// Get a specific schedule by ID (Token required, no role restrictions)
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
      return res.status(500).json({ message: 'Error fetching schedule.', error: err.message });
    } else if (results.length === 0) {
      return res.status(404).json({ message: 'Schedule not found.' });
    }
    res.status(200).json(results[0]);
  });
});

// Create a new schedule (Token and Dentist role required)
router.post('/', verifyToken, verifyRole('dentist', 'admin'), (req, res) => {
  const { dentist_id, date, start_time, end_time } = req.body;

  const sql = `
    INSERT INTO schedules (dentist_id, date, start_time, end_time)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [dentist_id, date, start_time, end_time], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating schedule.', error: err.message });
    }
    res.status(201).json({
      message: 'Schedule created successfully.',
      data: {
        id: results.insertId,
        dentist_id,
        date,
        start_time,
        end_time,
      },
    });
  });
});

// Update a schedule (Token and Dentist role required)
router.put('/:id', verifyToken, verifyRole('dentist', 'admin'), (req, res) => {
  const { id } = req.params;
  const { dentist_id, date, start_time, end_time } = req.body;

  const sql = `
    UPDATE schedules
    SET dentist_id = ?, date = ?, start_time = ?, end_time = ?
    WHERE id = ?
  `;

  db.query(sql, [dentist_id, date, start_time, end_time, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating schedule.', error: err.message });
    } else if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Schedule not found.' });
    }
    res.status(200).json({ message: 'Schedule updated successfully.' });
  });
});

// Delete a schedule (Token and Dentist role required)
router.delete('/:id', verifyToken, verifyRole('dentist', 'admin'), (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM schedules WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting schedule.', error: err.message });
    } else if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Schedule not found.' });
    }
    res.status(204).send(); // No content
  });
});

module.exports = router;
