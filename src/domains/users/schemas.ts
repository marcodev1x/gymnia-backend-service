import Joi from 'joi';

export const createUserSchema = Joi.object({
    user: Joi.object({
        name: Joi.string().required().min(3).max(128),
        email: Joi.string().required().email(),
        secret: Joi.string().required().min(6).max(128),
    }).required(),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(128),
});

export const loginWithGoogleSchema = Joi.object({
    id_token: Joi.string().required(),
});
