import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType;

export async function redisSetup(url: string) {
    redisClient = createClient({
        url,
    });

    redisClient.on('error', (e) => logger.error('Redis error:', e));

    await redisClient.connect();
    logger.info('Redis connected');

    return redisClient;
}

export function getRedisClient() {
    if (!redisClient) throw new Error('Redis not initialized');
    return redisClient;
}
