import { Router } from 'express';
import { getConfigList } from '~/domains/config-params/controller';
import { UserRoles } from '../permissions/model';
import { permissionMiddleware } from '~/middlewares/permission';
import { AppRouter } from '~/types/Router';
import { getConfigListSwagger } from './swagger';

export const configParamsRouter = Router();

// Routes
const routes: AppRouter[] = [
    {
        toAuthenticated: true,
        method: 'get',
        path: '/get-config-list',
        handler: getConfigList,
        middlewares: [
            permissionMiddleware([UserRoles.USER, UserRoles.TRIAL]),
        ],
        swagger: getConfigListSwagger,
    },
];

export default routes;
