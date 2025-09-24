import { Router } from 'express';
import { getConfigList } from '~/domains/gymnia-config-params/controller';
import { GymniaUserRoles } from '../gymnia-permissions/model';
import { permissionMiddleware } from '~/middlewares/permission';
import { AppRouter } from '~/types/Router';
import { getConfigListSwagger } from './swagger';

export const gymniaConfigParamsRouter = Router();

// Routes
const routes: AppRouter[] = [
    {
        toAuthenticated: true,
        method: 'get',
        path: '/get-config-list',
        handler: getConfigList,
        middlewares: [
            permissionMiddleware([GymniaUserRoles.USER, GymniaUserRoles.TRIAL]),
        ],
        swagger: getConfigListSwagger,
    },
];

export default routes;
