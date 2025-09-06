import { Router } from 'express';
import { getThemesList, getThemeById } from './controller';
import { authentication } from '~/middlewares/authentication';
import { getThemeByIdSchema } from './schemas';
import { AppRouter } from '~/types/Router';
import { getEssayThemesSwagger } from './swagger';
import { validateRequest } from '~/middlewares/joi';

export const essayThemesRouter = Router();

export const routes: AppRouter[] = [
    {
        method: 'get',
        path: '/get-themes-list',
        handler: getThemesList,
        middlewares: [
            authentication,
        ],
        swagger: getEssayThemesSwagger,
    },
    {
        method: 'get',
        path: '/get-theme',
        handler: getThemeById,
        middlewares: [
            authentication,
            validateRequest(getThemeByIdSchema, 'body'),
        ],
    },
];

export default routes;
