/**
 * @swagger
 * /dentist/register:
 *   post:
 *     summary: Register a new dentist (Admins only)
 *     tags: [Dentists]
 *     security:
 *       - bearerAuth: [] # Requires Authorization Header with Bearer Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "dentist@example.com"
 *                 description: Dentist's email address.
 *               password:
 *                 type: string
 *                 example: "password123"
 *                 description: Password for the dentist's account.
 *               fullname:
 *                 type: string
 *                 example: "Dr. Jane Smith"
 *                 description: Full name of the dentist.
 *               photo:
 *                 type: string
 *                 example: "profile.jpg"
 *                 description: Dentist's profile photo URL or filename.
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1980-05-15"
 *                 description: Dentist's birthdate.
 *               address:
 *                 type: string
 *                 example: "123 Main Street"
 *                 description: Dentist's address.
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 example: "female"
 *                 description: Dentist's gender.
 *               contact_number:
 *                 type: string
 *                 example: "123456789"
 *                 description: Dentist's contact number.
 *     responses:
 *       201:
 *         description: Dentist registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dentist registered successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                       description: Unique identifier of the dentist.
 *                     email:
 *                       type: string
 *                       example: "dentist@example.com"
 *                     fullname:
 *                       type: string
 *                       example: "Dr. Jane Smith"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     email_verified:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation failed. Missing required fields."
 *                 error:
 *                   type: string
 *                   example: null
 *       403:
 *         description: Forbidden (not an admin).
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /dentist:
 *   get:
 *     summary: Retrieve all dentists and their related user information.
 *     tags: [Dentists]
 *     security:
 *       - bearerAuth: [] # Requires Authorization Header with Bearer Token
 *     responses:
 *       200:
 *         description: A list of dentists with their user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dentists retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: integer
 *                         example: 1
 *                         description: Unique identifier for the user in the `users` table.
 *                       email:
 *                         type: string
 *                         example: "dentist@example.com"
 *                       fullname:
 *                         type: string
 *                         example: "Dr. Jane Smith"
 *                       contact_number:
 *                         type: string
 *                         example: "123456789"
 *                       address:
 *                         type: string
 *                         example: "123 Main Street"
 *                       degree:
 *                         type: string
 *                         example: "DDS"
 *                       specialty:
 *                         type: string
 *                         example: "Orthodontics"
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /dentist/{id}:
 *   get:
 *     summary: Retrieve a specific dentist's details by ID.
 *     tags: [Dentists]
 *     security:
 *       - bearerAuth: [] # Requires Authorization Header with Bearer Token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the dentist/user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dentist retrieved successfully."
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Dentist or user not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /dentist/{id}:
 *   delete:
 *     summary: Delete a specific dentist or user by ID (Admin only).
 *     tags: [Dentists]
 *     security:
 *       - bearerAuth: [] # Requires Authorization Header with Bearer Token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Dentist or user deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dentist deleted successfully."
 *                 data:
 *                   type: null
 *       404:
 *         description: Dentist or user not found.
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /dentist/{id}:
 *   put:
 *     summary: Update a specific dentist and user details by ID (Admin only).
 *     tags: [Dentists]
 *     security:
 *       - bearerAuth: [] # Requires Authorization Header with Bearer Token
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
 *                 example: "Dr. Jane Smith"
 *               photo:
 *                 type: string
 *                 example: "profile.jpg"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1980-05-15"
 *               address:
 *                 type: string
 *                 example: "123 Main Street"
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 example: "female"
 *               contact_number:
 *                 type: string
 *                 example: "123456789"
 *               degree:
 *                 type: string
 *                 example: "DDS"
 *               specialty:
 *                 type: string
 *                 example: "Orthodontics"
 *     responses:
 *       200:
 *         description: Dentist and user details updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dentist and user details updated successfully."
 *                 data:
 *                   type: null
 *       404:
 *         description: Dentist or user not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /dentist/reset-password/{id}:
 *   put:
 *     summary: Reset a dentist's password (Admin only)
 *     tags: [Dentists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the dentist whose password will be reset.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: "NewSecurePassword123!"
 *                 description: The new password for the dentist.
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dentist password reset successfully."
 *       400:
 *         description: Validation failed. Missing required fields.
 *       404:
 *         description: Dentist not found.
 *       500:
 *         description: Internal server error.
 */

