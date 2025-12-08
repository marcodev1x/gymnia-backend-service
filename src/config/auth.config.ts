const {
    JWT_SECRET_KEY,
    JWT_EXPIRES_IN,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} = process.env;

export const authConfig = {
    jwtSecretKey: String(JWT_SECRET_KEY),
    jwtExpiresIn: Number(JWT_EXPIRES_IN),
    googleOauthClientId: String(GOOGLE_CLIENT_ID),
    googleOauthClientSecret: String(GOOGLE_CLIENT_SECRET),
};
