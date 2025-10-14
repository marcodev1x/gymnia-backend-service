import { validateRequest } from '~/middlewares/joi';
import { correctEssaySchema } from '~/domains/essay-themes/schemas';
import { correctEssay } from '~/domains/essay-user-try/controller';
import { Router } from 'express';
import { permissionMiddleware } from '~/middlewares/permission';
import { UserRoles } from '~/domains/permissions/model';
import { AppRouter } from '~/types/Router';
import { correctEssaySwagger } from './swagger';

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
];

export default routes;
