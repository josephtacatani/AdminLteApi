/**
 * @swagger
 * /timeslots/available/{schedule_id}:
 *   get:
 *     summary: Get available timeslots by schedule ID
 *     tags: [Timeslots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: schedule_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the schedule
 *     responses:
 *       200:
 *         description: List of available timeslots for the given schedule ID
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
 *       404:
 *         description: No available timeslots found for the given schedule ID
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
 *         description: Unauthorized - Token is missing or invalid
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
 */
