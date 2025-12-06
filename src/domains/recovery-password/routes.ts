import { AppRouter } from '~/types/Router';
import { createRecoveryTry } from '~/domains/recovery-password/controller';
import { createRecoveryTrySchema } from '~/domains/recovery-password/schemas';
import { validateRequest } from '~/middlewares/joi';
import { Router } from 'express';

export const recoveryPasswordRouter = Router();

const routes: AppRouter[] = [
    {
        toAuthenticated: false,
        method: 'post',
        path: '/create-recovery-try',
        handler: createRecoveryTry,
        middlewares: [
            validateRequest({
                schema: createRecoveryTrySchema,
                type: 'body',
            }),
        ],
    },
];

export default routes;
