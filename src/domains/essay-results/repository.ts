import { EssayResults } from '~/domains/essay-results/model';
import { EssayJsonResult } from '~/types/UseAi';

export interface EssayResultsRepository {
    createResult(essayTryId: number, userScore: number, iaResult: EssayJsonResult): Promise<EssayResults>;
}

export class EssayResultsRepositoryImplementation implements EssayResultsRepository {
    async createResult(
        essayTryId: number,
        userScore: number,
        iaResult: EssayJsonResult,
    ): Promise<EssayResults> {
        const resultData = {
            essay_try_id: essayTryId,
            score: userScore,
            ia_result: iaResult,
        };

        return EssayResults
            .query()
            .insertAndFetch(resultData);
    }
}
