/**
 * @swagger
 * components:
 *   schemas:
 *     Prescription:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the prescription (auto-generated)
 *           example: 1
 *         patient_id:
 *           type: integer
 *           description: ID of the patient
 *           example: 5
 *         dentist_id:
 *           type: integer
 *           description: ID of the dentist
 *           example: 2
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the prescription
 *           example: "2025-01-14"
 *         medicine:
 *           type: string
 *           description: List of medicines prescribed
 *           example: "Amoxicillin 500mg, Paracetamol 650mg"
 *         notes:
 *           type: string
 *           description: Additional notes or instructions
 *           example: "Take medications after meals."
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Record creation timestamp
 *           example: "2025-01-14T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Record last update timestamp
 *           example: "2025-01-14T12:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Prescriptions
 *   description: API endpoints for managing prescriptions
 */

/**
 * @swagger
 * /prescriptions:
 *   get:
 *     summary: Get all prescriptions
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all prescriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prescription'
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /prescriptions/{id}:
 *   get:
 *     summary: Get a specific prescription by ID
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the prescription
 *     responses:
 *       200:
 *         description: Prescription retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prescription'
 *       404:
 *         description: Prescription not found
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /prescriptions:
 *   post:
 *     summary: Create a new prescription
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient_id:
 *                 type: integer
 *                 description: ID of the patient
 *                 example: 5
 *               dentist_id:
 *                 type: integer
 *                 description: ID of the dentist
 *                 example: 2
 *               medicine:
 *                 type: string
 *                 description: List of medicines prescribed
 *                 example: "Amoxicillin 500mg, Paracetamol 650mg"
 *               notes:
 *                 type: string
 *                 description: Additional notes or instructions
 *                 example: "Take medications after meals."
 *     responses:
 *       201:
 *         description: Prescription created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prescription'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /prescriptions/{id}:
 *   put:
 *     summary: Update a prescription
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the prescription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prescription'
 *     responses:
 *       200:
 *         description: Prescription updated successfully
 *       404:
 *         description: Prescription not found
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /prescriptions/{id}:
 *   delete:
 *     summary: Delete a prescription
 *     tags: [Prescriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the prescription
 *     responses:
 *       200:
 *         description: Prescription deleted successfully
 *       404:
 *         description: Prescription not found
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */
