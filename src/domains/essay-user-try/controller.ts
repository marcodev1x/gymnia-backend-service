import EssayUserTryImplementation from './repository';
import { EssayUserTryService } from './services';
import { NextFunction, Response, Request } from 'express';
import { essayThemesService } from '~/domains/essay-themes/controller';
import { essayResultsService } from '~/domains/essay-results/controller';
import { EssayUserTryStatus } from '~/domains/essay-user-try/model';

const repository = new EssayUserTryImplementation();
export const essayUserTryService = new EssayUserTryService(repository);

export async function correctEssay(request: Request, response: Response, next: NextFunction) {
    try {
        const { user } = request;

        const {
            try_id,
            theme_id,
            essay,
        } = request.body;

        const theme = await essayThemesService.getThemeById(Number(theme_id));

        const essayCorrected = await essayUserTryService.sendEssayToAi(essay, theme.essayTheme);

        await essayUserTryService.updateTry(
            try_id,
            essay,
            true,
            Number(user?.id),
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

export async function saveEssayDraft(request: Request, response: Response, next: NextFunction) {
    try {
        const { user } = request;
        const {
            try_id,
            essay,
        } = request.body;

        await essayUserTryService.updateTry(
            try_id,
            essay,
            false,
            Number(user?.id),
        );

        response.json({ message: 'Redação salva com sucesso.' });
    } catch (e) {
        next(e);
    }
}

export async function getPendingTriesBasedUser(request: Request, response: Response, next: NextFunction) {
    try {
        const tries = await essayUserTryService.getTryListByUserId(
            Number(request.user?.id), EssayUserTryStatus.PENDING,
        );

        response.json(tries);
    } catch(e) {
        next(e);
    }
}

export async function createUserTry(request: Request, response: Response, next: NextFunction) {
    try {
        const { user } = request;
        const {
            essay_theme_id,
        } = request.body;

        const createUserTry = await essayUserTryService.createTry({ essay_theme_id, user_id: Number(user?.id) });

        response.json(createUserTry);
    } catch(e) {
        next(e);
    }
}
