import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { isDevelopment } from '~/global';
import { createValidationError } from '~/generic-errors';

export const validateBodyRequest = (schema: Joi.ObjectSchema) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const {
            error,
            value,
        } = schema.validate(request.body, { abortEarly: false });

        if (error || !value) {
            console.warn(error);

            response.status(400).json({
                info: 'Algumas informações estão faltando ou no formato incorreto.',
                details: isDevelopment ? createValidationError('body', error) : undefined,
            });
            return;
        }
        request.body = value;
        next();
    };
};
