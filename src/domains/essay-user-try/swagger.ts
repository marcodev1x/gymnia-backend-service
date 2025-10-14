import { OpenAPIV3 } from 'openapi-types';

export const correctEssaySwagger: OpenAPIV3.OperationObject = {
    summary: 'Correct essay',
    description: 'Correct essay',
    tags: ['Essay User Try'],
    security: [
        {
            'Bearer': [],
        },
    ],
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        try_id: {
                            type: 'number',
                        },
                        theme_id: {
                            type: 'number',
                        },
                        essay: {
                            example: {
                                title: 'Essay title',
                                content: 'Essay content',
                            },
                        },
                    },
                },
            },
        },
    },
    responses: {
        '200': {
            description: 'Success',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            initial_check: {
                                type: 'object',
                                properties: {
                                    eliminatory_cases: {
                                        type: 'boolean',
                                    },
                                    observation: {
                                        type: 'string',
                                    },
                                },
                            },
                            points_to_improve: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        excerpt: {
                                            type: 'string',
                                            example: 'Trecho_Especifico',
                                        },
                                        problem: {
                                            type: 'string',
                                            example: 'Problema_Do_Trecho',
                                        },
                                        suggestion: {
                                            type: 'string',
                                            example: 'Sugestão_de_solução',
                                        },
                                    },
                                },
                            },
                            evaluation: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    example: {
                                        competence: 'Maestria e compreensão da linguagem portuguesa',
                                        score: 200,
                                        level: 'Excelente',
                                        justification: 'Uso válido da norma culta, vocabulário rico e coesão adequada.',
                                    },
                                },
                            },
                            final_result: {
                                type: 'object',
                                properties: {
                                    total_score: {
                                        type: 'number',
                                    },
                                    classification: {
                                        type: 'string',
                                    },
                                },
                                example: {
                                    total_score: 200,
                                    classification: 'Excelente',
                                },
                            },
                            feedback: {
                                type: 'object',
                                properties: {
                                    strenghts: {
                                        type: 'array',
                                        items: {
                                            type: 'string',
                                            example: 'Uso correto da norma culta, vocabulário rico e coesão adequada.',
                                        },
                                    },
                                    main_deficiencies: {
                                        type: 'array',
                                        items: {
                                            type: 'string',
                                            example: 'Falta ser melhor.',
                                        },
                                    },
                                    study_priorities: {
                                        type: 'string',
                                        example: 'Melhore a proposta de intervenção.',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
