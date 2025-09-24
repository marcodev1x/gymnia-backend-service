import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import gymniaConfigRoutes, { gymniaConfigParamsRouter } from './domains/gymnia-config-params/routes';
import essayThemesRoutes, { essayThemesRouter } from './domains/gymnia-essay-themes/routes';
import usersRoutes, { usersRouter } from './domains/users/routes';
import essayTryRoutes, { essayTryRouter } from './domains/gymnia-essay-user-try/routes';

import { AppRouter, UseRoute } from './types/Router';
import { OpenAPIV3 } from 'openapi-types';
import { appConfig } from './config/app.config';
import { authentication } from './middlewares/authentication';

// ==== ROUTES REGISTER ====

const defaultRoutes = Router();
export const swaggerPaths: Record<string, any> = {};

export function registerRoute(router: Router, routes: AppRouter[]) {
    routes.forEach(({ toAuthenticated, method, path, middlewares = [], handler, swagger }) => {
        const middlewaresGroup = [...middlewares];

        if (toAuthenticated) {
            middlewaresGroup.push(authentication);
        }

        router[method](path, ...middlewaresGroup, handler);

        if (swagger) {
            const fullPath = path.replace(/\/+/g, '/');
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
    { router: gymniaConfigParamsRouter, routes: gymniaConfigRoutes },
    { router: essayThemesRouter, routes: essayThemesRoutes },
    { router: usersRouter, routes: usersRoutes },
    { router: essayTryRouter, routes: essayTryRoutes },
];

useRoutes.forEach((u) => {
    if (u.routes) {
        registerRoute(u.router, u.routes);
        defaultRoutes.use('/api', u.router);
    }
});

// ==== END ROUTES ====

// ==== SWAGGER ====

const swaggerDoc: OpenAPIV3.Document = {
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
            url: `http://localhost:${appConfig.port}/`,
        },
        {
            url: appConfig.renderBackendUrl!,
        },
    ],
    paths: swaggerPaths,
};

defaultRoutes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// ==== END SWAGGER ====

export default defaultRoutes;
