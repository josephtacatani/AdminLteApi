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
 *           description: Unique identifier for the service
 *           example: 1
 *         service_name:
 *           type: string
 *           description: Name of the service
 *           example: Dental Checkup
 *         title:
 *           type: string
 *           description: Title of the service
 *           example: Comprehensive Dental Checkup
 *         content:
 *           type: string
 *           description: Description of the service
 *           example: A thorough examination of your dental health.
 *         photo:
 *           type: string
 *           description: URL or filename of the service photo
 *           example: http://example.com/photo.jpg
 */

/**
 * @swagger
 * tags:
 *   name: ServicesList
 *   description: API endpoints for managing services
 */

/**
 * @swagger
 * /serviceslist:
 *   get:
 *     summary: Get all services
 *     tags: [ServicesList]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /serviceslist/{id}:
 *   get:
 *     summary: Get a specific service by ID
 *     tags: [ServicesList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the service
 *     responses:
 *       200:
 *         description: Service retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /serviceslist:
 *   post:
 *     summary: Create a new service
 *     tags: [ServicesList]
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
 *                 example: Dental Checkup
 *               title:
 *                 type: string
 *                 example: Comprehensive Dental Checkup
 *               content:
 *                 type: string
 *                 example: A thorough examination of your dental health.
 *               photo:
 *                 type: string
 *                 example: http://example.com/photo.jpg
 *     responses:
 *       201:
 *         description: Service created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /serviceslist/{id}:
 *   put:
 *     summary: Update a service
 *     tags: [ServicesList]
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
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       404:
 *         description: Service not found
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */

/**
 * @swagger
 * /serviceslist/{id}:
 *   delete:
 *     summary: Delete a service
 *     tags: [ServicesList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */
