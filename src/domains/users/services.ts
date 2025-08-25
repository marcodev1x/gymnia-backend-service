import { GymniaUser } from '~/domains/users/model';
import { GymniaUserRepository } from '~/domains/users/repository';
import { generateJwtToken } from '~/middlewares/utils/jwt.utils';
import { removeSensitiveData } from './helpers';
import { ThrowHttpError } from '~/generic-errors';

export class GymniaUserService {
  constructor(private gymniaUserRepository: GymniaUserRepository) {}

  async createUser(user: GymniaUser): Promise<{ user: Partial<GymniaUser>, token: string} | null> {
    const userAlwaysExists = await this.gymniaUserRepository.userExists(user.email);
    console.log(userAlwaysExists);

    if (userAlwaysExists) {
      throw ThrowHttpError({ element: 'User', error: 'ALREADY_EXISTS' });
    }

    const secretHashed = await GymniaUser.hashSecret(user.secret);
    const userCreated = await this
      .gymniaUserRepository
      .createUser({ ...user, secret: secretHashed });

    if (!userCreated) {
      throw ThrowHttpError({ element: 'User', error: 'NOT_CREATED' });
    }

    const token = generateJwtToken({ ...userCreated });

    return {
      user: removeSensitiveData(userCreated),
      token,
    };
  }

  async loginUser(email: string, password: string): Promise<{ token: string }> {
    const user = await this.gymniaUserRepository.findByEmail({ userEmail: email, getSensitiveData: true });

    if (!user) {
      throw ThrowHttpError({ element: 'User', error: 'NOT_FOUND' });
    }

    const secretValid = await GymniaUser.confirmSecret(password, user.secret);

    if (!secretValid) {
      throw ThrowHttpError({ error: 'UNAUTHORIZED_INVALID_TOKEN' });
    }

    return {
      token: generateJwtToken(user),
    };
  }
}
