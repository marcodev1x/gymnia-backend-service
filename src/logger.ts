import { createLogger, format, transports } from 'winston';
import { isDevelopment } from '~/global';

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] [${level}]: ${stack || message}`;
});

const logger = createLogger({
    level: isDevelopment ? 'debug' : 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat,
    ),
    transports: [
        new transports.Console({
            format: combine(
                colorize(),
                logFormat,
            ),
        }),

        new transports.File({ filename: 'logs/error.log', level: 'error' }),

        new transports.File({ filename: 'logs/combined.log' }),
    ],
});

if (!isDevelopment) {
    logger.add(new transports.Console({
        format: combine(timestamp(), format.simple()),
    }));
}

Object.defineProperty(globalThis, 'logger', {
    value: logger,
    writable: false,
});
export default logger;
