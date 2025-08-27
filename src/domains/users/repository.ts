import { GymniaUser } from './model';
import { removeSensitiveData } from '~/domains/users/helpers';

type findByEmailParams = { userEmail: string, needData?: boolean, getSensitiveData?: boolean };

export interface GymniaUserRepository {
    createUser(user: Partial<GymniaUser>): Promise<GymniaUser | null>;
    findByEmail({ userEmail, needData }: findByEmailParams): Promise<GymniaUser | undefined>;
    userExists(userEmail: string): Promise<boolean | undefined>;
    getUserSecret(userEmail: string): Promise<GymniaUser | undefined>;
};

export class GymniaUserImplementation implements GymniaUserRepository {
    async findByEmail({
        userEmail,
        getSensitiveData,
    }: findByEmailParams): Promise<GymniaUser | undefined> {
        let user = await GymniaUser
            .query()
            .select('*')
            .where('email', userEmail)
            .first();

        if (!getSensitiveData && user) user = removeSensitiveData(GymniaUser.fromJson(user));

        return user;
    }

    async userExists(userEmail: string): Promise<boolean | undefined> {
        return !!await GymniaUser
            .query()
            .select('email')
            .where('email', userEmail)
            .first();
    }

    async createUser(user: Partial<GymniaUser>): Promise<GymniaUser | null> {
        return GymniaUser
            .query()
            .insertAndFetch(user);
    }

    async getUserSecret(userEmail: string): Promise<GymniaUser | undefined> {
        return GymniaUser
            .query()
            .select(['secret'])
            .where('email', userEmail)
            .first();
    }
}
