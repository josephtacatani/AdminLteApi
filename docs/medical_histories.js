/**
 * @swagger
 * components:
 *   schemas:
 *     MedicalHistory:
 *       type: object
 *       properties:
 *         id:
 *         patient_id:
 *           type: integer
 *           description: ID of the patient
 *           example: 5
 *         question1:
 *           type: string
 *           description: Response to question 1
 *           example: Yes
 *         question2:
 *           type: string
 *           description: Response to question 2
 *           example: No
 *         question3:
 *           type: string
 *           description: Response to question 3
 *           example: Yes
 *         question4:
 *           type: string
 *           description: Response to question 4
 *           example: No
 *         question5:
 *           type: string
 *           description: Response to question 5
 *           example: Yes
 *         question6:
 *           type: string
 *           description: Response to question 6
 *           example: No
 *         question7:
 *           type: string
 *           description: Response to question 7
 *           example: Yes
 *         question8:
 *           type: string
 *           description: Response to question 8
 *           example: No
 *         question9:
 *           type: string
 *           description: Response to question 9
 *           example: Yes
 *         question10:
 *           type: string
 *           description: Response to question 10
 *           example: No
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
 *             $ref: '#/components/schemas/MedicalHistory'
 *     responses:
 *       201:
 *         description: Medical history created successfully
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
 *             $ref: '#/components/schemas/MedicalHistory'
 *     responses:
 *       200:
 *         description: Medical history updated successfully
 *       404:
 *         description: Medical history not found
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
 *       204:
 *         description: Medical history deleted successfully
 *       404:
 *         description: Medical history not found
 */
