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

const isDevelopment = appConfig.local === 'development';

export default {
    ...baseConfig,
    debug: isDevelopment,
};
