import { GymniaEssayResultsRepository } from '~/domains/gymnia-essay-results/repository';
import { ThrowHttpError } from '~/generic-errors';

export class GymniaEssayResultsService {
    constructor(private readonly repository: GymniaEssayResultsRepository) {}

    async createResult(essay_try_id: number, score: number, ia_result: JSON) {
        const createdResult = await this.repository.createResult(essay_try_id, score, ia_result);

        if (!createdResult) throw ThrowHttpError({ element: 'Result', error: 'NOT_CREATED' });

        return createdResult;
    }
}
