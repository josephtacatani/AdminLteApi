const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database connection

// Get all routerointments
router.get('/routerointments', (req, res) => {
    db.query('SELECT * FROM routerointments', (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  });
  
  // Add a new routerointment
  router.post('/routerointments', (req, res) => {
    const { patientId, date, time, doctor, status } = req.body;
    const sql = 'INSERT INTO routerointments (patientId, date, time, doctor, status) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [patientId, date, time, doctor, status], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ id: result.insertId, patientId, date, time, doctor, status });
      }
    });
  });
  
  // Update an routerointment
  router.put('/routerointments/:id', (req, res) => {
    const { id } = req.params;
    const { patientId, date, time, doctor, status } = req.body;
    const sql = 'UPDATE routerointments SET patientId = ?, date = ?, time = ?, doctor = ?, status = ? WHERE id = ?';
    db.query(sql, [patientId, date, time, doctor, status, id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'routerointment updated successfully.' });
      }
    });
  });
  
  // Delete an routerointment
  router.delete('/routerointments/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM routerointments WHERE id = ?', [id], (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'routerointment deleted successfully.' });
      }
    });
  });

  module.exports = router; // Export the Router