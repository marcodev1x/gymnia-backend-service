import { GymniaUser } from '~/domains/users/model';
import { GymniaUserRepository } from '~/domains/users/repository';
import { generateJwtToken } from '~/middlewares/utils/jwt.utils';
import { removeSensitiveData } from './helpers';
import { SendHttpError } from '~/generic-errors';

interface CreateUserAsync {
    user: GymniaUser;
    token: string;
}

export class GymniaUserService {
    constructor(private gymniaUserRepository: GymniaUserRepository) {}

    async createUser(user: GymniaUser): Promise<CreateUserAsync | null> {
        const userAlwaysExists = await this.gymniaUserRepository.userExists(user.email);

        if (userAlwaysExists) {
            throw SendHttpError({ element: 'User', error: 'ALREADY_EXISTS' });
        }

        const secretHashed = await GymniaUser.hashSecret(user.secret);

        const userCreated = await this
            .gymniaUserRepository
            .createUser({ ...user, secret: secretHashed });

        if (!userCreated) {
            throw SendHttpError({ element: 'User', error: 'NOT_CREATED' });
        }

        return {
            user: removeSensitiveData(userCreated),
            token: generateJwtToken({ ...userCreated }),
        };
    }

    async loginUser(email: string, password: string): Promise<{ token: string }> {
        const user = await this.gymniaUserRepository.findByEmail({ userEmail: email, getSensitiveData: true });

        if (!user) {
            throw SendHttpError({ element: 'User', error: 'NOT_FOUND' });
        }

        const secretValid = await GymniaUser.confirmSecret(password, user.secret);

        if (!secretValid) {
            throw SendHttpError({ error: 'UNAUTHORIZED_INVALID_TOKEN' });
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            deleted: user.deleted,
            user_role: user.permissions?.role_name,
        };

        return {
            token: generateJwtToken(payload),
        };
    }
}
