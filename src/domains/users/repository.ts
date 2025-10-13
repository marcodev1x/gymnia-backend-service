import { User, UserWithPermissions } from './model';
import { removeSensitiveData } from '~/domains/users/helpers';

type findByEmailParams = { userEmail: string, needData?: boolean, getSensitiveData?: boolean };

export interface UserRepository {
    createUser(user: Partial<User>): Promise<UserWithPermissions | null>;
    findByEmail({ userEmail, needData }: findByEmailParams): Promise<UserWithPermissions | undefined>;
    userExists(userEmail: string): Promise<boolean | undefined>;
    getUserSecret(userEmail: string): Promise<User | undefined>;
    getUserRole(userEmail: string): Promise<string | undefined>;
};

export class UserImplementation implements UserRepository {
    async findByEmail({
        userEmail,
        getSensitiveData,
    }: findByEmailParams): Promise<UserWithPermissions | undefined> {
        const user = await User
            .query()
            .select('*')
            .where('email', userEmail)
            .modifyGraph('permissions', builder => {
                builder.select('role_name');
            })
            .first();

        if (!user) return undefined;

        return getSensitiveData ? user as UserWithPermissions : removeSensitiveData(user);
    }

    async userExists(userEmail: string): Promise<boolean | undefined> {
        return !!await User
            .query()
            .select('email')
            .where('email', userEmail)
            .first();
    }

    async createUser(user: Partial<User>): Promise<UserWithPermissions | null> {
        const query = await User
            .query()
            .modifyGraph('permissions', (builder) => {
                builder.select('role_name');
            })
            .withGraphFetched('permissions')
            .insertGraphAndFetch(user);

        return query as UserWithPermissions;
    }

    async getUserSecret(userEmail: string): Promise<User | undefined> {
        return User
            .query()
            .select(['secret'])
            .where('email', userEmail)
            .first();
    }

    async getUserRole(userEmail: string): Promise<string | undefined> {
        const user = await User
            .query()
            .select('user_role_id')
            .modifyGraph('permissions', builder => {
                builder.select('role_name');
            })
            .findOne({ email: userEmail }) as UserWithPermissions;

        if (!user) return undefined;

        return user.permissions?.role_name || 'NOT_DEFINED_ROLE';
    }
}
