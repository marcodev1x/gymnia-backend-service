import { Router } from 'express';
import { getThemesList, getThemeById, correctEssay } from './controller';
import { validateBodyRequest } from '~/middlewares/joi';
import { authentication } from '~/middlewares/authentication';
import { getThemeByIdSchema, correctEssaySchema } from './schemas';

export const essayThemesRoutes = Router();

// Routes
essayThemesRoutes.get('/get-themes-list',
  authentication,
  getThemesList,
);

essayThemesRoutes.get('/get-theme',
  authentication,
  validateBodyRequest(getThemeByIdSchema),
  getThemeById,
);

essayThemesRoutes.post(
  '/correct-essay',
  authentication,
  validateBodyRequest(correctEssaySchema),
  correctEssay,
);
