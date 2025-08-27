import { GymniaEssayThemesImplementation } from '~/domains/gymnia-essay-themes/repository';
import { GymniaEssayThemesService } from '~/domains/gymnia-essay-themes/services';
import { NextFunction, Request, Response } from 'express';

const repository = new GymniaEssayThemesImplementation();
export const gymniaEssayThemesService = new GymniaEssayThemesService(repository);

export async function getThemesList(_request: Request, response: Response, next: NextFunction) {
    try {
        const themesList = await gymniaEssayThemesService.getThemes();

        response.json(themesList);
    } catch (e) {
        next(e);
    }
}

export async function getThemeById(request: Request, response: Response, next: NextFunction) {
    try {
        const { id } = request.body;
        const theme = await gymniaEssayThemesService.getThemeById(Number(id));

        response.status(200).json(theme);
    } catch (e) {
        next(e);
    }
}
