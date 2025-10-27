import { Model } from 'objection';
import { User } from '../users/model';

export enum UserRoles {
    ADMIN = 'ai:adm',
    USER = 'ai:user',
    TRIAL = 'ai:trial', //  trocar na integração com o pazzei (trocas todas as roles)
    FINISHED_TRIAL = 'ai:finished_trial',
    PEDAGOGICO = 'ai:pedagogico'
}

export class Permissions extends Model {
    static get tableName() {
        return 'permissions';
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
                modelClass: User,
                join: {
                    from: 'permissions.id',
                    to: 'users.user_role_id',
                },
            },
        };
    }
}
