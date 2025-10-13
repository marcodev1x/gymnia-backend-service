import { RequestHandler, Router } from 'express';
import { OpenAPIV3 } from 'openapi-types';

export interface UseRoute {
    router: Router;
    routes?: AppRouter[];
}

export interface AppRouter {
    toAuthenticated?: boolean;
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    path: string;
    middlewares?: RequestHandler[];
    handler: RequestHandler;
    swagger?: OpenAPIV3.OperationObject;
}
