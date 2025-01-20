/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Retrieve all patients and their related user information.
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of patients with their user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Patients retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: integer
 *                         example: 1
 *                       fullname:
 *                         type: string
 *                         example: "John Doe"
 *                       address:
 *                         type: string
 *                         example: "123 Main St"
 *                       birthday:
 *                         type: string
 *                         format: date
 *                         example: "1990-01-01"
 *                       sex:
 *                         type: string
 *                         example: "male"
 *                       email:
 *                         type: string
 *                         example: "john@example.com"
 *                       contact_number:
 *                         type: string
 *                         example: "1234567890"
 *                       photo:
 *                         type: string
 *                         example: "profile.jpg"
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Retrieve a specific patient's details by ID.
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the patient's details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Patient retrieved successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                       example: 1
 *                     fullname:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     photo:
 *                       type: string
 *                       example: "profile.jpg"
 *       404:
 *         description: Patient not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update a specific patient's details by ID.
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "John Doe Updated"
 *               address:
 *                 type: string
 *                 example: "456 Updated Street"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1990-02-01"
 *               sex:
 *                 type: string
 *                 example: "male"
 *               contact_number:
 *                 type: string
 *                 example: "9876543210"
 *               photo:
 *                 type: string
 *                 example: "new-profile.jpg"
 *     responses:
 *       200:
 *         description: Patient details updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Patient details updated successfully."
 *       404:
 *         description: Patient not found.
 *       500:
 *         description: Internal server error.
 */
