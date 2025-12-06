import { User, UserWithPermissions } from '~/domains/users/model';
import { UserRepository } from '~/domains/users/repository';
import { generateJwtToken } from '~/middlewares/utils/jwt.utils';
import { removeSensitiveData } from './helpers';
import { DefaultHttpError } from '~/generic-errors';
import { Mailer } from '~/mail/mailer';

interface CreateUserAsync {
    user: User;
    token: string;
}

export class UserService {
    constructor(private userRepository: UserRepository) {}

    email() {
        return new Mailer();
    }

    async createUser(user: User): Promise<CreateUserAsync | null> {
        const userAlwaysExists = await this.userRepository.userExists(user.email);

        if (userAlwaysExists) {
            throw DefaultHttpError({ element: 'User', error: 'INVALID_ACCESS' });
        }

        const secretHashed = await User.hashSecret(user.secret);

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

        const secretValid = await User.confirmSecret(password, user.secret);

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

    async findByEmail(userEmail: string, needData?: boolean): Promise<UserWithPermissions | undefined> {
        return await this.userRepository.findByEmail({ userEmail, getSensitiveData: needData });
    }
}
