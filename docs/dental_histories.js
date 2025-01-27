/**
 * @swagger
 * components:
 *   schemas:
 *     DentalHistory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the dental history (auto-generated)
 *           example: 1
 *         patient_id:
 *           type: integer
 *           description: ID of the patient
 *           example: 5
 *         previous_dentist:
 *           type: string
 *           description: Name of the previous dentist
 *           example: "Dr. Jane Doe"
 *         last_dentist_visit:
 *           type: string
 *           format: date
 *           description: Date of the last visit to the dentist
 *           example: "2025-01-01"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Record creation timestamp
 *           example: "2025-01-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Record last update timestamp
 *           example: "2025-01-01T12:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: DentalHistories
 *   description: API endpoints for managing dental histories
 */

/**
 * @swagger
 * /dental_histories:
 *   get:
 *     summary: Get all dental histories
 *     tags: [DentalHistories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all dental histories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DentalHistory'
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /dental_histories/by-patient/{patient_id}:
 *   get:
 *     summary: Get all dental histories by patient ID
 *     tags: [DentalHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patient_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the patient
 *     responses:
 *       200:
 *         description: List of dental histories for the given patient
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DentalHistory'
 *       404:
 *         description: No dental history found for the patient
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /dental_histories/{id}:
 *   get:
 *     summary: Get a specific dental history by ID
 *     tags: [DentalHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the dental history
 *     responses:
 *       200:
 *         description: Dental history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DentalHistory'
 *       404:
 *         description: Dental history not found
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /dental_histories:
 *   post:
 *     summary: Create a new dental history
 *     tags: [DentalHistories]
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
 *               previous_dentist:
 *                 type: string
 *                 description: Name of the previous dentist
 *                 example: "Dr. Jane Doe"
 *               last_dentist_visit:
 *                 type: string
 *                 format: date
 *                 description: Date of the last visit to the dentist
 *                 example: "2025-01-01"
 *     responses:
 *       201:
 *         description: Dental history created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DentalHistory'
 *       400:
 *         description: Validation error - missing required fields
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /dental_histories/{id}:
 *   put:
 *     summary: Update a dental history
 *     tags: [DentalHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the dental history
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
 *               previous_dentist:
 *                 type: string
 *                 description: Name of the previous dentist
 *                 example: "Dr. Jane Doe"
 *               last_dentist_visit:
 *                 type: string
 *                 format: date
 *                 description: Date of the last visit to the dentist
 *                 example: "2025-01-01"
 *     responses:
 *       200:
 *         description: Dental history updated successfully
 *       404:
 *         description: Dental history not found
 *       400:
 *         description: Validation error - missing required fields
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /dental_histories/{id}:
 *   delete:
 *     summary: Delete a dental history
 *     tags: [DentalHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the dental history
 *     responses:
 *       200:
 *         description: Dental history deleted successfully
 *       404:
 *         description: Dental history not found
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */