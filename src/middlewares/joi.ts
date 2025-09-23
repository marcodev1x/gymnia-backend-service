import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { isDevelopment } from '~/global';
import { createValidationError } from '~/generic-errors';

interface JoiValidator {
    schema: Joi.ObjectSchema;
    type: 'body' | 'query' | 'file';
    abortEarly?: boolean;
    stripUnknown?: boolean;
    allowUnknown?: boolean;
    convert?: boolean;
}

export const validateRequest = ({
    schema,
    type,
    abortEarly = false,
    stripUnknown = true,
    allowUnknown = true,
    convert = false,
}: JoiValidator) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const {
            error,
            value,
        } = schema.validate(request[type], {
            abortEarly,
            stripUnknown,
            allowUnknown,
            convert,
        },
        );

        if (error || !value) {
            logger.warn(error);

            response.status(400).json({
                info: 'Algumas informações estão faltando ou no formato incorreto.',
                details: isDevelopment ? createValidationError(type, error) : undefined,
            });
            return;
        }
        request[type] = value;
        next();
    };
};

export function validateRequestAndFile({
    required = false,
    schema,
    type,
    nameBody,
}: {
    required?: boolean;
    schema: Joi.ObjectSchema;
    type: 'body' | 'query' | 'file';
    nameBody: string;
}) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (required && !req.file) {
            res.status(400).json({ error: 'Arquivo é obrigatório' });
            return;
        }

        if (req.body[nameBody]) {
            req.body[nameBody] = JSON.parse(req.body[nameBody]);

            return validateRequest({ schema, type })(req, res, next);
        }
        next();
    };
}
