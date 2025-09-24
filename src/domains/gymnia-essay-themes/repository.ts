import { Pagination } from '~/types/Pagination';
import { GymniaEssayThemes } from './model';

export interface GymniaEssayThemesRepository {
    getThemes(pagination: Pagination): Promise<GymniaEssayThemes[]>;
    getThemeById(id: number): Promise<GymniaEssayThemes | undefined>;
    createTheme(theme: GymniaEssayThemes, file?: Express.Multer.File): Promise<GymniaEssayThemes>;
}

export class GymniaEssayThemesImplementation implements GymniaEssayThemesRepository {
    async getThemes(pagination: Pagination): Promise<GymniaEssayThemes[] | []> {
        const query = GymniaEssayThemes.query();

        query.offset(pagination.offset);
        query.limit(pagination.limit);

        return query;
    }

    async getThemeById(id: number): Promise<GymniaEssayThemes | undefined> {
        return GymniaEssayThemes
            .query()
            .findById(id);
    }

    async createTheme(theme: GymniaEssayThemes): Promise<GymniaEssayThemes> {
        return GymniaEssayThemes
            .query()
            .insertAndFetch(theme);
    }
}
