import { Router } from 'express';
import { getThemesList, getThemeById } from './controller';
import { validateBodyRequest } from '~/middlewares/joi';
import { authentication } from '~/middlewares/authentication';
import { getThemeByIdSchema } from './schemas';

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
