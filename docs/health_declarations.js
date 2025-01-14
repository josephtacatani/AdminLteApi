/**
 * @swagger
 * components:
 *   schemas:
 *     HealthDeclaration:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the health declaration (auto-generated)
 *           example: 1
 *         patient_id:
 *           type: integer
 *           description: ID of the patient
 *           example: 5
 *         question1:
 *           type: string
 *           description: Answer to question 1
 *           example: Yes
 *         question2:
 *           type: string
 *           description: Answer to question 2
 *           example: No
 *         question3:
 *           type: string
 *           description: Answer to question 3
 *           example: Yes
 *         question4:
 *           type: string
 *           description: Answer to question 4
 *           example: No
 *         question5:
 *           type: string
 *           description: Answer to question 5
 *           example: Yes
 *         question6:
 *           type: string
 *           description: Answer to question 6
 *           example: No
 *         question7:
 *           type: string
 *           description: Answer to question 7
 *           example: Yes
 *         question8:
 *           type: string
 *           description: Answer to question 8
 *           example: No
 *         question9:
 *           type: string
 *           description: Answer to question 9
 *           example: Yes
 *         question10:
 *           type: string
 *           description: Answer to question 10
 *           example: No
 *         question11:
 *           type: string
 *           description: Answer to question 11
 *           example: Yes
 *         question12:
 *           type: string
 *           description: Answer to question 12
 *           example: No
 *         question13:
 *           type: string
 *           description: Answer to question 13
 *           example: Yes
 *         question14:
 *           type: string
 *           description: Answer to question 14
 *           example: No
 */

/**
 * @swagger
 * tags:
 *   name: HealthDeclarations
 *   description: API endpoints for managing health declarations
 */

/**
 * @swagger
 * /health_declarations:
 *   get:
 *     summary: Get all health declarations
 *     tags: [HealthDeclarations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all health declarations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HealthDeclaration'
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /health_declarations/{id}:
 *   get:
 *     summary: Get a specific health declaration by ID
 *     tags: [HealthDeclarations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the health declaration
 *     responses:
 *       200:
 *         description: Health declaration retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthDeclaration'
 *       404:
 *         description: Health declaration not found
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /health_declarations:
 *   post:
 *     summary: Create a new health declaration
 *     tags: [HealthDeclarations]
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
 *                 example: Yes
 *               question2:
 *                 type: string
 *                 example: No
 *               question3:
 *                 type: string
 *                 example: Yes
 *               question4:
 *                 type: string
 *                 example: No
 *               question5:
 *                 type: string
 *                 example: Yes
 *               question6:
 *                 type: string
 *                 example: No
 *               question7:
 *                 type: string
 *                 example: Yes
 *               question8:
 *                 type: string
 *                 example: No
 *               question9:
 *                 type: string
 *                 example: Yes
 *               question10:
 *                 type: string
 *                 example: No
 *               question11:
 *                 type: string
 *                 example: Yes
 *               question12:
 *                 type: string
 *                 example: No
 *               question13:
 *                 type: string
 *                 example: Yes
 *               question14:
 *                 type: string
 *                 example: No
 *     responses:
 *       201:
 *         description: Health declaration created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthDeclaration'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /health_declarations/{id}:
 *   put:
 *     summary: Update a health declaration
 *     tags: [HealthDeclarations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the health declaration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HealthDeclaration'
 *     responses:
 *       200:
 *         description: Health declaration updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthDeclaration'
 *       404:
 *         description: Health declaration not found
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /health_declarations/{id}:
 *   delete:
 *     summary: Delete a health declaration
 *     tags: [HealthDeclarations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the health declaration
 *     responses:
 *       204:
 *         description: Health declaration deleted successfully
 *       404:
 *         description: Health declaration not found
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */
