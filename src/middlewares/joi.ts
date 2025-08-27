import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { isDevelopment } from '~/global';

export const validateBodyRequest = (schema: Joi.ObjectSchema) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const {
            error,
            value,
        } = schema.validate(request.body, { abortEarly: false });

        if (error || !value) {
            console.warn(error);

            response.status(400).json({
                info: 'Some informations are missing or incorrectly.',
                details: isDevelopment ? error?.details.map(detail => detail) : undefined,
            });
            return;
        }
        request.body = value;
        next();
    };
};
