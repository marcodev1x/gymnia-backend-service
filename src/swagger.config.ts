import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Gymnia API',
            version: '1.0.0',
            description: 'Gymnia API documentation',
        },
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
        },
    ],
    apis: ['./src/domains/**/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
