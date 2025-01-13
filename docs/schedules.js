/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       required:
 *         - date
 *         - dentistId
 *         - startTime
 *         - endTime
 *         - duration
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the schedule
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the schedule
 *         dentistId:
 *           type: integer
 *           description: The ID of the dentist assigned to this schedule
 *         startTime:
 *           type: string
 *           format: time
 *           description: Start time in HH:mm:ss format
 *         endTime:
 *           type: string
 *           format: time
 *           description: End time in HH:mm:ss format
 *         duration:
 *           type: integer
 *           description: Duration of the schedule in minutes
 *       example:
 *         id: 1
 *         date: 2025-01-15
 *         dentistId: 101
 *         startTime: 09:00:00
 *         endTime: 11:00:00
 *         duration: 120
 */

/**
 * @swagger
 * /schedules:
 *   get:
 *     summary: Retrieve all schedules
 *     tags:
 *       - Schedules
 *     responses:
 *       200:
 *         description: A list of all schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Schedule'
 *       500:
 *         description: Database query error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /schedules:
 *   post:
 *     summary: Add a new schedule
 *     tags:
 *       - Schedules
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - dentistId
 *               - startTime
 *               - endTime
 *               - duration
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the schedule
 *               dentistId:
 *                 type: integer
 *                 description: The ID of the dentist assigned to this schedule
 *               startTime:
 *                 type: string
 *                 format: time
 *                 description: Start time in HH:mm:ss format
 *               endTime:
 *                 type: string
 *                 format: time
 *                 description: End time in HH:mm:ss format
 *               duration:
 *                 type: integer
 *                 description: Duration of the schedule in minutes
 *             example:
 *               date: 2025-01-15
 *               dentistId: 101
 *               startTime: 09:00:00
 *               endTime: 11:00:00
 *               duration: 120
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       500:
 *         description: Failed to create schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /schedules/{id}:
 *   put:
 *     summary: Update an existing schedule
 *     tags:
 *       - Schedules
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
 *             required:
 *               - date
 *               - dentistId
 *               - startTime
 *               - endTime
 *               - duration
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the schedule
 *               dentistId:
 *                 type: integer
 *                 description: The ID of the dentist assigned to this schedule
 *               startTime:
 *                 type: string
 *                 format: time
 *                 description: Start time in HH:mm:ss format
 *               endTime:
 *                 type: string
 *                 format: time
 *                 description: End time in HH:mm:ss format
 *               duration:
 *                 type: integer
 *                 description: Duration of the schedule in minutes
 *             example:
 *               date: 2025-01-15
 *               dentistId: 101
 *               startTime: 10:00:00
 *               endTime: 12:00:00
 *               duration: 120
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Schedule updated successfully
 *       404:
 *         description: Schedule not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Schedule not found
 *       500:
 *         description: Failed to update schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /schedules/{id}:
 *   delete:
 *     summary: Delete a schedule by ID
 *     tags:
 *       - Schedules
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
 *                   example: Schedule deleted successfully
 *       404:
 *         description: Schedule not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Schedule not found
 *       500:
 *         description: Failed to delete schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */