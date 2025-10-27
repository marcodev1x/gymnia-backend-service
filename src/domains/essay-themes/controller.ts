import { EssayThemesImplementation } from '~/domains/essay-themes/repository';
import { EssayThemesService } from '~/domains/essay-themes/services';
import { NextFunction, Request, Response } from 'express';

const repository = new EssayThemesImplementation();
export const essayThemesService = new EssayThemesService(repository);

export async function getThemesList(request: Request, response: Response, next: NextFunction) {
    try {
        const { pagination } = request;
        const themesList = await essayThemesService.getThemes(pagination);

        response.json({
            pagination,
            data: themesList,
        });
    } catch (e) {
        next(e);
    }
}

export async function getThemeById(request: Request, response: Response, next: NextFunction) {
    try {
        const { id } = request.body;
        const theme = await essayThemesService.getThemeById(Number(id));

        response.status(200).json({
            theme,
        });
    } catch (e) {
        next(e);
    }
}

export async function createTheme(request: Request, response: Response, next: NextFunction) {
    try {
        const { theme, classification } = request.body;

        let file: Express.Multer.File | null = null;

        if (request.file) {
            file = request.file;
        }

        const themeCreated = await essayThemesService.createTheme({
            essayTheme: theme,
            classification,
        }, file);

        response.status(201).json(themeCreated);
    } catch (e) {
        next(e);
    }
}

export async function downloadThemeContent(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    try {
        const { id } = request.body;

        await essayThemesService.downloadThemeWithSignedUrl(Number(id), response);
    } catch (e) {
        logger.error(e);
        next(e);
    }
}
