/**
 * @swagger
 * /timeslots/all:
 *   get:
 *     summary: Get all timeslots
 *     description: Retrieves all timeslots, regardless of their booking status.
 *     tags: [Timeslots]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all timeslots.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All timeslots retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 50
 *                       schedule_id:
 *                         type: integer
 *                         example: 14
 *                       start_time:
 *                         type: string
 *                         format: time
 *                         example: "14:00:00"
 *                       end_time:
 *                         type: string
 *                         format: time
 *                         example: "15:00:00"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-14T05:54:11Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-14T05:54:11Z"
 *
 * /timeslots/available/{schedule_id}:
 *   get:
 *     summary: Get available timeslots by schedule ID
 *     description: Retrieves timeslots that are available for booking. Includes timeslots that were never booked and timeslots that were previously booked but later canceled.
 *     tags: [Timeslots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: schedule_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the schedule to fetch available timeslots for.
 *     responses:
 *       200:
 *         description: List of available timeslots for the given schedule ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Available timeslots retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 50
 *                       schedule_id:
 *                         type: integer
 *                         example: 14
 *                       start_time:
 *                         type: string
 *                         format: time
 *                         example: "14:00:00"
 *                       end_time:
 *                         type: string
 *                         format: time
 *                         example: "15:00:00"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-14T05:54:11Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-14T05:54:11Z"
 *                       booking_status:
 *                         type: string
 *                         example: "never_booked"
 *       404:
 *         description: No available timeslots found for the given schedule ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No available timeslots found for the given schedule ID."
 *                 error:
 *                   type: string
 *                   example: null
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized."
 *                 error:
 *                   type: string
 *                   example: "Token is missing or invalid."
 *
 * /timeslots/all/{schedule_id}:
 *   get:
 *     summary: Get all timeslots by schedule ID (Includes both booked and available)
 *     description: Retrieves all timeslots under a given schedule, including both booked and available timeslots.
 *     tags: [Timeslots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: schedule_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the schedule.
 *     responses:
 *       200:
 *         description: List of all timeslots for the given schedule ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All timeslots retrieved successfully for the given schedule ID."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 50
 *                       schedule_id:
 *                         type: integer
 *                         example: 14
 *                       start_time:
 *                         type: string
 *                         format: time
 *                         example: "14:00:00"
 *                       end_time:
 *                         type: string
 *                         format: time
 *                         example: "15:00:00"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-14T05:54:11Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-14T05:54:11Z"
 */
