import { User, UserWithPermissions } from './model';
import { removeSensitiveData } from '~/domains/users/helpers';
import crypto from 'crypto';

type findByEmailParams = { userEmail: string, getSensitiveData?: boolean };
type GoogleOauthParams = {
    email: string;
    providerId: string;
    name: string;
}

export interface UserRepository {
    createUser(user: Partial<User>): Promise<UserWithPermissions | null>;
    findByEmail({ userEmail, getSensitiveData }: findByEmailParams): Promise<UserWithPermissions | undefined>;
    findById(id: number): Promise<UserWithPermissions | undefined>;
    userExists(userEmail: string): Promise<boolean | undefined>;
    getUserSecret(userEmail: string): Promise<User | undefined>;
    getUserRole(userEmail: string): Promise<string | undefined>;
    updateUserPassword(userId: number, password: string): Promise<true | undefined>;
    findOrCreateOauthUser(params: GoogleOauthParams): Promise<UserWithPermissions | null>;
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
            .withGraphFetched('permissions')
            .first();

        if (!user) return undefined;

        return getSensitiveData ? user as UserWithPermissions : removeSensitiveData(user);
    }

    async findById(id: number): Promise<UserWithPermissions | undefined> {
        const user = await User
            .query()
            .select('*')
            .where('id', id)
            .modifyGraph('permissions', builder => {
                builder.select('role_name');
            })
            .withGraphFetched('permissions')
            .first();

        if (!user) return undefined;

        return user as UserWithPermissions;
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

    async updateUserPassword(userId: number, password: string): Promise<true | undefined> {
        const query = await User
            .query()
            .updateAndFetchById(userId, { secret: password });

        if (!query) return undefined;

        return true;
    }

    async findOrCreateOauthUser(params: GoogleOauthParams): Promise<UserWithPermissions | null> {
        let user = await User
            .query()
            .findOne({ oauth_provider_id: params?.providerId });

        if (user) return user as UserWithPermissions;

        user = await User
            .query()
            .findOne({ email: params?.email });

        if (user) {
            await User
                .query()
                .updateAndFetchById(user.id, {
                    oauth_provider: 'google',
                    oauth_provider_id: params?.providerId,
                });

            return user as UserWithPermissions;
        }

        return await this.createUser({
            name: params?.name,
            email: params?.email,
            oauth_provider: 'google',
            oauth_provider_id: params?.providerId,
            secret: await User.hashSecret(`oauth-${  crypto.randomUUID()}`),
        });
    }
}
