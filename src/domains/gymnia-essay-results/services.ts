import { GymniaEssayResultsRepository } from '~/domains/gymnia-essay-results/repository';
import { SendHttpError } from '~/generic-errors';
import { AiJsonResult } from '~/types/UseAi';

export class GymniaEssayResultsService {
    constructor(private readonly repository: GymniaEssayResultsRepository) {}

    async createResult(essayTryId: number, userScore: number, iaResult: AiJsonResult) {
        const createdResult = await this.repository.createResult(essayTryId, userScore, iaResult);

        if (!createdResult) throw SendHttpError({ element: 'Result', error: 'NOT_CREATED' });

        return createdResult;
    }
}
