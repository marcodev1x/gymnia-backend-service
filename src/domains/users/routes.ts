import { Router } from 'express';
import { createUser } from './controller';
import { validateBodyRequest } from '~/middlewares/joi';
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
            validateBodyRequest(createUserSchema),
        ],
    },
];

export default routes;
