import Joi from 'joi';

export const correctEssaySchema = Joi.object({
    try_id: Joi
        .number()
        .required()
        .positive()
        .integer()
        .min(1)
        .error(new Error('ID da tentativa inválido.')),
    theme_id: Joi
        .number()
        .required()
        .positive()
        .integer()
        .min(1),
    essay: Joi.object({
        title: Joi
            .string()
            .required(),
        content: Joi
            .string()
            .required(),
    }),
});

export const saveEssayDraftSchema = Joi.object({
    try_id: Joi.number()
        .positive()
        .integer()
        .min(1)
        .required()
        .error(new Error('ID da tentativa inválido.')),
    essay: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
    }),
});

export const createEssayTrySchema = Joi.object({
    essay_theme_id: Joi.number()
        .positive()
        .integer()
        .min(1)
        .required()
        .error(new Error('ID do tema inválido.')),
});
