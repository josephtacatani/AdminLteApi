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
 *     summary: Update an existing appointment
 *     description: Updates an appointment, including patient, dentist, schedule, timeslot, and associated services. Uses transactions to ensure data integrity.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the appointment to update.
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
 *                 description: The ID of the patient linked to the appointment.
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
 *                 description: The ID of the selected timeslot.
 *                 example: 109
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, canceled]
 *                 description: The status of the appointment.
 *                 example: confirmed
 *               appointment_type:
 *                 type: string
 *                 enum: [online, walk_in]
 *                 description: The type of appointment.
 *                 example: online
 *               service_list_id:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: A list of service IDs associated with the appointment.
 *                 example: [1, 2, 3]

 *     responses:
 *       200:
 *         description: Appointment updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Appointment updated successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     appointmentId:
 *                       type: integer
 *                       example: 31
 *       400:
 *         description: Missing required fields or invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required fields or invalid service list."
 *                 error:
 *                   type: string
 *                   example: null
 *       404:
 *         description: Appointment not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Appointment not found."
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
 *                   example: "Error updating appointment."
 *                 error:
 *                   type: string
 *                   example: "Database connection lost."
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

/**
 * @swagger
 * /appointments/by-patient/{patient_id}:
 *   get:
 *     summary: Retrieve an appointment by Patient ID
 *     description: Fetches the most recent appointment for a specific patient based on their ID.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patient_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the patient whose appointment is being retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved the appointment.
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
 *         description: No appointment found for the given patient ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No appointment found for this patient."
 *                 error:
 *                   type: string
 *                   example: null
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
 *                   example: "Error fetching appointment by patient ID."
 *                 error:
 *                   type: string
 *                   example: "Database connection error."
 */

/**
 * @swagger
 * /appointments/cancel/{appointment_id}:
 *   patch:
 *     summary: Cancel an appointment
 *     description: Marks an existing appointment as canceled, making the associated timeslot available again.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointment_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the appointment to cancel.
 *     responses:
 *       200:
 *         description: Appointment canceled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Appointment canceled successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     appointment_id:
 *                       type: integer
 *                       example: 32
 *                     status:
 *                       type: string
 *                       example: "canceled"
 *       400:
 *         description: Bad request - missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid appointment ID."
 *                 error:
 *                   type: string
 *                   example: null
 *       404:
 *         description: Appointment not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Appointment not found."
 *                 error:
 *                   type: string
 *                   example: null
 *       500:
 *         description: Server error while canceling appointment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error canceling appointment."
 *                 error:
 *                   type: string
 *                   example: "Database connection issue."
 */


