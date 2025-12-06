const {
    DEFAULT_PORT,
    LOCAL,
    AI_API_KEY,
    AI_API_URL,
    AI_API_MODEL,
    BCRYPT_HASH_QUANTITY,
    RENDER_BACKEND_URL,
    REDIS_URL,
    AI_DEFAULT_TRACKING_URL,
    PRINCIPAL_FRONT_URL,
} = process.env;

export const appConfig = {
    local: LOCAL,
    port: DEFAULT_PORT,
    aiApiKey: AI_API_KEY,
    aiApiUrl: AI_API_URL,
    aiApiModel: AI_API_MODEL,
    bcryptHashQuantity: Number(BCRYPT_HASH_QUANTITY),
    renderBackendUrl: RENDER_BACKEND_URL,
    aiDefaultTrackingUrl: AI_DEFAULT_TRACKING_URL,
    redisUrl: REDIS_URL,
    principalFrontUrl: PRINCIPAL_FRONT_URL,
};
