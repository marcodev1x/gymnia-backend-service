import { GymniaUser } from './model';

export interface GymniaUserRepository {
    createUser(user: Partial<GymniaUser>): Promise<GymniaUser | null>;
    findByEmail(userEmail: string): Promise<boolean>;
};

export class GymniaUserImplementation implements GymniaUserRepository {
  async findByEmail(userEmail: string): Promise<boolean> {
    const user = await GymniaUser
      .query()
      .select('email')
      .where('email', userEmail)
      .first();

    return !!user;
  }

  async createUser(user: Partial<GymniaUser>): Promise<GymniaUser | null> {
    const userCreated = await GymniaUser
      .query()
      .insertAndFetch(user);

    return userCreated;
  }
}
