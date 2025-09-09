import { GymniaEssayThemesImplementation } from '~/domains/gymnia-essay-themes/repository';
import { GymniaEssayThemesService } from '~/domains/gymnia-essay-themes/services';
import { NextFunction, Request, Response } from 'express';
import { RequestMiddleware } from '~/types/RequestMiddleware';
import logger from '~/logger';

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

        response.status(200).json({
            theme,
        });
    } catch (e) {
        next(e);
    }
}

export async function createTheme(request: Request, response: Response, next: NextFunction) {
    try {
        const { theme } = request.body;

        let file;

        if (request.file) {
            file = request.file;
        }

        const themeCreated = await gymniaEssayThemesService.createTheme(theme, file);

        response.status(201).json(themeCreated);
    } catch (e) {
        next(e);
    }
}

export async function downloadThemeContent(
    request: RequestMiddleware,
    response: Response,
    next: NextFunction,
) {
    try {
        const { id } = request.body;

        await gymniaEssayThemesService.downloadThemeWithSignedUrl(Number(id), response);
    } catch (e) {
        logger.error(e);
        next(e);
    }
}
