/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - dateOfBirth
 *         - gender
 *         - email
 *         - mobileNumber
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the patient
 *         firstName:
 *           type: string
 *           description: First name of the patient
 *         lastName:
 *           type: string
 *           description: Last name of the patient
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: Date of birth in YYYY-MM-DD format
 *         gender:
 *           type: string
 *           enum: [Male, Female]
 *           description: Gender of the patient
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the patient
 *         mobileNumber:
 *           type: string
 *           description: Mobile number of the patient
 *         address:
 *           type: string
 *           description: Address of the patient
 *         profilePicture:
 *           type: string
 *           description: URL of the patient's profile picture
 *         password:
 *           type: string
 *           description: Patient's password (hashed on the backend)
 *       example:
 *         id: 1
 *         firstName: John
 *         lastName: Doe
 *         dateOfBirth: 1990-01-01
 *         gender: Male
 *         email: john.doe@example.com
 *         mobileNumber: 1234567890
 *         address: 123 Main Street, City, Country
 *         profilePicture: http://example.com/profile.jpg
 *         password: examplePassword123
 */

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Retrieve all patients
 *     tags:
 *       - Patients
 *     responses:
 *       200:
 *         description: A list of all patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 *       500:
 *         description: Database query error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Retrieve a specific patient by ID
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the patient
 *     responses:
 *       200:
 *         description: Patient found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Database query error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Add a new patient
 *     tags:
 *       - Patients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       201:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       500:
 *         description: Failed to add patient
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update an existing patient
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the patient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Patient updated successfully
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Failed to update patient
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /patients/{id}/password:
 *   put:
 *     summary: Update a patient's password
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the patient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The patient's current password
 *               newPassword:
 *                 type: string
 *                 description: The patient's new password
 *             example:
 *               oldPassword: oldPassword123
 *               newPassword: newSecurePassword123
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password updated successfully
 *       400:
 *         description: Bad request (e.g., missing fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing required fields
 *       401:
 *         description: Unauthorized (e.g., old password incorrect)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Old password is incorrect
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Patient not found
 *       500:
 *         description: Failed to update password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Delete a patient by ID
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the patient
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Patient deleted successfully
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Failed to delete patient
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */