import { OpenAPIV3 } from 'openapi-types';

export const getConfigListSwagger: OpenAPIV3.OperationObject = {
    summary: 'Get config list',
    description: 'Get config list',
    tags: ['Config Params'],
    security: [
        {
            'Bearer': [],
        },
    ],
    responses: {
        '200': {
            description: 'Success',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                nome_parametro: { type: 'string' },
                                valor_parametro: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
    },
};
