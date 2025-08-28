import { GymniaUser, GymniaUserWithPermissions } from './model';
import { removeSensitiveData } from '~/domains/users/helpers';

type findByEmailParams = { userEmail: string, needData?: boolean, getSensitiveData?: boolean };

export interface GymniaUserRepository {
    createUser(user: Partial<GymniaUser>): Promise<GymniaUserWithPermissions | null>;
    findByEmail({ userEmail, needData }: findByEmailParams): Promise<GymniaUserWithPermissions | undefined>;
    userExists(userEmail: string): Promise<boolean | undefined>;
    getUserSecret(userEmail: string): Promise<GymniaUser | undefined>;
    getUserRole(userEmail: string): Promise<string | undefined>;
};

export class GymniaUserImplementation implements GymniaUserRepository {
    async findByEmail({
        userEmail,
        getSensitiveData,
    }: findByEmailParams): Promise<GymniaUserWithPermissions | undefined> {
        const user = await GymniaUser
            .query()
            .select('*')
            .where('email', userEmail)
            .modifyGraph('permissions', builder => {
                builder.select('role_name');
            })
            .first();

        if (!user) return undefined;

        return getSensitiveData ? user as GymniaUserWithPermissions : removeSensitiveData(user);
    }

    async userExists(userEmail: string): Promise<boolean | undefined> {
        return !!await GymniaUser
            .query()
            .select('email')
            .where('email', userEmail)
            .first();
    }

    async createUser(user: Partial<GymniaUser>): Promise<GymniaUserWithPermissions | null> {
        const query = await GymniaUser
            .query()
            .modifyGraph('permissions', (builder) => {
                builder.select('role_name');
            })
            .withGraphFetched('permissions')
            .insertGraphAndFetch(user);

        return query as GymniaUserWithPermissions;
    }

    async getUserSecret(userEmail: string): Promise<GymniaUser | undefined> {
        return GymniaUser
            .query()
            .select(['secret'])
            .where('email', userEmail)
            .first();
    }

    async getUserRole(userEmail: string): Promise<string | undefined> {
        const user = await GymniaUser
            .query()
            .select('user_role_id')
            .modifyGraph('permissions', builder => {
                builder.select('role_name');
            })
            .findOne({ email: userEmail }) as GymniaUserWithPermissions;

        if (!user) return undefined;

        return user.permissions?.role_name;
    }
}
