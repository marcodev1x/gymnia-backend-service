import { Model, QueryBuilderType } from 'objection';

export class EssayPedagogicalOrigin extends Model {
    static get tableName() {
        return 'essay_pedagogical_origin';
    }

    static get idColumn() {
        return 'id';
    }

    id: number;
    institution_name: string;
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
            basePedagogicalOrigin(builder: QueryBuilderType<EssayPedagogicalOrigin>) {
                builder.select('institution_name');
            },
        };
    }
}
