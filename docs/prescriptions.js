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
 */

/**
 * @swagger
 * /prescriptions/{id}:
 *   get:
 *     summary: Get a specific prescription by ID
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Prescription retrieved successfully
 *       404:
 *         description: Prescription not found
 */

/**
 * @swagger
 * /prescriptions/patient/{patientId}:
 *   get:
 *     summary: Get all prescriptions by patient ID
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of prescriptions for the patient
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
 *               dentist_id:
 *                 type: integer
 *               medicine:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Prescription created successfully
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
 *               dentist_id:
 *                 type: integer
 *                 description: ID of the dentist
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the prescription
 *               medicine:
 *                 type: string
 *                 description: List of medicines prescribed
 *               notes:
 *                 type: string
 *                 description: Additional notes or instructions
 *     responses:
 *       200:
 *         description: Prescription updated successfully
 *       400:
 *         description: Validation error - missing required fields
 *       404:
 *         description: Prescription not found
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
 *     responses:
 *       200:
 *         description: Prescription deleted successfully
 *       404:
 *         description: Prescription not found
 */
