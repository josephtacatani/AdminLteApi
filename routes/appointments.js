const express = require('express');
const db = require('../db'); // Database connection
const { verifyToken } = require('../middlewares/auth'); // JWT middleware
const { successResponse, errorResponse } = require('../utils/responseHelper'); // Envelope response helpers
const router = express.Router();

/**
 * ✅ Get all appointments
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
 * ✅ Get a specific appointment by ID
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
 * ✅ Create a new appointment (With Services and Transactions)
 */
router.post('/', verifyToken, async (req, res) => {
  let { patient_id, dentist_id, schedule_id, timeslot_id, status, appointment_type, service_list_id, health_declaration_id } = req.body;

  // ✅ Validate required fields
  if (!patient_id || !dentist_id || !schedule_id || !timeslot_id || !status || !appointment_type || !Array.isArray(service_list_id) || service_list_id.length === 0) {
    return errorResponse(res, 'Missing required fields or invalid service list.', null, 400);
  }

  try {
    await db.promise().beginTransaction(); // ✅ Start transaction

    // ✅ Step 1: Fetch latest health declaration if not provided
    if (!health_declaration_id) {
      const [healthResults] = await db.promise().query(
        `SELECT id FROM health_declarations WHERE patient_id = ? ORDER BY created_at DESC LIMIT 1`,
        [patient_id]
      );

      if (healthResults.length === 0) {
        await db.promise().rollback();
        return errorResponse(res, 'Health declaration is required before booking an appointment.', null, 400);
      }

      health_declaration_id = healthResults[0].id; // ✅ Automatically use the latest health declaration
    }

    // ✅ Step 2: Insert the appointment
    const appointmentSql = `
      INSERT INTO appointments (patient_id, dentist_id, schedule_id, timeslot_id, status, appointment_type, health_declaration_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [appointmentResult] = await db.promise().query(appointmentSql, [
      patient_id, dentist_id, schedule_id, timeslot_id, status, appointment_type, health_declaration_id
    ]);

    const appointmentId = appointmentResult.insertId;

    // ✅ Step 3: Insert multiple services into `appointment_services`
    const serviceSql = `INSERT INTO appointment_services (appointment_id, service_list_id) VALUES ?`;
    const serviceValues = service_list_id.map(serviceId => [appointmentId, serviceId]);

    await db.promise().query(serviceSql, [serviceValues]);

    // ✅ Step 4: Commit transaction
    await db.promise().commit();

    successResponse(res, 'Appointment created successfully.', { appointmentId });

  } catch (error) {
    await db.promise().rollback(); // 🔹 Rollback transaction on error
    errorResponse(res, 'Error creating appointment.', error.message, 500);
  }
});



/**
 * ✅ Update an appointment
 */
router.put('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { patient_id, dentist_id, schedule_id, timeslot_id, status, appointment_type } = req.body;

  if (!patient_id || !dentist_id || !schedule_id || !timeslot_id || !status || !appointment_type) {
    return errorResponse(res, 'Missing required fields.', null, 400);
  }

  const sql = `
    UPDATE appointments
    SET patient_id = ?, dentist_id = ?, schedule_id = ?, timeslot_id = ?, status = ?, appointment_type = ?
    WHERE id = ?
  `;
  db.query(sql, [patient_id, dentist_id, schedule_id, timeslot_id, status, appointment_type, id], (err, results) => {
    if (err) {
      return errorResponse(res, 'Error updating appointment.', err.message, 500);
    }
    if (results.affectedRows === 0) {
      return errorResponse(res, 'Appointment not found.', null, 404);
    }
    successResponse(res, 'Appointment updated successfully.', { appointmentId: id });
  });
});

/**
 * ✅ Delete an appointment
 */
router.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  db.beginTransaction(async (err) => {
    if (err) return errorResponse(res, 'Transaction start failed.', err.message, 500);

    try {
      // Delete services first to avoid foreign key constraint errors
      await db.promise().query('DELETE FROM appointment_services WHERE appointment_id = ?', [id]);

      // Delete the appointment
      const [results] = await db.promise().query('DELETE FROM appointments WHERE id = ?', [id]);

      if (results.affectedRows === 0) {
        return db.rollback(() => errorResponse(res, 'Appointment not found.', null, 404));
      }

      db.commit((commitErr) => {
        if (commitErr) {
          return db.rollback(() => errorResponse(res, 'Error committing transaction.', commitErr.message, 500));
        }
        successResponse(res, 'Appointment deleted successfully.', null);
      });

    } catch (error) {
      db.rollback(() => errorResponse(res, 'Error deleting appointment.', error.message, 500));
    }
  });
});

module.exports = router;
