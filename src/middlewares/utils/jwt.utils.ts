import jwt from 'jsonwebtoken';
import { authConfig } from '~/config/auth.config';

export interface JwtPayload {
    id: number;
}

export const generateJwtToken = (payload: JwtPayload) => {
    if (!authConfig.jwtSecretKey) {
        throw new Error('JWT secret key not found');
    }

    return jwt.sign(payload, authConfig.jwtSecretKey,
        {
            expiresIn: authConfig.jwtExpiresIn || '1h',
        },
    );
};

export const verifyJwtToken = (token: string) => {
    if (!token) {
        throw new Error('Token not found');
    }

    return jwt.verify(token, authConfig.jwtSecretKey);
};
