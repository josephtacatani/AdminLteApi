/**
 * @swagger
 * components:
 *   schemas:
 *     Prescription:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the prescription
 *         patientId:
 *           type: integer
 *           description: Corresponding patient's ID
 *         date:
 *           type: string
 *           format: date
 *           description: Prescription date
 *         medicine:
 *           type: string
 *           description: Name of the prescribed medicine
 *         notes:
 *           type: string
 *           description: Usage instructions or notes
 *       required:
 *         - patientId
 *         - date
 *         - medicine
 */

/**
 * @swagger
 * /prescriptions:
 *   get:
 *     summary: Get all prescriptions
 *     responses:
 *       200:
 *         description: List of all prescriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prescription'
 */

/**
 * @swagger
 * /prescriptions:
 *   post:
 *     summary: Add a new prescription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prescription'
 *     responses:
 *       201:
 *         description: Prescription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prescription'
 */