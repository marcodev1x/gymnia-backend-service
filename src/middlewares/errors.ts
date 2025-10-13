import { GenericErrors, isHttpError } from '~/generic-errors';
import { NextFunction, Request, Response } from 'express';
import logger from '~/logger';
import { isDevelopment } from '~/global';

export function errorMiddlewareSent(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
) {
    logger.error(err);

    const code = 'GENERIC_INTERNAL_ERROR';
    const statusCode = GenericErrors().GENERIC_INTERNAL_ERROR.status;
    const message = GenericErrors().GENERIC_INTERNAL_ERROR.message;
    let exception: string | undefined;

    if (isHttpError(err)) {
        res.status(err.status).json({
            error: err.message,
            status: err.status,
            code: err.code,
            timestamp: err.timestamp,
        });
        return;
    }

    res.status(statusCode).json({
        error: {
            code,
            message,
            exception: isDevelopment ? exception : undefined,
        },
    });
    return;
}
