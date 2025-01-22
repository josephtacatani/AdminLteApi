/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the schedule (auto-generated)
 *           example: 1
 *         dentist_id:
 *           type: integer
 *           description: Unique identifier for the associated dentist
 *           example: 2
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the scheduled appointment
 *           example: "2025-01-14"
 *         start_time:
 *           type: string
 *           format: time
 *           description: The starting time of the schedule
 *           example: "09:00:00"
 *         end_time:
 *           type: string
 *           format: time
 *           description: The ending time of the schedule
 *           example: "10:00:00"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp indicating when the schedule was created
 *           example: "2025-01-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp indicating the last update of the schedule
 *           example: "2025-01-02T12:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Schedules
 *   description: API endpoints for managing dental schedules
 */

/**
 * @swagger
 * /schedules:
 *   get:
 *     summary: Retrieve all schedules
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedules retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Schedule'
 *       401:
 *         description: Unauthorized access - Token required
 */

/**
 * @swagger
 * /schedules/{id}:
 *   get:
 *     summary: Retrieve a specific schedule by ID
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the requested schedule
 *     responses:
 *       200:
 *         description: Successfully retrieved the schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedule retrieved successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: Schedule not found
 *       401:
 *         description: Unauthorized access - Token required
 */

/**
 * @swagger
 * /schedules/dentist/{dentistId}:
 *   get:
 *     summary: Retrieve schedules for a specific dentist
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dentistId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the dentist whose schedules are requested
 *     responses:
 *       200:
 *         description: Successfully retrieved schedules for the dentist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedules retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: No schedules found for the specified dentist
 *       401:
 *         description: Unauthorized access - Token required
 */

/**
 * @swagger
 * /schedules:
 *   post:
 *     summary: Create a new schedule
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
 *                 description: Unique identifier of the dentist
 *                 example: 2
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the schedule
 *                 example: "2025-01-14"
 *               start_time:
 *                 type: string
 *                 format: time
 *                 description: Start time of the schedule
 *                 example: "09:00:00"
 *               end_time:
 *                 type: string
 *                 format: time
 *                 description: End time of the schedule
 *                 example: "10:00:00"
 *     responses:
 *       201:
 *         description: Schedule successfully created
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized access - Token required
 */

/**
 * @swagger
 * /schedules/{id}:
 *   delete:
 *     summary: Remove a schedule
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the schedule to be deleted
 *     responses:
 *       200:
 *         description: Successfully deleted the schedule
 *       404:
 *         description: Schedule not found
 *       401:
 *         description: Unauthorized access - Token required
 */
