/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user and generate access and refresh tokens
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: securePassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful.
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: JWT access token for API access
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     refreshToken:
 *                       type: string
 *                       description: JWT refresh token for renewing access tokens
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Email and password are required.
 *       401:
 *         description: Invalid credentials.
 *       403:
 *         description: Email is not verified. Please verify your email to log in.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user account. After registration, a verification email is sent to the user.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: Password123!
 *               fullname:
 *                 type: string
 *                 description: Full name of the user
 *                 example: John Doe
 *               role:
 *                 type: string
 *                 enum: [patient, dentist, admin, staff]
 *                 description: Role assigned to the user
 *                 example: patient
 *               status:
 *                 type: string
 *                 enum: [pending, active, inactive]
 *                 description: User account status. Defaults to 'pending'.
 *                 example: pending
 *               photo:
 *                 type: string
 *                 description: URL or filename for the user's profile photo
 *                 example: profile.jpg
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Birth date of the user
 *                 example: 1990-01-01
 *               address:
 *                 type: string
 *                 description: Address of the user
 *                 example: 123 Main Street
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 description: User's gender
 *                 example: male
 *               contact_number:
 *                 type: string
 *                 description: Contact number of the user
 *                 example: +123456789
 *             required:
 *               - email
 *               - password
 *               - fullname
 *               - role
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Registration successful. Please check your email to verify your account.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Unique identifier of the newly registered user
 *                       example: 1
 *                     email:
 *                       type: string
 *                       description: Email of the registered user
 *                       example: user@example.com
 *                     role:
 *                       type: string
 *                       description: Role assigned to the user
 *                       example: patient
 *                     status:
 *                       type: string
 *                       description: Account status
 *                       example: pending
 *                     fullname:
 *                       type: string
 *                       description: Full name of the user
 *                       example: John Doe
 *                     birthday:
 *                       type: string
 *                       format: date
 *                       description: Birth date of the user
 *                       example: 1990-01-01
 *                     address:
 *                       type: string
 *                       description: Address of the user
 *                       example: 123 Main Street
 *                     gender:
 *                       type: string
 *                       description: Gender of the user
 *                       example: male
 *                     contact_number:
 *                       type: string
 *                       description: Contact number of the user
 *                       example: +123456789
 *                     email_verified:
 *                       type: boolean
 *                       description: Whether the user's email is verified
 *                       example: false
 *       400:
 *         description: Validation error (e.g., missing required fields or invalid data)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation error
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Email is required", "Password must be at least 8 characters"]
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Registration failed
 *                 error:
 *                   type: string
 *                   example: Database connection failed
 */


/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Generate a new access token using a refresh token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: yourRefreshTokenHere
 *     responses:
 *       200:
 *         description: New access token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: Refresh token is required
 *       403:
 *         description: Invalid or expired refresh token
 */

/**
 * @swagger
 * /auth/verify-email:
 *   get:
 *     summary: Verify user's email using a token
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT verification token sent to the user's email
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email verified successfully. You can now log in.
 *       400:
 *         description: Token is missing or invalid
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out a user and invalidate the refresh token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token to be invalidated
 *                 example: "yourRefreshTokenHere"
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successful."
 *       400:
 *         description: Refresh token is required
 *       401:
 *         description: Invalid refresh token
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /auth/resend-verification-email:
 *   post:
 *     summary: Resend the email verification link to the user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Verification email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Verification email sent. Please check your inbox."
 *       400:
 *         description: Email is required or already verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email is already verified."
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found."
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/reset-password-request:
 *   post:
 *     summary: Request a password reset link
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *                 description: The email address associated with the user's account
 *     responses:
 *       200:
 *         description: Password reset link sent to the user's email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset link sent to your email.
 *       400:
 *         description: Email is required
 *       404:
 *         description: Email not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset the user's password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *                 description: The JWT token sent to the user's email
 *               newPassword:
 *                 type: string
 *                 example: NewSecurePassword123
 *                 description: The user's new password
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset successfully.
 *       400:
 *         description: Token or new password is missing
 *       403:
 *         description: Invalid or expired token
 *       500:
 *         description: Internal server error
 */
