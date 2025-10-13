import { NextFunction, Request, Response } from 'express';

export const paginationMiddleware = (request: Request, _response: Response, next: NextFunction) => {
    const { page = 1, limit = 10 } = request.query;

    const pagination = {
        page: Number(page),
        limit: Number(limit),
        offset: (Number(page) - 1) * Number(limit),
    };

    request.pagination = pagination;

    next();
};
