import { Pagination } from '~/types/express';
import { EssayThemes } from './model';
import { EssayClassification } from '../essay-classification/model';
import { EssayThemesPossibleClassification } from './services';

interface ThemeWithClassification {
    essayTheme: EssayThemes;
    classification: EssayClassification[];
}

interface ListThemeWithClassification {
    theme: EssayThemes;
    classification: EssayClassification | null;
}
export interface EssayThemesRepository {
    getThemes(pagination: Pagination): Promise<ListThemeWithClassification[] | []>;
    getThemeById(id: number): Promise<ThemeWithClassification | undefined>;
    createTheme(theme: EssayThemesPossibleClassification): Promise<EssayThemesPossibleClassification>;
}

export class EssayThemesImplementation implements EssayThemesRepository {
    async getThemes(pagination: Pagination): Promise<ListThemeWithClassification[] | []> {
        const query = EssayThemes
            .query()
            .where('is_active', true);

        const essayClassification = await EssayClassification
            .query()
            .select()
            .withGraphFetched('[category(baseCategory), pedagogical_origin(basePedagogicalOrigin),'
                + 'difficulty_level(baseDifficultyLevel)]');

        query.offset(pagination.offset);
        query.limit(pagination.limit);

        const result = await query;

        if (!result ||!result.length) return [];

        return result.map(theme => ({
            theme,
            classification: essayClassification.find(classification => classification.essay_id === theme.id) || null,
        }));
    }

    async getThemeById(id: number): Promise<ThemeWithClassification | undefined> {
        const theme = await EssayThemes
            .query()
            .findById(id);

        if (!theme) return undefined;

        const classification = await EssayClassification
            .query()
            .where('essay_id', id)
            .withGraphFetched('[category(baseCategory), pedagogical_origin(basePedagogicalOrigin),'
                + 'difficulty_level(baseDifficultyLevel)]')
            .select('id');

        return {
            essayTheme: theme,
            classification,
        };
    }

    async createTheme(theme: EssayThemesPossibleClassification): Promise<EssayThemesPossibleClassification> {
        const essayTheme = await EssayThemes
            .query()
            .insertAndFetch(theme.essayTheme);

        let classification = {} as EssayClassification;

        if (theme.classification) {
            classification = await EssayClassification
                .query()
                .insertAndFetch({
                    essay_id: essayTheme.id,
                    category_id: theme.classification.category_id,
                    pedagogical_origin_id: theme.classification.pedagogical_origin_id,
                    difficulty_level_id: theme.classification.difficulty_level_id,
                });
        }

        return {
            essayTheme,
            classification,
        };
    }
}
