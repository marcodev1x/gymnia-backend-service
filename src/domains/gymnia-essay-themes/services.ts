import { ThrowHttpError } from '~/generic-errors';
import { GymniaEssayThemesRepository } from './repository';

export class GymniaEssayThemesService {
    constructor(private gymniaEssayThemesRepository: GymniaEssayThemesRepository) {}

    async getThemes() {
        return await this.gymniaEssayThemesRepository.getThemes();
    }

    async getThemeById(id: number) {
        const theme = await this.gymniaEssayThemesRepository.getThemeById(id);

        if (!theme) {
            throw ThrowHttpError({ element: 'Theme', error: 'NOT_FOUND' });
        }

        return theme;
    }
}
