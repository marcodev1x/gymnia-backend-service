import GymniaEssayUserTryImplementation from './repository';
import { GymniaEssayUserTryService } from './services';
import { RequestMiddleware } from '~/types/RequestMiddleware';
import { NextFunction, Response } from 'express';
import { essayThemesService } from '~/domains/essay-themes/controller';
import { essayResultsService } from '~/domains/essay-results/controller';

const repository = new GymniaEssayUserTryImplementation();
export const gymniaEssayUserTryService = new GymniaEssayUserTryService(repository);

export async function correctEssay(request: RequestMiddleware, response: Response, next: NextFunction) {
    try {
        const {
            try_id,
            theme_id,
            essay,
        } = request.body;

        const theme = await essayThemesService.getThemeById(Number(theme_id));

        const essayCorrected = await gymniaEssayUserTryService.sendEssayToAi(essay, theme);

        await gymniaEssayUserTryService.updateTry(
            try_id,
            essay,
            true,
        );

        await essayResultsService.createResult(
            try_id,
            essayCorrected.resultado_final.nota_total,
            essayCorrected,
        );

        response.json(essayCorrected);
    } catch (e) {
        next(e);
    }
}
