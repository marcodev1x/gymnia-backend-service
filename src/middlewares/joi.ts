import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { createValidationError } from '~/generic-errors';
import logger from '~/logger';
import { isDevelopment } from '~/global';

interface JoiValidator {
    schema: Joi.ObjectSchema;
    type: 'body' | 'query' | 'file' | 'params';
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
    requiredFile = false,
    schema,
    type,
    jsonFields = [],
}: {
    requiredFile?: boolean;
    schema: Joi.ObjectSchema;
    type: 'body' | 'query' | 'file';
    jsonFields?: string[];
}) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (requiredFile && !req.file) {
            res.status(400).json({ error: 'Arquivo é obrigatório' });
            return;
        }

        for (const field of jsonFields) {
            if (req.body[field]) {
                try {
                    req.body[field] = JSON.parse(req.body[field]);
                } catch {
                    return res.status(400).json({ error: `Campo ${field} está em formato inválido.` });
                }
            }
        }

        return validateRequest({ schema, type })(req, res, next);
    };
}
