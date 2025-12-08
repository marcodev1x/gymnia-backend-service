import { Model } from 'objection';
import bcrypt from 'bcrypt';
import { appConfig } from '~/config/app.config';
import { Permissions } from '../permissions/model';

export type UserWithPermissions = User & {
    permissions: Permissions;
};

export enum UserRolesByIds  {
    TRIAL = 1,
    USER = 2,
    ADMIN = 3,
    PEDAGOGICO = 4,
    FINISHED_TRIAL = 6,
}

export class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return 'id';
    }

    id: number;
    name: string;
    email: string;
    secret: string | null;
    deleted: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    user_role_id: number;
    oauth_provider: string;
    oauth_provider_id: string;

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
        this.user_role_id = UserRolesByIds.TRIAL;
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }

    $hiddenFields() {
        return ['secret', 'updated_at', 'deleted_at', 'user_role_id', 'deleted', 'oauth_provider', 'oauth_provider_id'];
    }

    static async hashSecret(secret: string) {
        return await bcrypt.hash(secret, appConfig.bcryptHashQuantity);
    }

    static async confirmSecret(secret: string, hashedSecret: string) {
        return await bcrypt.compare(secret, hashedSecret);
    }

    static get relationMappings() {
        return {
            permissions: {
                relation: Model.BelongsToOneRelation,
                modelClass: Permissions,
                join: {
                    from: 'users.user_role_id',
                    to: 'permissions.id',
                },
            },
        };
    }
}
