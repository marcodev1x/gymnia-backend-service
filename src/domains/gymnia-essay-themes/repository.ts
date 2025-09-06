import { GymniaEssayThemes } from './model';

export interface GymniaEssayThemesRepository {
    getThemes(): Promise<GymniaEssayThemes[]>;
    getThemeById(id: number): Promise<GymniaEssayThemes | undefined>;
    createTheme(theme: GymniaEssayThemes): Promise<GymniaEssayThemes>;
}

export class GymniaEssayThemesImplementation implements GymniaEssayThemesRepository {
    async getThemes(): Promise<GymniaEssayThemes[] | []> {
        return GymniaEssayThemes.query();
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
