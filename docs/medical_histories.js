/**
 * @swagger
 * components:
 *   schemas:
 *     MedicalHistory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the medical history (auto-generated)
 *           example: 1
 *         patient_id:
 *           type: integer
 *           description: ID of the patient
 *           example: 5
 *         question1:
 *           type: string
 *           description: First medical question answer
 *           example: "No allergies"
 *         question2:
 *           type: string
 *           description: Second medical question answer
 *           example: "No prior surgeries"
 *         question3:
 *           type: string
 *           description: Third medical question answer
 *           example: "Diabetes"
 *         question4:
 *           type: string
 *           description: Fourth medical question answer
 *           example: "No heart disease"
 *         question5:
 *           type: string
 *           description: Fifth medical question answer
 *           example: "Non-smoker"
 *         question6:
 *           type: string
 *           description: Sixth medical question answer
 *           example: "No current medications"
 *         question7:
 *           type: string
 *           description: Seventh medical question answer
 *           example: "No history of seizures"
 *         question8:
 *           type: string
 *           description: Eighth medical question answer
 *           example: "No bleeding disorders"
 *         question9:
 *           type: string
 *           description: Ninth medical question answer
 *           example: "No pregnancy"
 *         question10:
 *           type: string
 *           description: Tenth medical question answer
 *           example: "No mental illness"
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
 *   name: MedicalHistories
 *   description: API endpoints for managing medical histories
 */

/**
 * @swagger
 * /medical_histories:
 *   get:
 *     summary: Get all medical histories
 *     tags: [MedicalHistories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all medical histories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MedicalHistory'
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /medical_histories/by-patient/{patient_id}:
 *   get:
 *     summary: Get all medical histories by patient ID
 *     tags: [MedicalHistories]
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
 *         description: List of medical histories for the given patient
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MedicalHistory'
 *       404:
 *         description: No medical history found for the patient
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /medical_histories/{id}:
 *   get:
 *     summary: Get a specific medical history by ID
 *     tags: [MedicalHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the medical history
 *     responses:
 *       200:
 *         description: Medical history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicalHistory'
 *       404:
 *         description: Medical history not found
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /medical_histories:
 *   post:
 *     summary: Create a new medical history
 *     tags: [MedicalHistories]
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
 *               question1:
 *                 type: string
 *                 example: "No allergies"
 *               question2:
 *                 type: string
 *                 example: "No prior surgeries"
 *               question3:
 *                 type: string
 *                 example: "Diabetes"
 *               question4:
 *                 type: string
 *                 example: "No heart disease"
 *               question5:
 *                 type: string
 *                 example: "Non-smoker"
 *     responses:
 *       201:
 *         description: Medical history created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicalHistory'
 *       400:
 *         description: Validation error - missing required fields
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /medical_histories/{id}:
 *   put:
 *     summary: Update a medical history
 *     tags: [MedicalHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the medical history
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient_id:
 *                 type: integer
 *                 example: 5
 *               question1:
 *                 type: string
 *                 example: "Updated answer"
 *     responses:
 *       200:
 *         description: Medical history updated successfully
 *       404:
 *         description: Medical history not found
 *       400:
 *         description: Validation error - missing required fields
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /medical_histories/{id}:
 *   delete:
 *     summary: Delete a medical history
 *     tags: [MedicalHistories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the medical history
 *     responses:
 *       200:
 *         description: Medical history deleted successfully
 *       404:
 *         description: Medical history not found
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */