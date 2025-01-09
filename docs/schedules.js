// adminltebackend/docs/schedules.js
/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the schedule
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the schedule
 *         dentistId:
 *           type: integer
 *           description: ID of the dentist
 *         startTime:
 *           type: string
 *           description: Start time of the schedule
 *         endTime:
 *           type: string
 *           description: End time of the schedule
 *         duration:
 *           type: integer
 *           description: Duration of the appointment in minutes
 *       required:
 *         - date
 *         - dentistId
 *         - startTime
 *         - endTime
 *         - duration
 */

/**
 * @swagger
 * /schedules:
 *   get:
 *     summary: Get all schedules
 *     responses:
 *       200:
 *         description: List of all schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Schedule'
 */

/**
 * @swagger
 * /schedules:
 *   post:
 *     summary: Add a new schedule
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 */

/**
 * @swagger
 * /schedules/{id}:
 *   put:
 *     summary: Update a schedule
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the schedule to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *       404:
 *         description: Schedule not found
 */

/**
 * @swagger
 * /schedules/{id}:
 *   delete:
 *     summary: Delete a schedule
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the schedule to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Schedule deleted successfully
 *       404:
 *         description: Schedule not found
 */