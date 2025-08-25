import { GymniaUser } from './model';

type findByEmailParams = { userEmail: string, needData?: boolean };

export interface GymniaUserRepository {
    createUser(user: Partial<GymniaUser>): Promise<GymniaUser | null>;
    findByEmail({ userEmail, needData }: findByEmailParams): Promise<GymniaUser | boolean | undefined>;
};

export class GymniaUserImplementation implements GymniaUserRepository {
  async findByEmail({ userEmail, needData }: findByEmailParams): Promise<GymniaUser | boolean | undefined> {
    const user = await GymniaUser
      .query()
      .select('email')
      .where('email', userEmail)
      .first();

    return needData ? user : !!user;
  }

  async createUser(user: Partial<GymniaUser>): Promise<GymniaUser | null> {
    return GymniaUser
      .query()
      .insertAndFetch(user);
  }
}
