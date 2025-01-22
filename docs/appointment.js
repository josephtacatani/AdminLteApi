/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       description: Details of an appointment.
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the appointment.
 *           example: 1
 *         patient_id:
 *           type: integer
 *           description: The unique identifier of the patient.
 *           example: 48
 *         dentist_id:
 *           type: integer
 *           description: The unique identifier of the assigned dentist.
 *           example: 39
 *         schedule_id:
 *           type: integer
 *           description: The ID of the selected schedule.
 *           example: 28
 *         timeslot_id:
 *           type: integer
 *           description: The ID of the selected time slot.
 *           example: 109
 *         status:
 *           type: string
 *           enum: [pending, confirmed, canceled]
 *           description: The current status of the appointment.
 *           example: pending
 *         appointment_type:
 *           type: string
 *           enum: [online, walk_in]
 *           description: The type of appointment.
 *           example: online
 *         health_declaration_id:
 *           type: integer
 *           nullable: true
 *           description: (Optional) The health declaration ID required before booking. If not provided, the system will fetch the latest one. If no record exists, the request will be rejected.
 *           example: 5
 *     AppointmentService:
 *       type: object
 *       description: Services linked to an appointment.
 *       properties:
 *         appointment_id:
 *           type: integer
 *           description: The ID of the associated appointment.
 *           example: 1
 *         service_list_id:
 *           type: integer
 *           description: The ID of the selected service.
 *           example: 3
 */

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: API endpoints for managing appointments.
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Retrieve all appointments
 *     description: Fetches a list of all scheduled appointments.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all appointments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Appointments retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appointment'
 *       401:
 *         description: Unauthorized access - Token required.
 */

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Retrieve a specific appointment by ID
 *     description: Fetches details of an appointment based on the provided ID.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the requested appointment.
 *     responses:
 *       200:
 *         description: Successfully retrieved the appointment details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Appointment retrieved successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found.
 *       401:
 *         description: Unauthorized access - Token required.
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     description: Schedules a new appointment with a dentist and selected services.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patient_id
 *               - dentist_id
 *               - schedule_id
 *               - timeslot_id
 *               - status
 *               - appointment_type
 *               - service_list_id
 *             properties:
 *               patient_id:
 *                 type: integer
 *                 description: The ID of the patient booking the appointment.
 *                 example: 31
 *               dentist_id:
 *                 type: integer
 *                 description: The ID of the assigned dentist.
 *                 example: 39
 *               schedule_id:
 *                 type: integer
 *                 description: The ID of the selected schedule.
 *                 example: 28
 *               timeslot_id:
 *                 type: integer
 *                 description: The ID of the selected time slot.
 *                 example: 109
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, canceled]
 *                 description: The status of the appointment.
 *                 example: pending
 *               appointment_type:
 *                 type: string
 *                 enum: [online, walk_in]
 *                 description: The type of appointment.
 *                 example: online
 *               service_list_id:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: List of selected service IDs for the appointment.
 *                 example: [1, 2, 3]
 *               health_declaration_id:
 *                 type: integer
 *                 nullable: true
 *                 description: (Optional) If not provided, the system fetches the latest one for the patient. If no record exists, the request is rejected.
 *                 example: 5
 *     responses:
 *       201:
 *         description: Appointment successfully created.
 *       400:
 *         description: Bad Request - Missing required fields or health declaration not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required fields or health declaration is required before booking an appointment."
 *                 error:
 *                   type: string
 *                   example: "service_list_id must be an array with at least one service."
 *       401:
 *         description: Unauthorized access - Token required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error creating appointment."
 *                 error:
 *                   type: string
 *                   example: "Database connection lost."
 */


/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update an appointment
 *     description: Updates the status of an existing appointment.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the appointment to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, canceled]
 *                 description: Updated status of the appointment.
 *                 example: confirmed
 *     responses:
 *       200:
 *         description: Successfully updated appointment.
 *       404:
 *         description: Appointment not found.
 *       401:
 *         description: Unauthorized access - Token required.
 */

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Remove an appointment
 *     description: Deletes an appointment from the system.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the appointment to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted appointment.
 *       404:
 *         description: Appointment not found.
 *       401:
 *         description: Unauthorized access - Token required.
 */
