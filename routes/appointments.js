const express = require('express');
const db = require('../db'); // Database connection
const { verifyToken } = require('../middlewares/auth'); // JWT middleware
const { successResponse, errorResponse } = require('../utils/responseHelper'); // Envelope response helpers
const router = express.Router();

/**
 * Get all appointments
 */
router.get('/', verifyToken, (req, res) => {
  db.query('SELECT * FROM appointments', (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching appointments.', err.message, 500);
    }
    if (results.length === 0) {
      return successResponse(res, 'No appointments found.', []);
    }
    successResponse(res, 'Appointments retrieved successfully.', results);
  });
});

/**
 * Get a specific appointment by ID
 */
router.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM appointments WHERE id = ?', [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error fetching appointment.', err.message, 500);
    }
    if (results.length === 0) {
      return errorResponse(res, 'Appointment not found.', null, 404);
    }
    successResponse(res, 'Appointment retrieved successfully.', results[0]);
  });
});

/**
 * Create a new appointment
 */
/**
 * Create a new appointment
 */
/**
 * Create a new appointment
 */
router.post('/', verifyToken, (req, res) => {
  const { patient_id, dentist_id, schedule_id, timeslot_id, status, appointment_type, service_list_id } = req.body;

  // Validate required fields
  if (!patient_id || !dentist_id || !schedule_id || !timeslot_id || !status || !appointment_type || !service_list_id) {
    return errorResponse(res, 'Missing required fields.', null, 400);
  }

  // Check if the patient has a health declaration
  const healthDeclarationQuery = 'SELECT id FROM health_declarations WHERE patient_id = ?';
  db.query(healthDeclarationQuery, [patient_id], (err, healthResults) => {
    if (err) {
      return errorResponse(res, 'Error checking health declaration.', err.message, 500);
    }

    if (healthResults.length === 0) {
      return errorResponse(res, 'Health declaration is required before booking an appointment.', null, 400);
    }

    const health_declaration_id = healthResults[0].id; // Extract the health declaration ID

    // Proceed to create the appointment
    const sql = `
      INSERT INTO appointments (patient_id, dentist_id, schedule_id, timeslot_id, status, appointment_type, service_list_id, health_declaration_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [patient_id, dentist_id, schedule_id, timeslot_id, status, appointment_type, service_list_id, health_declaration_id], (err, results) => {
      if (err) {
        return errorResponse(res, 'Error creating appointment.', err.message, 500);
      }

      // Return the created appointment ID
      successResponse(res, 'Appointment created successfully.', { id: results.insertId });
    });
  });
});



/**
 * Update an appointment
 */
router.put('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { patient_id, dentist_id, schedule_id, timeslot_id, status, appointment_type, service_list_id } = req.body;

  if (!patient_id || !dentist_id || !schedule_id || !timeslot_id || !status || !appointment_type || !service_list_id) {
    return errorResponse(res, 'Missing required fields.', null, 400);
  }

  const sql = `
    UPDATE appointments
    SET patient_id = ?, dentist_id = ?, schedule_id = ?, timeslot_id = ?, status = ?, appointment_type = ?, service_list_id = ?
    WHERE id = ?
  `;
  db.query(sql, [patient_id, dentist_id, schedule_id, timeslot_id, status, appointment_type, service_list_id, id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error updating appointment.', err.message, 500);
    }
    if (results.affectedRows === 0) {
      return errorResponse(res, 'Appointment not found.', null, 404);
    }
    successResponse(res, 'Appointment updated successfully.');
  });
});

/**
 * Delete an appointment
 */
router.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM appointments WHERE id = ?', [id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error deleting appointment.', err.message, 500);
    }

    if (results.affectedRows === 0) {
      return errorResponse(res, 'Appointment not found.', null, 404);
    }

    // Return a success message
    successResponse(res, 'Appointment deleted successfully.', null);
  });
});


module.exports = router;
