const express = require('express');
const db = require('../db');
const { verifyToken } = require('../middlewares/auth');
const router = express.Router();

/**
 * Get all services
 */
router.get('/', verifyToken, (req, res) => {
  db.query('SELECT * FROM serviceslist', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching services.', error: err.message });
    }
    res.status(200).json(results);
  });
});

/**
 * Get a specific service by ID
 */
router.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM serviceslist WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching service.', error: err.message });
    } else if (results.length === 0) {
      return res.status(404).json({ message: 'Service not found.' });
    }
    res.status(200).json(results[0]);
  });
});

/**
 * Create a new service
 */
router.post('/', verifyToken, (req, res) => {
  const { service_name, title, content, photo } = req.body;

  const sql = 'INSERT INTO serviceslist (service_name, title, content, photo) VALUES (?, ?, ?, ?)';
  db.query(sql, [service_name, title, content, photo], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating service.', error: err.message });
    }
    res.status(201).json({
      message: 'Service created successfully.',
      data: { id: results.insertId, service_name, title, content, photo },
    });
  });
});

/**
 * Update a service
 */
router.put('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { service_name, title, content, photo } = req.body;

  const sql = 'UPDATE serviceslist SET service_name = ?, title = ?, content = ?, photo = ? WHERE id = ?';
  db.query(sql, [service_name, title, content, photo, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating service.', error: err.message });
    } else if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Service not found.' });
    }
    res.status(200).json({ message: 'Service updated successfully.' });
  });
});

/**
 * Delete a service
 */
router.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM serviceslist WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting service.', error: err.message });
    } else if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Service not found.' });
    }
    res.status(204).send(); // No content
  });
});

module.exports = router;
