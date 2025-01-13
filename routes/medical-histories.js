const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database connection

// Get all medical histories
router.get('/medical-histories', (req, res) => {
    db.query('SELECT * FROM medical_histories', (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  });
  
  // Add a new medical history
  router.post('/medical-histories', (req, res) => {
    const { patientId, condition, symptoms, lastVisitDate, ongoingTreatment, medicationDetails, allergies, illnesses, action } = req.body;
    const sql = 'INSERT INTO medical_histories (patientId, condition, symptoms, lastVisitDate, ongoingTreatment, medicationDetails, allergies, illnesses, action) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [patientId, condition, symptoms, lastVisitDate, ongoingTreatment, medicationDetails, allergies, illnesses, action], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ id: result.insertId, patientId, condition, symptoms, lastVisitDate, ongoingTreatment, medicationDetails, allergies, illnesses, action });
      }
    });
  });
  
  // Update a medical history
  router.put('/medical-histories/:id', (req, res) => {
    const { id } = req.params;
    const { patientId, condition, symptoms, lastVisitDate, ongoingTreatment, medicationDetails, allergies, illnesses, action } = req.body;
    const sql = 'UPDATE medical_histories SET patientId = ?, condition = ?, symptoms = ?, lastVisitDate = ?, ongoingTreatment = ?, medicationDetails = ?, allergies = ?, illnesses = ?, action = ? WHERE id = ?';
    db.query(sql, [patientId, condition, symptoms, lastVisitDate, ongoingTreatment, medicationDetails, allergies, illnesses, action, id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Medical history updated successfully.' });
      }
    });
  });
  
  // Delete a medical history
  router.delete('/medical-histories/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM medical_histories WHERE id = ?', [id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Medical history deleted successfully.' });
      }
    });
  });

  module.exports = router; // Export the Router