const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database connection

// Get all treatments
router.get('/treatments', (req, res) => {
  db.query('SELECT * FROM treatments', (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Add a new treatment
router.post('/treatments', (req, res) => {
  const { patientId, dateVisit, teethNos, treatment, description, fees, remarks } = req.body;
  const sql = 'INSERT INTO treatments (patientId, dateVisit, teethNos, treatment, description, fees, remarks) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [patientId, dateVisit, teethNos, treatment, description, fees, remarks], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ id: result.insertId, patientId, dateVisit, teethNos, treatment, description, fees, remarks });
    }
  });
});

// Update a treatment
router.put('/treatments/:id', (req, res) => {
  const { id } = req.params;
  const { patientId, dateVisit, teethNos, treatment, description, fees, remarks } = req.body;
  const sql = 'UPDATE treatments SET patientId = ?, dateVisit = ?, teethNos = ?, treatment = ?, description = ?, fees = ?, remarks = ? WHERE id = ?';
  db.query(sql, [patientId, dateVisit, teethNos, treatment, description, fees, remarks, id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: 'Treatment updated successfully.' });
    }
  });
});

// Delete a treatment
router.delete('/treatments/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM treatments WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: 'Treatment deleted successfully.' });
    }
  });
});

module.exports = router; // Export the Router