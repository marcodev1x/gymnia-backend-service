import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import gymniaConfigRoutes, { gymniaConfigParamsRouter } from './domains/gymnia-config-params/routes';
import essayThemesRoutes, { essayThemesRouter } from './domains/gymnia-essay-themes/routes';
import usersRoutes, { usersRouter } from './domains/users/routes';
import essayTryRoutes, { essayTryRouter } from './domains/gymnia-essay-user-try/routes';

import { AppRouter, UseRoute } from './types/Router';

// ==== ROUTES REGISTER ====

const defaultRoutes = Router();
export const swaggerPaths: Record<string, any> = {};

export function registerRoute(router: Router, routes: AppRouter[], basePath = '') {
    routes.forEach(({ method, path, middlewares = [], handler, swagger }) => {
        (router as any)[method](path, ...middlewares, handler);

        if (swagger) {
            const fullPath = (basePath + path).replace(/\/+/g, '/');
            swaggerPaths[fullPath] = {
                ...(swaggerPaths[fullPath] || {}),
                [method]: {
                    ...swagger,
                },
            };
        }
    });
}

// ==== END ROUTES REGISTER ====

// ==== ROUTES ====

const useRoutes: Array<UseRoute & { routes?: AppRouter[] }> = [
    { prefix: '/gymnia-params', router: gymniaConfigParamsRouter, routes: gymniaConfigRoutes },
    { prefix: '/gymnia-essay-themes', router: essayThemesRouter, routes: essayThemesRoutes },
    { prefix: '/clients', router: usersRouter, routes: usersRoutes },
    { prefix: '/essay-try', router: essayTryRouter, routes: essayTryRoutes },
];

useRoutes.forEach((u) => {
    if (u.routes) registerRoute(u.router, u.routes, u.prefix);
    defaultRoutes.use(u.prefix, u.router);
});

// ==== END ROUTES ====

// ==== SWAGGER ====

const swaggerDoc = {
    openapi: '3.0.0',
    info: { title: 'Gymnia API', version: '1.0.0' },
    components: {
        securitySchemes: {
            Bearer: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    servers: [
        {
            url: 'http://localhost:3000/',
        },
    ],
    paths: swaggerPaths,
};

defaultRoutes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// ==== END SWAGGER ====

export default defaultRoutes;
