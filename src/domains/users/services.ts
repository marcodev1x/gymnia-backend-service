import { GymniaUser } from '~/domains/users/model';
import { GymniaUserRepository } from '~/domains/users/repository';
import { generateJwtToken } from '~/middlewares/utils/jwt.utils';
import bcrypt from 'bcrypt';
import { removeSensitiveData } from './helpers';
import { ThrowHttpError } from '~/generic-errors';

export class GymniaUserService {
  constructor(private gymniaUserRepository: GymniaUserRepository) {}

  async createUser(user: GymniaUser): Promise<{ userCreated: Partial<GymniaUser>} | null> {
    const userAlwaysExists = await this.gymniaUserRepository.findByEmail(user.email);

    if (userAlwaysExists) {
      throw ThrowHttpError('ALREADY_EXISTS');
    }

    const secretHashed = await this.hashSecret(user.secret);
    const userCreated = await this.gymniaUserRepository.createUser({ ...user, secret: secretHashed });

    if (!userCreated) {
      throw ThrowHttpError('NOT_CREATED');
    }

    const token = generateJwtToken({ ...userCreated });

    return { userCreated: removeSensitiveData(userCreated, token) };
  }

  async hashSecret(secret: string): Promise<string> {
    return await bcrypt.hash(secret, 10);
  }
}
