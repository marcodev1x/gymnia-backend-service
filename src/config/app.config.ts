import dotenv from 'dotenv';

dotenv.config();

const {
    DEFAULT_PORT,
    LOCAL,
    ZAI_API_KEY,
    ZAI_API_URL,
    ZAI_API_MODEL,
    BCRYPT_HASH_QUANTITY,
    RENDER_BACKEND_URL,
} = process.env;

export const appConfig = {
    local: LOCAL,
    port: DEFAULT_PORT,
    zaiApiKey: ZAI_API_KEY,
    zaiApiUrl: ZAI_API_URL,
    zaiApiModel: ZAI_API_MODEL,
    bcryptHashQuantity: Number(BCRYPT_HASH_QUANTITY),
    renderBackendUrl: RENDER_BACKEND_URL,
};
