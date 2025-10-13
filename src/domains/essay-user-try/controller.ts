import EssayUserTryImplementation from './repository';
import { EssayUserTryService } from './services';
import { RequestMiddleware } from '~/types/RequestMiddleware';
import { NextFunction, Response } from 'express';
import { essayThemesService } from '~/domains/essay-themes/controller';
import { essayResultsService } from '~/domains/essay-results/controller';

const repository = new EssayUserTryImplementation();
export const essayUserTryService = new EssayUserTryService(repository);

export async function correctEssay(request: RequestMiddleware, response: Response, next: NextFunction) {
    try {
        const {
            try_id,
            theme_id,
            essay,
        } = request.body;

        const theme = await essayThemesService.getThemeById(Number(theme_id));

        const essayCorrected = await essayUserTryService.sendEssayToAi(essay, theme);

        await essayUserTryService.updateTry(
            try_id,
            essay,
            true,
        );

        await essayResultsService.createResult(
            try_id,
            essayCorrected.final_result.total_score,
            essayCorrected,
        );

        response.json(essayCorrected);
    } catch (e) {
        next(e);
    }
}
