import { NextFunction, Response } from 'express';
import { RequestMiddleware } from '~/types/RequestMiddleware';
import { JwtPayload, verifyJwtToken } from './utils/jwt.utils';
import { JsonWebTokenError } from 'jsonwebtoken';
import { SendHttpError } from '~/generic-errors';
import { userService } from '~/domains/users/controller';

export async function authentication(request: RequestMiddleware, _response: Response, next: NextFunction) {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        throw SendHttpError({ error: 'UNAUTHORIZED_TOKEN_NOT_FOUND' });
    };

    try {
        const user = verifyJwtToken(token) as JwtPayload;

        if (!user.id) {
            throw SendHttpError({ error: 'UNAUTHORIZED_INVALID_TOKEN' });
        }

        const userFound = await userService.findById(user.id);

        request.user = userFound;

        next();
    } catch (e) {
        if (e instanceof JsonWebTokenError) {
            throw SendHttpError({ error: 'UNAUTHORIZED_INVALID_TOKEN' });
        }

        throw e;
    }

}
