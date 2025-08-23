import Joi from 'joi';

export const getThemeByIdSchema = Joi.object({
  id: Joi
    .number()
    .required()
    .positive()
    .integer()
    .min(1),
});

export const sendToAiSchema = Joi.object({
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
