import { Router } from 'express';
import { createUser } from './controller';
import { validateRequest } from '~/middlewares/joi';
import { createUserSchema } from './schemas';
import { AppRouter } from '~/types/Router';

export const usersRouter =  Router();

// Routes
const routes: AppRouter[] = [
    {
        method: 'post',
        path: '/create-user',
        handler: createUser,
        middlewares: [
            validateRequest(createUserSchema, 'body'),
        ],
    },
];

export default routes;
