import { authentication } from '~/middlewares/authentication';
import { validateBodyRequest } from '~/middlewares/joi';
import { correctEssaySchema } from '~/domains/gymnia-essay-themes/schemas';
import { correctEssay } from '~/domains/gymnia-essay-user-try/controller';
import { Router } from 'express';

// Routes
const essayTryRoutes = Router();

essayTryRoutes.post(
    '/correct-essay',
    authentication,
    validateBodyRequest(correctEssaySchema),
    correctEssay,
);

export default essayTryRoutes;
