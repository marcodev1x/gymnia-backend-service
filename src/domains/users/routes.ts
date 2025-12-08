import { Router } from 'express';
import { createUser, loginUser, loginWithGoogle } from './controller';
import { validateRequest } from '~/middlewares/joi';
import { createUserSchema, loginUserSchema, loginWithGoogleSchema } from './schemas';
import { AppRouter } from '~/types/Router';

export const usersRouter =  Router();

// Routes
const routes: AppRouter[] = [
    {
        method: 'post',
        path: '/create-user',
        handler: createUser,
        middlewares: [
            validateRequest({
                schema: createUserSchema,
                type: 'body',
            }),
        ],
    },
    {
        method: 'post',
        path: '/login',
        handler: loginUser,
        middlewares: [
            validateRequest({
                schema: loginUserSchema,
                type: 'body',
            }),
        ],
    },
    {
        method: 'post',
        path: '/login-oauth',
        handler: loginWithGoogle,
        middlewares: [
            validateRequest({
                schema: loginWithGoogleSchema,
                type: 'body',
            }),
        ],
    },
];

export default routes;
