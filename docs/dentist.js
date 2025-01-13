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
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                     description: Unique identifier for the user in the `users` table.
 *                   email:
 *                     type: string
 *                     example: "dentist@example.com"
 *                     description: Dentist's email address.
 *                   fullname:
 *                     type: string
 *                     example: "Dr. Jane Smith"
 *                     description: Dentist's full name.
 *                   contact_number:
 *                     type: string
 *                     example: "123456789"
 *                     description: Dentist's contact number.
 *                   address:
 *                     type: string
 *                     example: "123 Main Street"
 *                     description: Dentist's address.
 *                   degree:
 *                     type: string
 *                     example: "DDS"
 *                     description: Dentist's degree.
 *                   specialty:
 *                     type: string
 *                     example: "Orthodontics"
 *                     description: Dentist's specialty.
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *       403:
 *         description: Forbidden - Access denied.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /dentist/{id}:
 *   get:
 *     summary: Retrieve a specific dentist's details by ID
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
 *         description: The ID of the dentist/user to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the dentist/user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                   description: Unique identifier for the user.
 *                   example: 1
 *                 email:
 *                   type: string
 *                   description: Email address of the user.
 *                   example: "dentist@example.com"
 *                 role:
 *                   type: string
 *                   description: Role of the user (e.g., dentist, admin).
 *                   example: "dentist"
 *                 status:
 *                   type: string
 *                   description: Account status.
 *                   example: "active"
 *                 fullname:
 *                   type: string
 *                   description: Full name of the user.
 *                   example: "Dr. Jane Smith"
 *                 photo:
 *                   type: string
 *                   description: Profile photo URL or filename.
 *                   example: "profile.jpg"
 *                 birthday:
 *                   type: string
 *                   format: date
 *                   description: Birthdate of the user.
 *                   example: "1980-05-15"
 *                 address:
 *                   type: string
 *                   description: Address of the user.
 *                   example: "123 Main Street"
 *                 gender:
 *                   type: string
 *                   enum: [male, female, other]
 *                   description: Gender of the user.
 *                   example: "female"
 *                 contact_number:
 *                   type: string
 *                   description: Contact number of the user.
 *                   example: "123456789"
 *                 email_verified:
 *                   type: boolean
 *                   description: Whether the user's email is verified.
 *                   example: true
 *                 degree:
 *                   type: string
 *                   description: Dentist's degree.
 *                   example: "DDS"
 *                 specialty:
 *                   type: string
 *                   description: Dentist's specialty.
 *                   example: "Orthodontics"
 *       404:
 *         description: Dentist or user not found.
 *       401:
 *         description: Unauthorized. No valid token provided.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /dentist/{id}:
 *   delete:
 *     summary: Delete a specific dentist or user by ID (Admin only)
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
 *         description: The ID of the dentist or user to delete.
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
 *                   example: Dentist or user deleted successfully.
 *       404:
 *         description: Dentist or user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Dentist or user not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error deleting dentist or user.
 *                 error:
 *                   type: string
 *                   example: Detailed error message.
 */

/**
 * @swagger
 * /dentist/{id}:
 *   put:
 *     summary: Update a specific dentist and user details by ID (Admin only)
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
 *         description: The ID of the dentist or user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: Dr. Jane Smith
 *               photo:
 *                 type: string
 *                 example: profile.jpg
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: 1980-05-15
 *               address:
 *                 type: string
 *                 example: 123 Main Street
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 example: female
 *               contact_number:
 *                 type: string
 *                 example: 123456789
 *               degree:
 *                 type: string
 *                 example: DDS
 *               specialty:
 *                 type: string
 *                 example: Orthodontics
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
 *                   example: Dentist and user details updated successfully.
 *       404:
 *         description: Dentist or user not found.
 *       500:
 *         description: Internal server error.
 */