import Joi from 'joi';

export const createRecoveryTrySchema = Joi.object({
    email: Joi.string().required().email(),
});
