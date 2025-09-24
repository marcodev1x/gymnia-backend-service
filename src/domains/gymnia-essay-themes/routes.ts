import { Router } from 'express';
import { getThemesList, getThemeById, createTheme, downloadThemeContent } from './controller';
import { createThemaSchema, getThemeByIdSchema } from './schemas';
import { AppRouter } from '~/types/Router';
import { getEssayThemesSwagger } from './swagger';
import { validateRequestAndFile, validateRequest } from '~/middlewares/joi';
import multer from 'multer';
import { GymniaUserRoles } from '../gymnia-permissions/model';
import { permissionMiddleware } from '~/middlewares/permission';
import { paginationMiddleware } from '~/middlewares/pagination';

const upload = multer({ storage: multer.memoryStorage() });
export const essayThemesRouter = Router();

export const routes: AppRouter[] = [
    {
        toAuthenticated: true,
        method: 'get',
        path: '/get-themes-list',
        handler: getThemesList,
        swagger: getEssayThemesSwagger,
        middlewares: [
            paginationMiddleware,
        ],
    },
    {
        toAuthenticated: true,
        method: 'get',
        path: '/get-theme',
        handler: getThemeById,
        middlewares: [
            validateRequest({
                schema: getThemeByIdSchema,
                type: 'body',
            }),
        ],
    },
    {
        toAuthenticated: true,
        method: 'post',
        path: '/create-theme',
        handler: createTheme,
        middlewares: [
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
        toAuthenticated: true,
        method: 'post',
        path: '/download-theme-content',
        handler: downloadThemeContent,
        middlewares: [
            permissionMiddleware([GymniaUserRoles.USER, GymniaUserRoles.TRIAL]),
            validateRequest({
                schema: getThemeByIdSchema,
                type: 'body',
            }),
        ],
    },
];

export default routes;
