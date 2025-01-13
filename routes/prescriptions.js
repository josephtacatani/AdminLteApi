const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database connection

// Get all prescriptions
router.get('/prescriptions', (req, res) => {
    db.query('SELECT * FROM prescriptions', (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  });
  
  // Add a new prescription
  router.post('/prescriptions', (req, res) => {
    const { patientId, date, medicine, notes } = req.body;
    const sql = 'INSERT INTO prescriptions (patientId, date, medicine, notes) VALUES (?, ?, ?, ?)';
    db.query(sql, [patientId, date, medicine, notes], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ id: result.insertId, patientId, date, medicine, notes });
      }
    });
  });
  
  // Update a prescription
  router.put('/prescriptions/:id', (req, res) => {
    const { id } = req.params;
    const { patientId, date, medicine, notes } = req.body;
    const sql = 'UPDATE prescriptions SET patientId = ?, date = ?, medicine = ?, notes = ? WHERE id = ?';
    db.query(sql, [patientId, date, medicine, notes, id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Prescription updated successfully.' });
      }
    });
  });
  
  // Delete a prescription
  router.delete('/prescriptions/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM prescriptions WHERE id = ?', [id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Prescription deleted successfully.' });
      }
    });
  });

  module.exports = router; // Export the Router