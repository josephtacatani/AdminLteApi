/**
 * @swagger
 * components:
 *   schemas:
 *     DentalHistory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the dental history
 *         patientId:
 *           type: integer
 *           description: Corresponding patient's ID
 *         previousDentist:
 *           type: string
 *           description: Name of the previous dentist
 *         lastDentalVisit:
 *           type: string
 *           format: date
 *           description: Date of the last dental visit
 *         action:
 *           type: string
 *           description: Action performed on the history (e.g., "View")
 *       required:
 *         - patientId
 *         - previousDentist
 *         - lastDentalVisit
 */

/**
 * @swagger
 * /dental-histories:
 *   get:
 *     summary: Get all dental histories
 *     responses:
 *       200:
 *         description: List of all dental histories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DentalHistory'
 */