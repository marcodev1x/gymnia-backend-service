import { Model, QueryBuilderType } from 'objection';

export class EssayDifficultyLevels extends Model {
    static get tableName() {
        return 'essay_difficulty_levels';
    }

    static get idColumn() {
        return 'id';
    }

    id: number;
    name: string;
    can_be_used: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;

    $beforeInsert() {
        this.created_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }

    static get modifiers() {
        return {
            baseDifficultyLevel(builder: QueryBuilderType<EssayDifficultyLevels>) {
                builder.select('level');
            },
        };
    }
}
