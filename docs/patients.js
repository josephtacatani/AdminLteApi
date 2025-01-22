/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: API endpoints for managing patients
 */

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Retrieve all patients.
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of patients.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Retrieve a specific patient's details.
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Patient details retrieved successfully.
 *       400:
 *         description: Invalid patient ID.
 *       404:
 *         description: Patient not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update a specific patient's details.
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               address:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               sex:
 *                 type: string
 *               contact_number:
 *                 type: string
 *               photo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Patient updated successfully.
 *       400:
 *         description: Invalid patient ID.
 *       404:
 *         description: Patient not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /patients/reset-password/{id}:
 *   put:
 *     summary: Reset a patient's password.
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       400:
 *         description: Missing password or invalid ID.
 *       404:
 *         description: Patient not found.
 *       500:
 *         description: Internal server error.
 */
