const {
    DB_CLIENT,
    DB_ACCESS_USER,
    DB_ACCESS_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_CHANNEL_BINDING,
    DB_SSL_MODE,
} = process.env;

export const dbConfig = {
    client: DB_CLIENT,
    accessUser: DB_ACCESS_USER,
    accessPassword: DB_ACCESS_PASSWORD,
    host: DB_HOST,
    port: Number(DB_PORT),
    name: DB_NAME,
    channelBinding: DB_CHANNEL_BINDING,
    sslMode: DB_SSL_MODE,
};
