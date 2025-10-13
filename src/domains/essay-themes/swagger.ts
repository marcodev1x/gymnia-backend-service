import { OpenAPIV3 } from 'openapi-types';

export const getEssayThemesSwagger: OpenAPIV3.OperationObject = {
    summary: 'Get essay themes list',
    description: 'Get essay themes list',
    tags: ['Essay Themes'],
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
                                theme_title: { type: 'string' },
                                theme_description: { type: 'string' },
                                is_active: { type: 'boolean' },
                                limit_lines: { type: 'integer' },
                                difficulty_level: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
    },
};
