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
 *           description: ID of the dentist
 *           example: 2
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the schedule
 *           example: "2025-01-14"
 *         start_time:
 *           type: string
 *           format: time
 *           description: Start time of the schedule
 *           example: "09:00:00"
 *         end_time:
 *           type: string
 *           format: time
 *           description: End time of the schedule
 *           example: "10:00:00"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the schedule was created
 *           example: "2025-01-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the schedule was last updated
 *           example: "2025-01-02T12:00:00Z"
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
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all schedules
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
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /schedules/{id}:
 *   get:
 *     summary: Get a specific schedule by ID
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
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedule retrieved successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: Schedule not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedule not found."
 *                 error:
 *                   type: string
 *                   example: null
 *       401:
 *         description: Unauthorized - Token is missing or invalid
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
 *                 description: ID of the dentist
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
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedule created successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Schedule'
 *       400:
 *         description: Validation error - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required fields."
 *                 error:
 *                   type: string
 *                   example: null
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */



/**
 * @swagger
 * /schedules/{id}:
 *   delete:
 *     summary: Delete a schedule
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
 *       200:
 *         description: Schedule deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedule deleted successfully."
 *                 data:
 *                   type: null
 *       404:
 *         description: Schedule not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedule not found."
 *                 error:
 *                   type: string
 *                   example: null
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */
