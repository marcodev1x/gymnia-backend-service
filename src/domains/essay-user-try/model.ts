import { Model } from 'objection';
import { User } from '../users/model';
import { EssayThemes } from '../essay-themes/model';

export enum EssayUserTryStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
}

export class EssayUserTry extends Model {
    static get tableName() {
        return 'essay_user_try';
    }

    static get idColumn() {
        return 'id';
    }

    id: number;
    essay_theme_id: number;
    user_id: number;
    essay_title?: string;
    essay?: string;
    status: EssayUserTryStatus;
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
                modelClass: User,
                join: {
                    from: 'essay_user_try.user_id',
                    to: 'users.id',
                },
            },
            theme: {
                relation: Model.BelongsToOneRelation,
                modelClass: EssayThemes,
                join: {
                    from: 'essay_user_try.essay_theme_id',
                    to: 'essay_themes.id',
                },
            },
        };
    }
}
