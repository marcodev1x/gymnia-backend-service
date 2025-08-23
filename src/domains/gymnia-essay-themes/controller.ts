import { GymniaEssayThemesImplementation } from '~/domains/gymnia-essay-themes/repository';
import { GymniaEssayThemesService } from '~/domains/gymnia-essay-themes/services';
import { NextFunction, Request, Response } from 'express';
import { RequestMiddleware } from '~/types/RequestMiddleware';
import { gymniaEssayUserTryService } from '../gymnia-essay-user-try/controller';

const repository = new GymniaEssayThemesImplementation();
const service = new GymniaEssayThemesService(repository);

export async function getThemesList(_req: Request, res: Response) {
  try {
    const themesList = await service.getThemes();

    res.status(200).json(themesList);
  } catch (e) {
    res.status(e.status).json({ error: e.message });
  }
}

export async function getThemeById(request: Request, response: Response, next: NextFunction) {
  try {
    const { id } = request.body;
    const theme = await service.getThemeById(Number(id));

    response.status(200).json(theme);
  } catch (e) {
    next(e);
  }
}

export async function correctEssay(request: RequestMiddleware, response: Response, next: NextFunction) {
  try {
    const {
      try_id,
      theme_id,
      essay,
    } = request.body;

    const theme = await service.getThemeById(Number(theme_id));

    const essayCorrected = await service.sendEssayToAi(essay, theme);

    await gymniaEssayUserTryService.updateTry(
      Number(try_id),
      essay,
      true,
    );

    response.status(200).json(essayCorrected);
  } catch (e) {
    next(e);
  }
}
