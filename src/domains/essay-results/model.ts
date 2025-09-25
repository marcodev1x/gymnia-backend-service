import { Model } from 'objection';
import { GymniaEssayUserTry } from '~/domains/essay-user-try/model';
import { EssayJsonResult } from '~/types/UseAi';

export class GymniaEssayResults extends Model {
    static get tableName() {
        return 'gymnia_essay_results';
    }

    static get idColumn() {
        return 'id';
    }

    id: number;
    essay_try_id: number;
    score: number;
    ia_result: EssayJsonResult;
    created_at: Date;
    updated_at: Date;

    $beforeInsert() {
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }

    static get relationMappings() {
        return {
            essay_try: {
                relation: Model.BelongsToOneRelation,
                modelClass: GymniaEssayUserTry,
                join: {
                    from: 'gymnia_essay_results.essay_try_id',
                    to: 'gymnia_essay_user_try.id',
                },
            },
        };
    }
}
