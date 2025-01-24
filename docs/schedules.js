/**
 * @swagger
 * tags:
 *   name: Schedules
 *   description: API endpoints for managing dentist schedules
 */

/**
 * @swagger
 * /schedules:
 *   get:
 *     summary: Get all schedules
 *     description: Retrieves all schedules without role restrictions. Requires authentication.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Schedules retrieved successfully.
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       dentist_id:
 *                         type: integer
 *                         example: 1
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2025-02-01"
 *                       start_time:
 *                         type: string
 *                         format: time
 *                         example: "09:00:00"
 *                       end_time:
 *                         type: string
 *                         format: time
 *                         example: "17:00:00"
 *                 error:
 *                   type: string
 *                   example: null
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized."
 *                 data:
 *                   type: null
 *                   example: null
 *                 error:
 *                   type: string
 *                   example: "Token is missing or invalid."
 */

/**
 * @swagger
 * /schedules/{id}:
 *   get:
 *     summary: Get a schedule by ID
 *     description: Retrieves details of a specific schedule by its ID.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the schedule to retrieve.
 *     responses:
 *       200:
 *         description: Schedule retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedule retrieved successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     dentist_id:
 *                       type: integer
 *                       example: 1
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2025-02-01"
 *                     start_time:
 *                       type: string
 *                       format: time
 *                       example: "09:00:00"
 *                     end_time:
 *                       type: string
 *                       format: time
 *                       example: "17:00:00"
 *                 error:
 *                   type: string
 *                   example: null
 *       404:
 *         description: Schedule not found.
 */

/**
 * @swagger
 * /schedules:
 *   post:
 *     summary: Create a new schedule with automatic timeslot generation
 *     description: Creates a new schedule for a dentist and generates timeslots automatically. Skips lunch break from 12:00 PM to 1:00 PM.
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
 *                 example: 1
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-01"
 *               start_time:
 *                 type: string
 *                 format: time
 *                 example: "09:00:00"
 *               end_time:
 *                 type: string
 *                 format: time
 *                 example: "17:00:00"
 *     responses:
 *       201:
 *         description: Schedule created successfully, with timeslots generated.
 */

/**
 * @swagger
 * /schedules/{id}:
 *   delete:
 *     summary: Delete a schedule
 *     description: Deletes a schedule and all associated timeslots.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the schedule to delete.
 *     responses:
 *       200:
 *         description: Schedule deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schedule and associated timeslots deleted successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     deleted_schedule_id:
 *                       type: integer
 *                       example: 5
 *                 error:
 *                   type: string
 *                   example: null
 *       404:
 *         description: Schedule not found.
 */

/**
 * @swagger
 * /schedules/dentist/{dentistId}:
 *   get:
 *     summary: Get schedules by dentist ID
 *     description: Retrieves all schedules for a specific dentist.
 *     tags: [Schedules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dentistId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the dentist whose schedules should be retrieved.
 *     responses:
 *       200:
 *         description: Schedules retrieved successfully.
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2025-02-01"
 *                       start_time:
 *                         type: string
 *                         format: time
 *                         example: "09:00:00"
 *                       end_time:
 *                         type: string
 *                         format: time
 *                         example: "17:00:00"
 *                 error:
 *                   type: string
 *                   example: null
 *       404:
 *         description: No schedules found for the dentist.
 */
