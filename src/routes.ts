import { Router, Request, Response } from 'express';
import { Test } from './domains/test/model';
import { appConfig } from './config/app.config';

const routes = Router();

const isDevelopment = appConfig.local === 'development';

if (isDevelopment) routes.get('/', async (_req: Request, res: Response) => {
    const tests = await Test.query().select('*');
    res.json(tests);
});

export default routes;
