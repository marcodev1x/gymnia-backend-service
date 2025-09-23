import { readFileSync } from 'fs';
import { appConfig } from './config/app.config';
import { dbConfig } from './config/db.config';

const baseConfig = {
    client: dbConfig.client || 'pg',
    connection: {
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.accessUser,
        password: dbConfig.accessPassword,
        database: dbConfig.name,
        ssl: dbConfig.sslMode === 'require' ? { rejectUnauthorized: false } : false,
    },
};

export const baseConfigSpro = {
    client: 'mysql2',
    connection: {
        host: dbConfig.spro.host,
        port: dbConfig.spro.port,
        user: dbConfig.spro.accessUser,
        password: dbConfig.spro.accessPassword,
        database: dbConfig.spro.name,
        charset: 'utf8mb4',
        decimalNumbers: true,

        ssl: dbConfig.spro.sslCa && dbConfig.spro.sslCert && dbConfig.spro.sslKey ? {
            ca: readFileSync(dbConfig.spro.sslCa),
            cert: readFileSync(dbConfig.spro.sslCert),
            key: readFileSync(dbConfig.spro.sslKey),
        } : undefined,

        typeCast(field, next) {
            const {
                type, length, string,
            } = field;

            if (type === 'TINY' && length === 1) {
                const value = string();
                switch (value) {
                case '1': return true;
                case '0': return false;
                default: return value;
                }
            }

            if (type === 'DATE') {
                return string();
            }

            return next();
        },

        pool: {
            min: 0,
            max: 10,
        },
    },
};

const isDevelopment = appConfig.local === 'development';

export default {
    ...baseConfig,
    debug: isDevelopment,
};
