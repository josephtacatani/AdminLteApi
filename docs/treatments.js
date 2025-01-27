/**
 * @swagger
 * tags:
 *   name: Treatments
 *   description: API for managing dental treatments
 */

/**
 * @swagger
 * /treatments:
 *   get:
 *     summary: Retrieve all treatments
 *     tags: [Treatments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all treatments
 *       404:
 *         description: No treatments found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /treatments/{id}:
 *   get:
 *     summary: Retrieve a treatment by ID
 *     tags: [Treatments]
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
 *         description: Treatment retrieved successfully
 *       404:
 *         description: Treatment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /treatments/patient/{patientId}:
 *   get:
 *     summary: Retrieve treatments by patient ID
 *     tags: [Treatments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of treatments for the patient
 *       404:
 *         description: No treatments found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /treatments:
 *   post:
 *     summary: Add a new treatment
 *     tags: [Treatments]
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
 *               dentist_id:
 *                 type: integer
 *               date_visit:
 *                 type: string
 *                 format: date
 *               teeth:
 *                 type: string
 *               treatment:
 *                 type: string
 *               description:
 *                 type: string
 *               fees:
 *                 type: number
 *               remarks:
 *                 type: string
 *     responses:
 *       201:
 *         description: Treatment added successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /treatments/{id}:
 *   put:
 *     summary: Update a treatment
 *     tags: [Treatments]
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
 *               patient_id:
 *                 type: integer
 *               dentist_id:
 *                 type: integer
 *               date_visit:
 *                 type: string
 *                 format: date
 *               teeth:
 *                 type: string
 *               treatment:
 *                 type: string
 *               description:
 *                 type: string
 *               fees:
 *                 type: number
 *               remarks:
 *                 type: string
 *     responses:
 *       200:
 *         description: Treatment updated successfully
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Treatment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /treatments/{id}:
 *   delete:
 *     summary: Delete a treatment
 *     tags: [Treatments]
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
 *         description: Treatment deleted successfully
 *       404:
 *         description: Treatment not found
 *       500:
 *         description: Internal server error
 */
