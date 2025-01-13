const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database connection

// Get all dental histories
router.get('/dental-histories', (req, res) => {
    db.query('SELECT * FROM dental_histories', (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  });
  
  // Add a new dental history
  router.post('/dental-histories', (req, res) => {
    const { patientId, previousDentist, lastDentalVisit, action } = req.body;
    const sql = 'INSERT INTO dental_histories (patientId, previousDentist, lastDentalVisit, action) VALUES (?, ?, ?, ?)';
    db.query(sql, [patientId, previousDentist, lastDentalVisit, action], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ id: result.insertId, patientId, previousDentist, lastDentalVisit, action });
      }
    });
  });
  
  // Update a dental history
  router.put('/dental-histories/:id', (req, res) => {
    const { id } = req.params;
    const { patientId, previousDentist, lastDentalVisit, action } = req.body;
    const sql = 'UPDATE dental_histories SET patientId = ?, previousDentist = ?, lastDentalVisit = ?, action = ? WHERE id = ?';
    db.query(sql, [patientId, previousDentist, lastDentalVisit, action, id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Dental history updated successfully.' });
      }
    });
  });
  
  // Delete a dental history
  router.delete('/dental-histories/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM dental_histories WHERE id = ?', [id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Dental history deleted successfully.' });
      }
    });
  });

  module.exports = router; // Export the Router