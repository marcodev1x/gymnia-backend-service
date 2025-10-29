import Joi from 'joi';

export const getThemeByIdSchema = Joi.object({
    id: Joi
        .number()
        .required()
        .positive()
        .integer()
        .min(1),
});

export const createThemaSchema = Joi.object({
    theme: Joi.object({
        theme_title: Joi
            .string()
            .required(),
        theme_description: Joi
            .string()
            .required(),
        limit_lines: Joi
            .number()
            .required(),
    }).required(),
    classification: Joi.object({
        category_id: Joi
            .number()
            .optional()
            .positive()
            .min(1),
        difficulty_level_id: Joi
            .number()
            .optional()
            .positive()
            .min(1),
        pedagogical_origin_id: Joi
            .number()
            .optional()
            .positive()
            .min(1),
    }).optional(),
});
