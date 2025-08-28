import dotenv from 'dotenv';

dotenv.config();

const {
    JWT_SECRET_KEY,
    JWT_EXPIRES_IN,
} = process.env;

export const authConfig = {
    jwtSecretKey: String(JWT_SECRET_KEY),
    jwtExpiresIn: Number(JWT_EXPIRES_IN),
};
