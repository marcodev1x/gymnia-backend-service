import { DefaultHttpError } from '~/generic-errors';
import { EssayUserTry, EssayUserTryStatus } from './model';
import EssayUserTryImplementation from './repository';
import { SendTryError } from '~/errors/try-errors';
import { EssayThemes } from '~/domains/essay-themes/model';
import { configParamsService } from '~/domains/config-params/controller';
import { EssayConfigParamsEnum } from '~/domains/config-params/model';
import { useAi } from '~/domains/useAi';
import { EssayJsonResult } from '~/types/UseAi';
import { essayThemesService } from '~/domains/essay-themes/controller';

export type EssayAsyncData = {
    title: string;
    content: string;
    setAsPending?: boolean;
}

export class EssayUserTryService {
    constructor(private readonly repository: EssayUserTryImplementation) {}

    async createTry(tryData: Partial<EssayUserTry>): Promise<EssayUserTry> {
        await essayThemesService.getThemeById(tryData.essay_theme_id!); // Dá erro se não existir o tema

        const createTry = await this.repository.createTry(tryData);

        if (!createTry) {
            throw DefaultHttpError({ element: 'Try', error: 'NOT_CREATED' });
        }

        return createTry;
    }

    async getTryById(id: number): Promise<EssayUserTry> {
        const tryById = await this.repository.getTryById(id);

        if (!tryById) {
            throw SendTryError('UNEXISTENT_ESSAY_TRY');
        }

        return tryById;
    }

    async getTryListByUserId(userId: number, status?: EssayUserTryStatus): Promise<EssayUserTry[]> {
        return await this.repository.getTryListByUserId(userId, status);
    }

    async updateTry(
        id: number,
        tryData: EssayAsyncData,
        completion?: boolean,
        userId?: number,
    ): Promise<EssayUserTry> {
        const { user_id: userTryId } = await this.getTryById(id);

        if (userTryId !== userId) {
            throw SendTryError('INVALID_TRY_OWNER');
        }

        if (!tryData.content) {
            throw SendTryError('LOW_ESSAY_LENGTH_OR_INEXISTENT_ESSAY');
        }

        return await this.repository.updateTry(id, tryData, completion);
    }

    async sendEssayToAi(essay: string, theme: EssayThemes) {
        const { valor_parametro: essayRule } = await configParamsService
            .getSpecificConfigParam(EssayConfigParamsEnum.REDACAO);

        const { theme_description: themeDescription } = theme;

        if (!essayRule) throw DefaultHttpError({ element: 'Essay', error: 'NOT_FOUND' });

        const essayCorrected = await useAi<EssayJsonResult>({
            systemContent: `${essayRule}\nTema realizado: \nRedação: ${themeDescription}`,
            userContent: JSON.stringify(essay),
            jsonFormat: true,
            retries: 3,
            delay: 1000,
            substituteModels: ['anthropic/claude-3.5-sonnet', 'google/gemini-2.5-pro'],
        });

        if (!essayCorrected) throw SendTryError('ERROR_TO_CORRECT_ESSAY');

        return essayCorrected;
    }
}
