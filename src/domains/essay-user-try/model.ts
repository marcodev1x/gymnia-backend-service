import { Model } from 'objection';
import { GymniaUser } from '../users/model';
import { GymniaEssayThemes } from '../essay-themes/model';

export enum GymniaEssayUserTryStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
}

export class GymniaEssayUserTry extends Model {
    static get tableName() {
        return 'gymnia_essay_user_try';
    }

    static get idColumn() {
        return 'id';
    }

    id: number;
    essay_id: number;
    user_id: number;
    essay: string;
    status: GymniaEssayUserTryStatus;
    created_at?: Date;
    updated_at?: Date;

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: GymniaUser,
                join: {
                    from: 'gymnia_essay_user_try.user_id',
                    to: 'gymnia_users.id',
                },
            },
            theme: {
                relation: Model.BelongsToOneRelation,
                modelClass: GymniaEssayThemes,
                join: {
                    from: 'gymnia_essay_user_try.essay_id',
                    to: 'gymnia_essay_themes.id',
                },
            },
        };
    }
}
