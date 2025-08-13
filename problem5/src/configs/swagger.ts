import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import configs from '@configs';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Problem 5 - Express TypeScript API',
      version: '1.0.0',
      description: `
        A RESTful API built with Express.js, TypeScript, MySQL, and TypeORM.
        Features user management, authentication middleware, and comprehensive testing.
      `,
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${configs.server.port}`,
        description: 'Development server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Docker development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'username'],
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.doe@example.com',
            },
            username: {
              type: 'string',
              description: 'Unique username',
              example: 'johndoe',
            },
            status: {
              type: 'string',
              enum: ['active', 'inactive', 'pending'],
              description: 'User account status',
              example: 'active',
            },
            isActive: {
              type: 'integer',
              description: 'Whether user is active (1) or not (0)',
              example: 1,
            },
            avatar: {
              type: 'string',
              description: 'User avatar URL',
              example: 'https://example.com/avatar.jpg',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
              example: '2023-12-19T10:00:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
              example: '2023-12-19T10:00:00Z',
            },
          },
        },
        CreateUserDto: {
          type: 'object',
          required: ['name', 'email', 'username'],
          properties: {
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.doe@example.com',
            },
            username: {
              type: 'string',
              description: 'Unique username',
              example: 'johndoe',
            },
            status: {
              type: 'string',
              enum: ['active', 'inactive', 'pending'],
              description: 'User account status',
              example: 'active',
            },
            isActive: {
              type: 'integer',
              description: 'Whether user is active (1) or not (0)',
              example: 1,
            },
            avatar: {
              type: 'string',
              description: 'User avatar URL',
              example: 'https://example.com/avatar.jpg',
            },
          },
        },
        UpdateUserDto: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe Updated',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.updated@example.com',
            },
            username: {
              type: 'string',
              description: 'Unique username',
              example: 'johndoe_updated',
            },
            status: {
              type: 'string',
              enum: ['active', 'inactive', 'pending'],
              description: 'User account status',
              example: 'inactive',
            },
            isActive: {
              type: 'integer',
              description: 'Whether user is active (1) or not (0)',
              example: 0,
            },
            avatar: {
              type: 'string',
              description: 'User avatar URL',
              example: 'https://example.com/new-avatar.jpg',
            },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            code: {
              type: 'integer',
              description: 'Response status code',
              example: 200,
            },
            message: {
              type: 'string',
              description: 'Response message',
              example: 'Success',
            },
            data: {
              type: 'object',
              description: 'Response data',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            errorCode: {
              type: 'integer',
              description: 'Application specific error code',
              example: 10002,
            },
            message: {
              type: 'string',
              description: 'Error message',
              example: 'Email or username is invalid or has been used!',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './src/routes/*.ts',
    './src/components/**/*.ts',
    './src/app.ts',
  ],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Problem 5 API Documentation',
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  }));

  // Serve swagger.json
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};

export { specs }; 