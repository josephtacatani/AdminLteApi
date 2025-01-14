/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the appointment (auto-generated)
 *           example: 1
 *         patient_id:
 *           type: integer
 *           description: ID of the patient
 *           example: 5
 *         dentist_id:
 *           type: integer
 *           description: ID of the dentist
 *           example: 2
 *         schedule_id:
 *           type: integer
 *           description: ID of the schedule (includes date and timeslot)
 *           example: 10
 *         timeslot_id:
 *           type: integer
 *           description: ID of the timeslot
 *           example: 3
 *         status:
 *           type: string
 *           enum: [pending, confirmed, canceled]
 *           description: Status of the appointment
 *           example: confirmed
 *         appointment_type:
 *           type: string
 *           enum: [online, walk_in]
 *           description: Type of appointment
 *           example: online
 *         service_list_id:
 *           type: integer
 *           description: ID of the service being provided
 *           example: 4
 */

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: API endpoints for managing appointments
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get a specific appointment by ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the appointment
 *     responses:
 *       200:
 *         description: Appointment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
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
 *                 example: 5
 *               dentist_id:
 *                 type: integer
 *                 description: ID of the dentist
 *                 example: 2
 *               schedule_id:
 *                 type: integer
 *                 description: ID of the schedule
 *                 example: 10
 *               timeslot_id:
 *                 type: integer
 *                 description: ID of the timeslot
 *                 example: 3
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, canceled]
 *                 description: Status of the appointment
 *                 example: confirmed
 *               appointment_type:
 *                 type: string
 *                 enum: [online, walk_in]
 *                 description: Type of appointment
 *                 example: online
 *               service_list_id:
 *                 type: integer
 *                 description: ID of the service being provided
 *                 example: 4
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update an appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the appointment
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
 *                 example: 5
 *               dentist_id:
 *                 type: integer
 *                 description: ID of the dentist
 *                 example: 2
 *               schedule_id:
 *                 type: integer
 *                 description: ID of the schedule
 *                 example: 10
 *               timeslot_id:
 *                 type: integer
 *                 description: ID of the timeslot
 *                 example: 3
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, canceled]
 *                 description: Status of the appointment
 *                 example: confirmed
 *               appointment_type:
 *                 type: string
 *                 enum: [online, walk_in]
 *                 description: Type of appointment
 *                 example: online
 *               service_list_id:
 *                 type: integer
 *                 description: ID of the service being provided
 *                 example: 4
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the appointment
 *     responses:
 *       204:
 *         description: Appointment deleted successfully
 *       404:
 *         description: Appointment not found
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */
