import { User } from '~/domains/users/model';
import { UserRepository } from '~/domains/users/repository';
import { generateJwtToken } from '~/middlewares/utils/jwt.utils';
import { removeSensitiveData } from './helpers';
import { SendHttpError } from '~/generic-errors';

interface CreateUserAsync {
    user: User;
    token: string;
}

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async createUser(user: User): Promise<CreateUserAsync | null> {
        const userAlwaysExists = await this.userRepository.userExists(user.email);

        if (userAlwaysExists) {
            throw SendHttpError({ element: 'User', error: 'ALREADY_EXISTS' });
        }

        const secretHashed = await User.hashSecret(user.secret);

        const userCreated = await this
            .userRepository
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
        const user = await this.userRepository.findByEmail({ userEmail: email, getSensitiveData: true });

        if (!user) {
            throw SendHttpError({ element: 'User', error: 'NOT_FOUND' });
        }

        const secretValid = await User.confirmSecret(password, user.secret);

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
