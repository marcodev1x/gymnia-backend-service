import { NextFunction, Response } from 'express';
import { RequestMiddleware } from '~/types/RequestMiddleware';
import { verifyJwtToken } from './utils/jwt.utils';
import { GymniaUserWithPermissions } from '~/domains/users/model';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ThrowHttpError } from '~/generic-errors';

export function authentication(request: RequestMiddleware, _response: Response, next: NextFunction) {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        throw ThrowHttpError({ error: 'UNAUTHORIZED_TOKEN_NOT_FOUND' });
    };

    try {
        request.user = verifyJwtToken(token) as GymniaUserWithPermissions;

        next();
    } catch (e) {
        if (e instanceof JsonWebTokenError) {
            throw ThrowHttpError({ error: 'UNAUTHORIZED_INVALID_TOKEN' });
        }

        throw e;
    }

}
