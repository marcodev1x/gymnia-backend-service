import Joi from 'joi';

export const createRecoveryTrySchema = Joi.object({
    email: Joi.string().required().email(),
});

export const validateRecoveryTrySchema = Joi.object({
    token: Joi.string().required(),
});

export const finishRecoveryPasswordSchema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required().min(6).max(128),
});
