import { validateRequest } from '~/middlewares/joi';
import { correctEssaySchema, saveEssayDraftSchema } from '~/domains/essay-user-try/schemas';
import { correctEssay, getPendingTriesBasedUser, saveEssayDraft } from '~/domains/essay-user-try/controller';
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
            tryLimiter, // remover, apenas teste neste endpoint. Inserir num endpoint de criar tentativa
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
];

export default routes;
