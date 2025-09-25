import { Model } from 'objection';
import { GymniaUser } from '../users/model';

export enum UserRoles {
    ADMIN = 'gymnia:adm',
    USER = 'gymnia:user',
    TRIAL = 'gymnia:trial',
    FINISHED_TRIAL = 'gymnia:finished_trial',
    PEDAGOGICO = 'gymnia:pedagogico'
}

export class GymniaPermissions extends Model {
    static get tableName() {
        return 'gymnia_permissions';
    }

    static get idColumn() {
        return 'id';
    }

    id: number;
    role_name: UserRoles;

    static get relationMappings() {
        return {
            permissions: {
                relation: Model.HasManyRelation,
                modelClass: GymniaUser,
                join: {
                    from: 'gymnia_permissions.id',
                    to: 'gymnia_users.user_role_id',
                },
            },
        };
    }
}
