/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Schedule:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the schedule
 *           example: 1
 *         dentist_id:
 *           type: integer
 *           description: ID of the dentist
 *           example: 2
 *         patient_id:
 *           type: integer
 *           description: ID of the patient
 *           example: 3
 *         appointment_date:
 *           type: string
 *           format: date-time
 *           description: Date and time of the appointment
 *           example: 2025-01-15T09:00:00Z
 *         timeslot_id:
 *           type: integer
 *           description: Timeslot ID for the appointment
 *           example: 4
 */

/**
 * @swagger
 * tags:
 *   name: Schedules
 *   description: API endpoints for managing schedules
 */

/**
 * @swagger
 * /schedules:
 *   get:
 *     summary: Get all schedules
 *     description: Retrieve a list of all schedules. Only accessible by admins and dentists.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Schedule'
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *       403:
 *         description: Forbidden - Insufficient privileges
 */

/**
 * @swagger
 * /schedules/{id}:
 *   get:
 *     summary: Get a specific schedule by ID
 *     description: Retrieve a single schedule by its ID. Only accessible by admins and dentists.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the schedule
 *     responses:
 *       200:
 *         description: Schedule retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: Schedule not found
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *       403:
 *         description: Forbidden - Insufficient privileges
 */

/**
 * @swagger
 * /schedules:
 *   post:
 *     summary: Create a new schedule
 *     description: Create a new schedule. Only accessible by admins.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dentist_id:
 *                 type: integer
 *                 description: The ID of the dentist
 *                 example: 2
 *               patient_id:
 *                 type: integer
 *                 description: The ID of the patient
 *                 example: 3
 *               appointment_date:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time of the appointment
 *                 example: 2025-01-15T09:00:00Z
 *               timeslot_id:
 *                 type: integer
 *                 description: The ID of the timeslot
 *                 example: 4
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *       403:
 *         description: Forbidden - Insufficient privileges
 */

/**
 * @swagger
 * /schedules/{id}:
 *   put:
 *     summary: Update a schedule
 *     description: Update an existing schedule by ID. Only accessible by admins.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the schedule to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dentist_id:
 *                 type: integer
 *                 description: The ID of the dentist
 *                 example: 2
 *               patient_id:
 *                 type: integer
 *                 description: The ID of the patient
 *                 example: 3
 *               appointment_date:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time of the appointment
 *                 example: 2025-01-15T09:00:00Z
 *               timeslot_id:
 *                 type: integer
 *                 description: The ID of the timeslot
 *                 example: 4
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *       404:
 *         description: Schedule not found
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *       403:
 *         description: Forbidden - Insufficient privileges
 */

/**
 * @swagger
 * /schedules/{id}:
 *   delete:
 *     summary: Delete a schedule
 *     description: Delete an existing schedule by ID. Only accessible by admins.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the schedule to delete
 *     responses:
 *       204:
 *         description: Schedule deleted successfully
 *       404:
 *         description: Schedule not found
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *       403:
 *         description: Forbidden - Insufficient privileges
 */
