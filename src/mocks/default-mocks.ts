import { Response } from 'express';

export const expressMock = {
    response: {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
    } as unknown as Response,
    next: jest.fn(),
};
