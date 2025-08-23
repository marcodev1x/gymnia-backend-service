import { Router } from 'express';
import { getThemesList, getThemeById, sendEssayToAi } from './controller';
import { validateBodyRequest } from '~/middlewares/joi';
import { authentication } from '~/middlewares/authentication';
import { getThemeByIdSchema, sendToAiSchema } from './schemas';

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
  '/send-essay-to-ai',
  authentication,
  validateBodyRequest(sendToAiSchema),
  sendEssayToAi,
);
