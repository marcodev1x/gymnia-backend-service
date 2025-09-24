import { Router } from 'express';
import { getThemesList, getThemeById, createTheme, downloadThemeContent } from './controller';
import { authentication } from '~/middlewares/authentication';
import { createThemaSchema, getThemeByIdSchema } from './schemas';
import { AppRouter } from '~/types/Router';
import { getEssayThemesSwagger } from './swagger';
import { validateRequestAndFile, validateRequest } from '~/middlewares/joi';
import multer from 'multer';
import { GymniaUserRoles } from '../gymnia-permissions/model';
import { permissionMiddleware } from '~/middlewares/permission';

const upload = multer({ storage: multer.memoryStorage() });
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
            validateRequest({
                schema: getThemeByIdSchema,
                type: 'body',
            }),
        ],
    },
    {
        method: 'post',
        path: '/create-theme',
        handler: createTheme,
        middlewares: [
            authentication,
            upload.single('file'),
            validateRequestAndFile({
                required: false,
                schema: createThemaSchema,
                type: 'body',
                nameBody: 'theme',
            }),
        ],
    },
    {
        method: 'post',
        path: '/download-theme-content',
        handler: downloadThemeContent,
        middlewares: [
            authentication,
            permissionMiddleware([GymniaUserRoles.USER, GymniaUserRoles.TRIAL]),
            validateRequest({
                schema: getThemeByIdSchema,
                type: 'body',
            }),
        ],
    },
];

export default routes;
