import { User, UserWithPermissions } from '~/domains/users/model';
import { UserRepository } from '~/domains/users/repository';
import { generateJwtToken } from '~/middlewares/utils/jwt.utils';
import { removeSensitiveData } from './helpers';
import { DefaultHttpError } from '~/generic-errors';
import { OAuth2Client } from 'google-auth-library';
import { authConfig } from '~/config/auth.config';

interface CreateUserAsync {
    user: User;
    token: string;
}

const client = new OAuth2Client(authConfig?.googleOauthClientId);

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async createUser(user: User): Promise<CreateUserAsync | null> {
        const userAlwaysExists = await this.userRepository.userExists(user.email);

        if (userAlwaysExists) {
            throw DefaultHttpError({ element: 'User', error: 'INVALID_ACCESS' });
        }

        const secretHashed = await User.hashSecret(user.secret!);

        const userCreated = await this
            .userRepository
            .createUser({ ...user, secret: secretHashed });

        const sendUserToJwt = { ...userCreated };

        if (!userCreated) {
            throw DefaultHttpError({ element: 'User', error: 'NOT_CREATED' });
        }

        return {
            user: removeSensitiveData(userCreated),
            token: generateJwtToken({ id: sendUserToJwt.id! }),
        };
    }

    async findById(id: number): Promise<UserWithPermissions | undefined> {
        return this.userRepository.findById(id);
    }

    async loginUser(email: string, password: string): Promise<{ token: string }> {
        const user = await this.userRepository.findByEmail({ userEmail: email, getSensitiveData: true });

        if (!user) {
            throw DefaultHttpError({ error: 'INVALID_ACCESS' });
        }

        const secretValid = await User.confirmSecret(password, user.secret!);

        if (!secretValid) {
            throw DefaultHttpError({ error: 'INVALID_ACCESS' });
        }

        const payload = {
            id: user.id,
        };

        return {
            token: generateJwtToken(payload),
        };
    }

    async findByEmail(userEmail: string, needData?: boolean): Promise<UserWithPermissions> {
        const user =  await this.userRepository.findByEmail({ userEmail, getSensitiveData: needData });

        if (!user) {
            throw DefaultHttpError({ error: 'NOT_FOUND' });
        }

        return user;
    }

    async updateUserPassword(userId: number, password: string): Promise<true | undefined> {
        const convertedPassword = await User.hashSecret(password);

        const updatedUserPwd = await this.userRepository.updateUserPassword(userId, convertedPassword);

        if (!updatedUserPwd) {
            throw DefaultHttpError({ element: 'User', error: 'NOT_UPDATED' });
        }

        return true;
    }

    async loginWithGoogle(idToken: string): Promise<{ token: string }> {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: authConfig?.googleOauthClientId,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            throw DefaultHttpError({ error: 'INVALID_ACCESS' });
        }

        const user = await this.userRepository.findOrCreateOauthUser({
            email: payload.email!,
            providerId: payload.sub,
            name: payload.name!,
        });

        if (!user) {
            throw DefaultHttpError({ error: 'INVALID_ACCESS' });
        }

        return {
            token: generateJwtToken({ id: user.id }),
        };
    }
}
