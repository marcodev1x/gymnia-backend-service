import { EssayResultsRepository } from '~/domains/essay-results/repository';
import { DefaultHttpError } from '~/generic-errors';
import { EssayJsonResult } from '~/types/UseAi';

export class EssayResultsService {
    constructor(private readonly repository: EssayResultsRepository) {}

    async createResult(essayTryId: number, userScore: number, iaResult: EssayJsonResult) {
        const createdResult = await this.repository.createResult(essayTryId, userScore, iaResult);

        if (!createdResult) throw DefaultHttpError({ element: 'Result', error: 'NOT_CREATED' });

        return createdResult;
    }

    async getUserAverageScore(userId: number) {
        return await this.repository.getUserAverageScore(userId);
    }
}
