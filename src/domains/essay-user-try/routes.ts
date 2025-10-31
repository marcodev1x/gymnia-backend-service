import { validateRequest } from '~/middlewares/joi';
import { correctEssaySchema, createEssayTrySchema, saveEssayDraftSchema } from '~/domains/essay-user-try/schemas';
import {
    correctEssay,
    createUserTry,
    getPendingTriesBasedUser,
    saveEssayDraft,
} from '~/domains/essay-user-try/controller';
import { Router } from 'express';
import { permissionMiddleware } from '~/middlewares/permission';
import { UserRoles } from '~/domains/permissions/model';
import { AppRouter } from '~/types/Router';
import { correctEssaySwagger } from './swagger';
import { tryLimiter } from '~/middlewares/try-limiter';

// Routes
export const essayTryRouter = Router();

const routes: AppRouter[] = [
    {
        toAuthenticated: true,
        method: 'post',
        path: '/correct-essay',
        handler: correctEssay,
        middlewares: [
            tryLimiter,
            permissionMiddleware([UserRoles.USER, UserRoles.TRIAL]),
            validateRequest({
                schema: correctEssaySchema,
                type: 'body',
            }),
        ],
        swagger: correctEssaySwagger,
    },
    {
        toAuthenticated: true,
        method: 'post',
        path: '/save-essay-draft',
        handler: saveEssayDraft,
        middlewares: [
            permissionMiddleware([UserRoles.USER, UserRoles.TRIAL]),
            validateRequest({
                schema: saveEssayDraftSchema,
                type: 'body',
            }),
        ],
    },
    {
        toAuthenticated: true,
        method: 'get',
        path: '/get-pending-tries',
        handler: getPendingTriesBasedUser,
        middlewares: [
            permissionMiddleware([UserRoles.USER, UserRoles.TRIAL]),
        ],
    },
    {
        toAuthenticated: true,
        method: 'post',
        path: '/create-essay-try',
        handler: createUserTry,
        middlewares: [
            validateRequest({
                schema: createEssayTrySchema,
                type: 'body',
            }),
            permissionMiddleware([UserRoles.USER, UserRoles.TRIAL]),
        ],
    },
];

export default routes;
