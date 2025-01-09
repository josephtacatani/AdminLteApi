/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the appointment
 *         patientId:
 *           type: integer
 *           description: Corresponding patient's ID
 *         date:
 *           type: string
 *           format: date
 *           description: Appointment date
 *         time:
 *           type: string
 *           description: Appointment time
 *         doctor:
 *           type: string
 *           description: Doctor's name
 *         status:
 *           type: string
 *           description: Appointment status (e.g., Confirmed, Pending)
 *       required:
 *         - patientId
 *         - date
 *         - time
 *         - doctor
 *         - status
 */

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     responses:
 *       200:
 *         description: List of all appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 */

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Add a new appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 */