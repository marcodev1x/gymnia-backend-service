import { NextFunction, Request, Response } from 'express';
import { DefaultHttpError } from '~/generic-errors';

const LIMITED_LIMIT = 100;

export const pagination = (request: Request, _response: Response, next: NextFunction) => {
    const { page = 1, limit = 10 } = request.query;

    if (isNaN(Number(page)) || isNaN(Number(limit)) || Number(page) <= 0 || Number(limit) <= 0) {
        throw DefaultHttpError({ error: 'INVALID_PAGINATION_PARAMS' });
    }

    request.pagination = {
        page: Number(page),
        limit: Number(limit) > LIMITED_LIMIT ? LIMITED_LIMIT : Number(limit),
        offset: page && limit ? (Number(page) - 1) * Number(limit) : 0,
    };

    next();
};
