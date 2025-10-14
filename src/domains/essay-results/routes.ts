import { Router } from 'express';
import { AppRouter } from '~/types/Router';
import { userAverageScore } from './controller';
import { permissionMiddleware } from '~/middlewares/permission';
import { UserRoles } from '../permissions/model';

export const essayResultsRouter = Router();

// Routes
const routes: AppRouter[] = [
    {
        toAuthenticated: true,
        method: 'get',
        path: '/get-user-average-score',
        handler: userAverageScore,
        middlewares: [
            permissionMiddleware([UserRoles.USER, UserRoles.TRIAL]),
        ],
    },
];

export default routes;
