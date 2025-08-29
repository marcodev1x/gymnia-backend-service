import { authentication } from '~/middlewares/authentication';
import { validateBodyRequest } from '~/middlewares/joi';
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
        method: 'post',
        path: '/correct-essay',
        handler: correctEssay,
        middlewares: [
            authentication,
            permissionMiddleware([GymniaUserRoles.USER, GymniaUserRoles.TRIAL]),
            validateBodyRequest(correctEssaySchema),
        ],
    },
];

export default routes;
