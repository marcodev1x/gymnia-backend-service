import { Router } from 'express';
import { createUser, loginUser } from './controller';
import { validateRequest } from '~/middlewares/joi';
import { createUserSchema, loginUserSchema } from './schemas';
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
];

export default routes;
