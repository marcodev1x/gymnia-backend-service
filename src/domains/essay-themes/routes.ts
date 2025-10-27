import { Router } from 'express';
import { getThemesList, getThemeById, createTheme, downloadThemeContent } from './controller';
import { createThemaSchema, getThemeByIdSchema } from './schemas';
import { AppRouter } from '~/types/Router';
import { getEssayThemesSwagger } from './swagger';
import { validateRequestAndFile, validateRequest } from '~/middlewares/joi';
import multer from 'multer';
import { UserRoles } from '../permissions/model';
import { permissionMiddleware } from '~/middlewares/permission';
import { pagination } from '~/middlewares/pagination';

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
            pagination,
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
                requiredFile: false,
                schema: createThemaSchema,
                type: 'body',
                jsonFields: ['theme', 'classification'],
            }),
        ],
    },
    {
        toAuthenticated: true,
        method: 'post',
        path: '/download-theme-content',
        handler: downloadThemeContent,
        middlewares: [
            permissionMiddleware([UserRoles.USER, UserRoles.TRIAL]),
            validateRequest({
                schema: getThemeByIdSchema,
                type: 'body',
            }),
        ],
    },
];

export default routes;
