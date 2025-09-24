import { validateRequest } from '~/middlewares/joi';
import { correctEssaySchema } from '~/domains/gymnia-essay-themes/schemas';
import { correctEssay } from '~/domains/gymnia-essay-user-try/controller';
import { Router } from 'express';
import { permissionMiddleware } from '~/middlewares/permission';
import { GymniaUserRoles } from '~/domains/gymnia-permissions/model';
import { AppRouter } from '~/types/Router';

// Routes
export const essayTryRouter = Router();

const routes: AppRouter[] = [
    {
        toAuthenticated: true,
        method: 'post',
        path: '/correct-essay',
        handler: correctEssay,
        middlewares: [
            permissionMiddleware([GymniaUserRoles.USER, GymniaUserRoles.TRIAL]),
            validateRequest({
                schema: correctEssaySchema,
                type: 'body',
            }),
        ],
    },
];

export default routes;
