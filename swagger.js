const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dental App API',
      version: '1.0.0',
      description: 'API documentation for the Dental App system',
    },
    servers: [
      {
        url: 'http://localhost:8082', // Base URL of your API
      },
    ],
  },
  apis: ['./docs/*.js'], // Ensure this line is correct
};

// Swagger Docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };