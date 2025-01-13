const express = require('express');
const db = require('../db');
const { verifyToken, verifyRole } = require('../middlewares/auth');
const router = express.Router();

// Get all schedules (Admins and Dentists only)
router.get('/', verifyToken, verifyRole('admin', 'dentist'), (req, res) => {
  db.query('SELECT * FROM schedules', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching schedules.', error: err.message });
    }
    res.status(200).json(results);
  });
});

// Get a specific schedule by ID (Admins and Dentists only)
router.get('/:id', verifyToken, verifyRole('admin', 'dentist'), (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM schedules WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching schedule.', error: err.message });
    } else if (results.length === 0) {
      return res.status(404).json({ message: 'Schedule not found.' });
    }
    res.status(200).json(results[0]);
  });
});

// Create a new schedule (Admins only)
router.post('/', verifyToken, verifyRole('admin'), (req, res) => {
  const { dentist_id, appointment_date, timeslot_id, patient_id } = req.body;

  const sql = `INSERT INTO schedules (dentist_id, appointment_date, timeslot_id, patient_id) VALUES (?, ?, ?, ?)`;
  db.query(sql, [dentist_id, appointment_date, timeslot_id, patient_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating schedule.', error: err.message });
    }
    res.status(201).json({
      message: 'Schedule created successfully.',
      data: { id: results.insertId, dentist_id, appointment_date, timeslot_id, patient_id },
    });
  });
});

// Update a schedule (Admins only)
router.put('/:id', verifyToken, verifyRole('admin'), (req, res) => {
  const { id } = req.params;
  const { dentist_id, appointment_date, timeslot_id, patient_id } = req.body;

  const sql = `UPDATE schedules SET dentist_id = ?, appointment_date = ?, timeslot_id = ?, patient_id = ? WHERE id = ?`;
  db.query(sql, [dentist_id, appointment_date, timeslot_id, patient_id, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating schedule.', error: err.message });
    } else if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Schedule not found.' });
    }
    res.status(200).json({ message: 'Schedule updated successfully.' });
  });
});

// Delete a schedule (Admins only)
router.delete('/:id', verifyToken, verifyRole('admin'), (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM schedules WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting schedule.', error: err.message });
    } else if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Schedule not found.' });
    }
    res.status(204).send(); // No content
  });
});

module.exports = router;
