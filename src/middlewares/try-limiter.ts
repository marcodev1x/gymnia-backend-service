import { Request, Response, NextFunction } from 'express';
import { getRedisClient } from '~/redis';
import { SendTryError } from '~/errors/try-errors';

export async function tryLimiter(
    request: Request,
    _response: Response,
    next: NextFunction,
) {
    const redisClient = getRedisClient();
    const { user } = request;
    const date = new Date();

    const dateSetup = {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
    };

    const keyRedisValue = `try-counter:${user!.id}:${dateSetup.year}-${dateSetup.month}-${dateSetup.day}`;

    const counterDiaryLimited = Number(await redisClient.get(keyRedisValue)) || 0;

    if (counterDiaryLimited > 3) {
        throw SendTryError('DAILY_LIMIT_REACHED');
    }

    const multi = getRedisClient().multi();
    multi.incr(keyRedisValue);
    multi.expire(keyRedisValue, 24 * 60 * 60);
    await multi.exec();
    next();
}
