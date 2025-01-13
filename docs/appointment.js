/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management endpoints
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient_id:
 *                 type: integer
 *                 description: ID of the patient
 *               dentist_id:
 *                 type: integer
 *                 description: ID of the dentist
 *               appointment_date:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time of the appointment
 *               timeslot_id:
 *                 type: integer
 *                 description: ID of the timeslot
 *               service_list_id:
 *                 type: integer
 *                 description: ID of the service
 *             required:
 *               - patient_id
 *               - dentist_id
 *               - appointment_date
 *               - timeslot_id
 *               - service_list_id
 *     responses:
 *       201:
 *         description: Appointment created successfully
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Retrieve all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of appointments retrieved successfully
 */

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Retrieve an appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the appointment
 *     responses:
 *       200:
 *         description: Appointment retrieved successfully
 *       404:
 *         description: Appointment not found
 */

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient_id:
 *                 type: integer
 *               dentist_id:
 *                 type: integer
 *               appointment_date:
 *                 type: string
 *                 format: date-time
 *               timeslot_id:
 *                 type: integer
 *               service_list_id:
 *                 type: integer
 *             required:
 *               - patient_id
 *               - dentist_id
 *               - appointment_date
 *               - timeslot_id
 *               - service_list_id
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       404:
 *         description: Appointment not found
 */

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the appointment
 *     responses:
 *       204:
 *         description: Appointment deleted successfully
 *       404:
 *         description: Appointment not found
 */
