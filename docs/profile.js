/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get authenticated user profile
 *     description: Retrieve the profile of the currently authenticated user using a valid JWT token.
 *     tags:
 *       - User Profile
 *     security:
 *       - bearerAuth: []  # Indicates the endpoint is protected by a bearer token
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique identifier of the user
 *                 email:
 *                   type: string
 *                   description: Email address of the user
 *                 fullname:
 *                   type: string
 *                   description: Full name of the user
 *                 role:
 *                   type: string
 *                   description: Role of the user (e.g., patient, dentist, admin)
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *       403:
 *         description: Forbidden (invalid or expired token)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */