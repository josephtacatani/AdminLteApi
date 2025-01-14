/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the admin.
 *           example: 1
 *         email:
 *           type: string
 *           description: Admin's email address.
 *           example: "admin@example.com"
 *         password:
 *           type: string
 *           description: Admin's password.
 *           example: "Password123!"
 *         fullname:
 *           type: string
 *           description: Full name of the admin.
 *           example: "John Admin"
 *         photo:
 *           type: string
 *           description: Profile photo URL or filename.
 *           example: "profile.jpg"
 *         birthday:
 *           type: string
 *           format: date
 *           description: Birthdate of the admin.
 *           example: "1990-01-01"
 *         address:
 *           type: string
 *           description: Address of the admin.
 *           example: "123 Admin Street"
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           description: Gender of the admin.
 *           example: "male"
 *         contact_number:
 *           type: string
 *           description: Contact number of the admin.
 *           example: "123456789"
 *         role:
 *           type: string
 *           description: Role of the user.
 *           example: "admin"
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           description: Account status.
 *           example: "active"
 *         email_verified:
 *           type: boolean
 *           description: Whether the admin's email is verified.
 *           example: true
 */

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Register a new admin (Super Admin only)
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Admin registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin registered successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Admin'
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Retrieve all admins
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all admins.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admins retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Admin'
 */

/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Retrieve a specific admin by ID
 *     tags: [Admins]
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
 *         description: Admin retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin retrieved successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Admin not found.
 */

/**
 * @swagger
 * /admin/{id}:
 *   put:
 *     summary: Update a specific admin by ID (Super Admin only)
 *     tags: [Admins]
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
 *                 example: "John Admin"
 *               photo:
 *                 type: string
 *                 example: "profile.jpg"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               address:
 *                 type: string
 *                 example: "123 Admin Street"
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 example: "male"
 *               contact_number:
 *                 type: string
 *                 example: "123456789"
 *     responses:
 *       200:
 *         description: Admin updated successfully.
 *       400:
 *         description: Path ID and body ID mismatch or validation error.
 */

/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     summary: Delete a specific admin by ID (Super Admin only)
 *     tags: [Admins]
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
 *         description: Admin deleted successfully.
 *       404:
 *         description: Admin not found.
 */

/**
 * @swagger
 * /admin/reset-password/{id}:
 *   put:
 *     summary: Reset a user's password (Admin only)
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the user whose password will be reset.
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
 *                 description: The new password for the user.
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
 *                   example: "Password reset successfully."
 *       400:
 *         description: Validation failed. Missing required fields.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

