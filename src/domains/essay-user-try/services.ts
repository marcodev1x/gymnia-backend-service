import { DefaultHttpError } from '~/generic-errors';
import { EssayUserTry, EssayUserTryStatus } from './model';
import EssayUserTryImplementation from './repository';
import { SendTryError } from '~/errors/try-errors';
import { EssayThemes } from '~/domains/essay-themes/model';
import { configParamsService } from '~/domains/config-params/controller';
import { EssayConfigParamsEnum } from '~/domains/config-params/model';
import { useAi } from '~/domains/useAi';
import { EssayJsonResult } from '~/types/UseAi';

export type EssayAsyncData = {
    content: string;
    setAsPending?: boolean;
}

export class EssayUserTryService {
    constructor(private readonly repository: EssayUserTryImplementation) {}

    async createTry(tryData: EssayUserTry): Promise<EssayUserTry> {
        const createTry = await this.repository.createTry(tryData);

        if (!createTry) {
            throw DefaultHttpError({ element: 'Try', error: 'NOT_CREATED' });
        }

        return createTry;
    }

    async getTryById(id: number): Promise<EssayUserTry | undefined> {
        const tryById = await this.repository.getTryById(id);

        if (!tryById) {
            throw DefaultHttpError({ element: 'Try', error: 'NOT_FOUND' });
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
    ): Promise<EssayUserTry> {
        if (!tryData.content) {
            throw SendTryError('LOW_ESSAY_LENGTH_OR_INEXISTENT_ESSAY');
        }

        const updateTry = await this.repository.updateTry(id, tryData, completion);

        if (!updateTry) {
            throw DefaultHttpError({ element: 'Try', error: 'NOT_FOUND' });
        }

        return updateTry;
    }

    async deleteTry(id: number): Promise<void> {
        const deleteTry = await this.repository.deleteTry(id);

        if (!deleteTry) {
            throw DefaultHttpError({ element: 'Try', error: 'NOT_FOUND' });
        }
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
        });

        if (!essayCorrected) throw SendTryError('ERROR_TO_CORRECT_ESSAY');

        return essayCorrected;
    }
}
