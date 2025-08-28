import { authentication } from '~/middlewares/authentication';
import { validateBodyRequest } from '~/middlewares/joi';
import { correctEssaySchema } from '~/domains/gymnia-essay-themes/schemas';
import { correctEssay } from '~/domains/gymnia-essay-user-try/controller';
import { Router } from 'express';
import { permissionMiddleware } from '~/middlewares/permission';
import { GymniaUserRoles } from '~/domains/gymnia-permissions/model';

// Routes
const essayTryRoutes = Router();

essayTryRoutes.post(
    '/correct-essay',
    authentication,
    permissionMiddleware([GymniaUserRoles.USER, GymniaUserRoles.TRIAL]),
    validateBodyRequest(correctEssaySchema),
    correctEssay,
);

export default essayTryRoutes;
