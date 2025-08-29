import { Router } from 'express';
import { getConfigList } from '~/domains/gymnia-config-params/controller';
import { authentication } from '~/middlewares/authentication';
import { GymniaUserRoles } from '../gymnia-permissions/model';
import { permissionMiddleware } from '~/middlewares/permission';
import { AppRouter } from '~/types/Router';
import { getConfigListSwagger } from './swagger';

export const gymniaConfigParamsRouter = Router();

// Routes
const routes: AppRouter[] = [
    {
        method: 'get',
        path: '/get-config-list',
        handler: getConfigList,
        middlewares: [
            authentication,
            permissionMiddleware([GymniaUserRoles.USER, GymniaUserRoles.TRIAL]),
        ],
        swagger: getConfigListSwagger,
    },
];

export default routes;
