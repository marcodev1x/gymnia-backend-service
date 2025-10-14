import { EssayResultsRepository } from '~/domains/essay-results/repository';
import { SendHttpError } from '~/generic-errors';
import { EssayJsonResult } from '~/types/UseAi';

export class EssayResultsService {
    constructor(private readonly repository: EssayResultsRepository) {}

    async createResult(essayTryId: number, userScore: number, iaResult: EssayJsonResult) {
        const createdResult = await this.repository.createResult(essayTryId, userScore, iaResult);

        if (!createdResult) throw SendHttpError({ element: 'Result', error: 'NOT_CREATED' });

        return createdResult;
    }

    async getUserAverageScore(userId: number) {
        return await this.repository.getUserAverageScore(userId);
    }
}
