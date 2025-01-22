/**
 * @swagger
 * components:
 *   schemas:
 *     Dentist:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *           example: 1
 *         email:
 *           type: string
 *           example: "dentist@example.com"
 *         fullname:
 *           type: string
 *           example: "Dr. Jane Smith"
 *         status:
 *           type: string
 *           example: "active"
 *         photo:
 *           type: string
 *           example: "profile.jpg"
 *         birthday:
 *           type: string
 *           format: date
 *           example: "1980-05-15"
 *         address:
 *           type: string
 *           example: "123 Main Street"
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           example: "female"
 *         contact_number:
 *           type: string
 *           example: "123456789"
 *         degree:
 *           type: string
 *           example: "DDS"
 *         specialty:
 *           type: string
 *           example: "Orthodontics"
 */

/**
 * @swagger
 * tags:
 *   - name: Dentists
 *     description: Endpoints for managing dentist accounts.
 */

/**
 * @swagger
 * /dentist/register:
 *   post:
 *     summary: Register a new dentist (Admins only)
 *     tags: [Dentists]
 *     security:
 *       - bearerAuth: []
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
 *               password:
 *                 type: string
 *                 example: "password123"
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
 *                   $ref: '#/components/schemas/Dentist'
 *       400:
 *         description: Validation error.
 *       403:
 *         description: Forbidden - Not an admin.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /dentist:
 *   get:
 *     summary: Retrieve all dentists
 *     tags: [Dentists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of dentists with their details.
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
 *                     $ref: '#/components/schemas/Dentist'
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /dentist/{id}:
 *   get:
 *     summary: Retrieve a specific dentist by ID
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
 *     responses:
 *       200:
 *         description: Successfully retrieved the dentist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dentist retrieved successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Dentist'
 *       400:
 *         description: Invalid dentist ID.
 *       404:
 *         description: Dentist not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /dentist/{id}:
 *   put:
 *     summary: Update a dentist's details
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
 *         description: Dentist updated successfully.
 *       400:
 *         description: Invalid dentist ID.
 *       404:
 *         description: Dentist not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /dentist/{id}:
 *   delete:
 *     summary: Delete a specific dentist (Admin only)
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
 *     responses:
 *       200:
 *         description: Dentist deleted successfully.
 *       400:
 *         description: Invalid dentist ID.
 *       404:
 *         description: Dentist not found.
 *       500:
 *         description: Internal server error.
 */
