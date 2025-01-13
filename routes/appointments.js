const express = require('express');
const db = require('../db'); // Import database connection
const router = express.Router();

// Create a new appointment
router.post('/', (req, res) => {
  const { patient_id, dentist_id, appointment_date, timeslot_id, service_list_id } = req.body;

  if (!patient_id || !dentist_id || !appointment_date || !timeslot_id || !service_list_id) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const sql = `
    INSERT INTO appointments (patient_id, dentist_id, appointment_date, timeslot_id, service_list_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [patient_id, dentist_id, appointment_date, timeslot_id, service_list_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: 'Appointment created successfully.',
      data: { appointment_id: results.insertId, patient_id, dentist_id, appointment_date, timeslot_id, service_list_id },
    });
  });
});

// Read all appointments
router.get('/', (req, res) => {
  db.query('SELECT * FROM appointments', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json({
      message: 'Appointments retrieved successfully.',
      data: results,
    });
  });
});

// Read a specific appointment by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM appointments WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    res.status(200).json({
      message: 'Appointment retrieved successfully.',
      data: results[0],
    });
  });
});

// Update an appointment
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { patient_id, dentist_id, appointment_date, timeslot_id, service_list_id } = req.body;

  if (!patient_id || !dentist_id || !appointment_date || !timeslot_id || !service_list_id) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const sql = `
    UPDATE appointments
    SET patient_id = ?, dentist_id = ?, appointment_date = ?, timeslot_id = ?, service_list_id = ?
    WHERE id = ?
  `;

  db.query(sql, [patient_id, dentist_id, appointment_date, timeslot_id, service_list_id, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    res.status(200).json({ message: 'Appointment updated successfully.' });
  });
});

// Delete an appointment
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM appointments WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    res.status(204).send(); // No content response
  });
});

module.exports = router;
