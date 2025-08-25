import { Router } from 'express';
import { gymniaRouter } from './domains/gymnia-config-params/routes';
import { usersRoutes } from './domains/users/routes';
import { essayThemesRoutes } from './domains/gymnia-essay-themes/routes';
import essayTryRoutes from '~/domains/gymnia-essay-user-try/routes';

const routes = Router();

routes.use('/gymnia-params', gymniaRouter);
routes.use('/clients', usersRoutes);
routes.use('/essay-themes', essayThemesRoutes);
routes.use('/essay-try', essayTryRoutes);

export default routes;
