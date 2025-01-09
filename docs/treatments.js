/**
 * @swagger
 * components:
 *   schemas:
 *     Treatment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the treatment
 *         patientId:
 *           type: integer
 *           description: Corresponding patient's ID
 *         dateVisit:
 *           type: string
 *           format: date
 *           description: Date of the treatment
 *         teethNos:
 *           type: string
 *           description: Affected teeth numbers
 *         treatment:
 *           type: string
 *           description: Name of the treatment
 *         description:
 *           type: string
 *           description: Details about the treatment
 *         fees:
 *           type: string
 *           description: Cost of the treatment
 *         remarks:
 *           type: string
 *           description: Additional remarks
 *       required:
 *         - patientId
 *         - dateVisit
 *         - treatment
 */

/**
 * @swagger
 * /treatments:
 *   get:
 *     summary: Get all treatments
 *     responses:
 *       200:
 *         description: List of all treatments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Treatment'
 */

/**
 * @swagger
 * /treatments:
 *   post:
 *     summary: Add a new treatment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Treatment'
 *     responses:
 *       201:
 *         description: Treatment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treatment'
 */