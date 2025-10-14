import { Model, QueryBuilderType } from 'objection';

export class EssayCategories extends Model {
    static get tableName() {
        return 'essay_categories';
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
            baseCategory(builder: QueryBuilderType<EssayCategories>) {
                builder.select('name');
            },
        };
    }
}
