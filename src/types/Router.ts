import { RequestHandler, Router } from 'express';
import { OpenAPIV3 } from 'openapi-types';

export interface UseRoute {
    prefix: string;
    router: Router;
}

export interface AppRouter {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    path: string;
    middlewares?: RequestHandler[];
    handler: RequestHandler;
    swagger?: OpenAPIV3.OperationObject;
}
