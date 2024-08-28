const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Personal Portfolio APIs',
    version: '1.0.0',
    description: 'API documentation for NTI final project',
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Local server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./dist/routes/*.js'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };