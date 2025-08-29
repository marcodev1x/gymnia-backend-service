import { Router } from 'express';

export interface UseRoute {
    prefix: string;
    router: Router;
}

export interface AppRouter {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    path: string;
    middlewares?: (() => any)[];
    handler: (() => any);
    swagger?: any;
}
