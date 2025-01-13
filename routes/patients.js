const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password, fullname, address, gender, birthday, contact_number } = req.body;

    if (!email || !password || !fullname || !address || !gender || !birthday || !contact_number) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `
            INSERT INTO patients (email, password, fullname, address, gender, birthday, contact_number, email_verified)
            VALUES (?, ?, ?, ?, ?, ?, ?, 0)
        `;

        db.query(
            sql,
            [email, hashedPassword, fullname, address, gender, birthday, contact_number],
            (err, results) => {
                if (err) return res.status(500).json({ message: 'Registration failed.', error: err.message });

                res.status(201).json({
                    message: 'Registration successful. Please verify your email.',
                    data: { id: results.insertId, email, fullname, address, gender, birthday, contact_number },
                });
            }
        );
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during registration.', error: error.message });
    }
});

router.post('/appointments', (req, res) => {
  const { patient_id, dentist_id, appointment_date, timeslot_id, service_list_id } = req.body;

  if (!patient_id || !dentist_id || !appointment_date || !timeslot_id || !service_list_id) {
      return res.status(400).json({ message: 'All fields are required.' });
  }

  const sql = `
      INSERT INTO appointments (patient_id, dentist_id, appointment_date, timeslot_id, service_list_id)
      VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
      sql,
      [patient_id, dentist_id, appointment_date, timeslot_id, service_list_id],
      (err, results) => {
          if (err) return res.status(500).json({ message: 'Failed to book appointment.', error: err.message });

          res.status(201).json({ message: 'Appointment booked successfully.', appointment_id: results.insertId });
      }
  );
});

router.get('/appointments/:patient_id', (req, res) => {
  const { patient_id } = req.params;

  if (!patient_id) return res.status(400).json({ message: 'Patient ID is required.' });

  const sql = `
      SELECT * FROM appointments
      WHERE patient_id = ?
  `;

  db.query(sql, [patient_id], (err, results) => {
      if (err) return res.status(500).json({ message: 'Failed to retrieve appointments.', error: err.message });

      res.status(200).json({ message: 'Appointments retrieved successfully.', data: results });
  });
});

router.get('/histories/:patient_id', (req, res) => {
  const { patient_id } = req.params;

  if (!patient_id) return res.status(400).json({ message: 'Patient ID is required.' });

  const sql = `
      SELECT dental_histories, medical_histories
      FROM patients
      WHERE id = ?
  `;

  db.query(sql, [patient_id], (err, results) => {
      if (err) return res.status(500).json({ message: 'Failed to retrieve histories.', error: err.message });

      res.status(200).json({ message: 'Histories retrieved successfully.', data: results[0] });
  });
});


module.exports = router;
