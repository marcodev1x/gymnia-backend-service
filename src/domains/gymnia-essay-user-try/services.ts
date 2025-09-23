import { ThrowHttpError } from '~/generic-errors';
import { GymniaEssayUserTry, GymniaEssayUserTryStatus } from './model';
import { GymniaEssayUserTryImplementation } from './repository';
import { ThrowGymniaTryError } from '~/errors/gymnia-try-errors';
import { GymniaEssayThemes } from '~/domains/gymnia-essay-themes/model';
import { gymniaConfigParamsService } from '~/domains/gymnia-config-params/controller';
import { GymniaConfigParamsEnum } from '~/domains/gymnia-config-params/model';
import { useAi } from '~/domains/useAi';
import { AiJsonResult } from '~/types/UseAi';

export type EssayAsyncData = {
    content: string;
    setAsPending?: boolean;
}

export class GymniaEssayUserTryService {
    constructor(private readonly repository: GymniaEssayUserTryImplementation) {}

    async createTry(tryData: GymniaEssayUserTry): Promise<GymniaEssayUserTry> {
        const createTry = await this.repository.createTry(tryData);

        if (!createTry) {
            throw ThrowHttpError({ element: 'Try', error: 'NOT_CREATED' });
        }

        return createTry;
    }

    async getTryById(id: number): Promise<GymniaEssayUserTry | undefined> {
        const tryById = await this.repository.getTryById(id);

        if (!tryById) {
            throw ThrowHttpError({ element: 'Try', error: 'NOT_FOUND' });
        }

        return tryById;
    }

    async getTryListByUserId(userId: number, status?: GymniaEssayUserTryStatus): Promise<GymniaEssayUserTry[]> {
        return await this.repository.getTryListByUserId(userId, status);
    }

    async updateTry(
        id: number,
        tryData: EssayAsyncData,
        completion?: boolean,
    ): Promise<GymniaEssayUserTry> {
        if (!tryData.content) {
            throw ThrowGymniaTryError('LOW_ESSAY_LENGTH_OR_INEXISTENT_ESSAY');
        }

        const updateTry = await this.repository.updateTry(id, tryData, completion);

        if (!updateTry) {
            throw ThrowHttpError({ element: 'Try', error: 'NOT_FOUND' });
        }

        return updateTry;
    }

    async deleteTry(id: number): Promise<void> {
        const deleteTry = await this.repository.deleteTry(id);

        if (!deleteTry) {
            throw ThrowHttpError({ element: 'Try', error: 'NOT_FOUND' });
        }
    }

    async sendEssayToAi(essay: string, theme: GymniaEssayThemes) {
        const { valor_parametro: essayRule } = await gymniaConfigParamsService
            .getSpecificConfigParam(GymniaConfigParamsEnum.REDACAO);

        const { theme_description: themeDescription } = theme;

        if (!essayRule) throw ThrowHttpError({ element: 'Essay', error: 'NOT_FOUND' });

        const essayCorrected = await useAi<AiJsonResult>({
            systemContent: `${essayRule}\nTema realizado: \nRedação: ${themeDescription}`,
            userContent: JSON.stringify(essay),
            jsonFormat: true,
        });

        if (!essayCorrected) throw ThrowGymniaTryError('ERROR_AT_CORRECT_ESSAY');

        return essayCorrected;
    }
}
