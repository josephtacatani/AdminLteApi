/**
 * @swagger
 * components:
 *   schemas:
 *     Staff:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the staff member.
 *           example: 1
 *         email:
 *           type: string
 *           description: Staff member's email address.
 *           example: "staff@example.com"
 *         password:
 *           type: string
 *           description: Staff member's password.
 *           example: "Password123!"
 *         fullname:
 *           type: string
 *           description: Full name of the staff member.
 *           example: "John Doe"
 *         photo:
 *           type: string
 *           description: Profile photo URL or filename.
 *           example: "profile.jpg"
 *         birthday:
 *           type: string
 *           format: date
 *           description: Birthdate of the staff member.
 *           example: "1990-01-01"
 *         address:
 *           type: string
 *           description: Address of the staff member.
 *           example: "123 Main Street"
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           description: Gender of the staff member.
 *           example: "male"
 *         contact_number:
 *           type: string
 *           description: Contact number of the staff member.
 *           example: "123456789"
 *         role:
 *           type: string
 *           description: Role of the user.
 *           example: "staff"
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           description: Account status.
 *           example: "active"
 *         email_verified:
 *           type: boolean
 *           description: Whether the staff member's email is verified.
 *           example: true
 */

/**
 * @swagger
 * /staff/register:
 *   post:
 *     summary: Register a new staff member (Admins only)
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Staff'
 *     responses:
 *       201:
 *         description: Staff member registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Staff member registered successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Staff'
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /staff:
 *   get:
 *     summary: Retrieve all staff members
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all staff members.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Staff members retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Staff'
 */

/**
 * @swagger
 * /staff/{id}:
 *   get:
 *     summary: Retrieve a specific staff member by ID
 *     tags: [Staff]
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
 *         description: Staff member retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Staff member retrieved successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Staff'
 *       404:
 *         description: Staff member not found.
 */

/**
 * @swagger
 * /staff/{id}:
 *   put:
 *     summary: Update a specific staff member by ID (Admin only)
 *     tags: [Staff]
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
 *               id:
 *                 type: integer
 *                 example: 1
 *               fullname:
 *                 type: string
 *                 example: "John Doe"
 *               photo:
 *                 type: string
 *                 example: "profile.jpg"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               address:
 *                 type: string
 *                 example: "123 Main Street"
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 example: "male"
 *               contact_number:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       200:
 *         description: Staff member updated successfully.
 *       400:
 *         description: Path ID and body ID mismatch or validation error.
 */

/**
 * @swagger
 * /staff/{id}:
 *   delete:
 *     summary: Delete a specific staff member by ID (Admin only)
 *     tags: [Staff]
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
 *         description: Staff member deleted successfully.
 *       404:
 *         description: Staff member not found.
 */


/**
 * @swagger
 * /staff/reset-password/{id}:
 *   put:
 *     summary: Reset a staff member's password (Admin only)
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the staff member whose password will be reset.
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
 *                 description: The new password for the staff member.
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
 *                   example: "Staff password reset successfully."
 *       400:
 *         description: Validation failed. Missing required fields.
 *       404:
 *         description: Staff member not found.
 *       500:
 *         description: Internal server error.
 */
