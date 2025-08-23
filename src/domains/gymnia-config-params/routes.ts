import { Router } from 'express';
import { getConfigList } from '~/domains/gymnia-config-params/controller';
import { authentication } from '~/middlewares/authentication';

export const gymniaRouter = Router();

// Routes
gymniaRouter.get('/get-config-list', authentication, getConfigList);
