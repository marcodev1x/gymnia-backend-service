import { Model } from 'objection';
import { EssayThemes } from '../essay-themes/model';
import { EssayCategories } from '../essay-categories/model';
import { EssayPedagogicalOrigin } from '../essay-pedagogical-origin/model';
import { EssayDifficultyLevels } from '../essay-difficulty_levels/model';

export class EssayClassification extends Model {
    static get tableName() {
        return 'essay_classification';
    }

    static get idColumn() {
        return 'id';
    }

    id: number;
    essay_id: number;
    category_id: number;
    pedagogical_origin_id: number;
    difficulty_level_id: number;
    classification_id: number;

    static get relationMappings() {
        return {
            essay: {
                relation: Model.BelongsToOneRelation,
                modelClass: EssayThemes,
                join: {
                    from: 'essay_classification.essay_id',
                    to: 'essay_themes.id',
                },
            },
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: EssayCategories,
                join: {
                    from: 'essay_classification.category_id',
                    to: 'essay_categories.id',
                },
            },
            pedagogical_origin: {
                relation: Model.BelongsToOneRelation,
                modelClass: EssayPedagogicalOrigin,
                join: {
                    from: 'essay_classification.pedagogical_origin_id',
                    to: 'essay_pedagogical_origin.id',
                },
            },
            difficulty_level: {
                relation: Model.BelongsToOneRelation,
                modelClass: EssayDifficultyLevels,
                join: {
                    from: 'essay_classification.difficulty_level_id',
                    to: 'essay_difficulty_levels.id',
                },
            },
        };
    }
}
