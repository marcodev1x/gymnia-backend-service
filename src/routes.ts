import { RequestHandler, Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import configParamsRoutes, { configParamsRouter } from './domains/config-params/routes';
import essayThemesRoutes, { essayThemesRouter } from './domains/essay-themes/routes';
import usersRoutes, { usersRouter } from './domains/users/routes';
import essayTryRoutes, { essayTryRouter } from './domains/essay-user-try/routes';
import essayResultsRoutes, { essayResultsRouter } from './domains/essay-results/routes';
import recoveryPasswordRoutes, { recoveryPasswordRouter } from './domains/recovery-password/routes';

import { AppRouter, UseRoute } from './types/Router';
import { OpenAPIV3 } from 'openapi-types';
import { appConfig } from './config/app.config';
import { authentication } from './middlewares/authentication';

// ==== ROUTES REGISTER ====

const defaultRoutes = Router();
export const swaggerPaths: Record<string, any> = {};

export function registerRoute(router: Router, routes: AppRouter[]) {
    routes.forEach(({ toAuthenticated, method, path, middlewares = [], handler, swagger }) => {
        const middlewaresGroup: RequestHandler[] = [];

        if (toAuthenticated) {
            middlewaresGroup.push(authentication);
        }

        middlewaresGroup.push(...middlewares);

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
    { router: configParamsRouter, routes: configParamsRoutes },
    { router: essayThemesRouter, routes: essayThemesRoutes },
    { router: usersRouter, routes: usersRoutes },
    { router: essayTryRouter, routes: essayTryRoutes },
    { router: essayResultsRouter, routes: essayResultsRoutes },
    { router: recoveryPasswordRouter, routes: recoveryPasswordRoutes },
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
    info: { title: 'Redaciona API', version: '1.0.0' },
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
            url: `http://localhost:${appConfig.port}/api`,
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
