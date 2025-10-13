import { Pagination } from '~/types/express';
import { EssayThemes } from './model';

export interface EssayThemesRepository {
    getThemes(pagination: Pagination): Promise<EssayThemes[]>;
    getThemeById(id: number): Promise<EssayThemes | undefined>;
    createTheme(theme: EssayThemes): Promise<EssayThemes>;
}

export class EssayThemesImplementation implements EssayThemesRepository {
    async getThemes(pagination: Pagination): Promise<EssayThemes[] | []> {
        const query = EssayThemes.query();

        query.offset(pagination.offset);
        query.limit(pagination.limit);

        return query;
    }

    async getThemeById(id: number): Promise<EssayThemes | undefined> {
        return EssayThemes
            .query()
            .findById(id);
    }

    async createTheme(theme: EssayThemes): Promise<EssayThemes> {
        return EssayThemes
            .query()
            .insertAndFetch(theme);
    }
}
