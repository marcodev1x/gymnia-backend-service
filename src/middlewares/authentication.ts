import { NextFunction, Response } from 'express';
import { RequestMiddleware } from '~/types/RequestMiddleware';
import { verifyJwtToken } from './utils/jwt.utils';
import { GymniaUser } from '~/domains/users/model';

export function authentication(request: RequestMiddleware, response: Response, next: NextFunction) {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    const error = new Error('Unauthorized. Token not found.');

    response.status(401).json({
      error: error.message,
    });

    next(error);
    return;
  };

  try {
    const user = verifyJwtToken(token) as Partial<GymniaUser>;

    request.user = user;

    console.warn({ user, token });
    next();
  } catch (e) {
    console.warn(e);
    const error = new Error('Unauthorized. Invalid token.');

    response.status(401).json({
      error: error.message,
    });

    next(error);
  }

}
