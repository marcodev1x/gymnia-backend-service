import { AppRouter } from '~/types/Router';
import {
    createRecoveryTry,
    finishAndRecoveryPassword,
    validateRecoveryTry,
} from '~/domains/recovery-password/controller';
import {
    createRecoveryTrySchema,
    finishRecoveryPasswordSchema,
    validateRecoveryTrySchema,
} from '~/domains/recovery-password/schemas';
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
    {
        toAuthenticated: false,
        method: 'get',
        path: '/validate-recovery-try',
        handler: validateRecoveryTry,
        middlewares: [
            validateRequest({
                schema: validateRecoveryTrySchema,
                type: 'query',
            }),
        ],
    },
    {
        toAuthenticated: false,
        method: 'post',
        path: '/finish-recovery-password',
        handler: finishAndRecoveryPassword,
        middlewares: [
            validateRequest({
                schema: finishRecoveryPasswordSchema,
                type: 'body',
            }),
        ],
    },
];

export default routes;
