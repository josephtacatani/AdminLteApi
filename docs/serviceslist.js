/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the service.
 *           example: 1
 *         service_name:
 *           type: string
 *           description: Name of the service.
 *           example: "Dental Checkup"
 *         title:
 *           type: string
 *           description: Title of the service.
 *           example: "Comprehensive Dental Checkup"
 *         content:
 *           type: string
 *           description: Description of the service.
 *           example: "A thorough examination of your dental health."
 *         photo:
 *           type: string
 *           description: URL or filename of the service photo.
 *           example: "http://example.com/photo.jpg"
 */

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: API endpoints for managing dental services
 */

/**
 * @swagger
 * /serviceslist:
 *   get:
 *     summary: Retrieve all services
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of all services.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Services retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Service'
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /serviceslist/{id}:
 *   get:
 *     summary: Retrieve a specific service by ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the service.
 *     responses:
 *       200:
 *         description: Successfully retrieved the service.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Service retrieved successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /serviceslist:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_name:
 *                 type: string
 *                 example: "Dental Checkup"
 *               title:
 *                 type: string
 *                 example: "Comprehensive Dental Checkup"
 *               content:
 *                 type: string
 *                 example: "A thorough examination of your dental health."
 *               photo:
 *                 type: string
 *                 example: "http://example.com/photo.jpg"
 *     responses:
 *       201:
 *         description: Successfully created a new service.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Service created successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Service'
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /serviceslist/{id}:
 *   put:
 *     summary: Update an existing service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the service to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_name:
 *                 type: string
 *                 example: "Updated Dental Checkup"
 *               title:
 *                 type: string
 *                 example: "Updated Comprehensive Dental Checkup"
 *               content:
 *                 type: string
 *                 example: "An updated description of your dental health."
 *               photo:
 *                 type: string
 *                 example: "http://example.com/updated_photo.jpg"
 *     responses:
 *       200:
 *         description: Successfully updated the service.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Service updated successfully."
 *       404:
 *         description: Service not found.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /serviceslist/{id}:
 *   delete:
 *     summary: Delete a service by ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the service to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted the service.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Service deleted successfully."
 *       404:
 *         description: Service not found.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 *       500:
 *         description: Internal Server Error.
 */
