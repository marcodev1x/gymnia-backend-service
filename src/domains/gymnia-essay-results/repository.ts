import { GymniaEssayResults } from '~/domains/gymnia-essay-results/model';
import { AiJsonResult } from '~/types/UseAi';

export interface GymniaEssayResultsRepository {
    createResult(essayTryId: number, userScore: number, iaResult: AiJsonResult): Promise<GymniaEssayResults>;
}

export class GymniaEssayResultsRepositoryImplementation implements GymniaEssayResultsRepository {
    async createResult(
        essayTryId: number,
        userScore: number,
        iaResult: AiJsonResult,
    ): Promise<GymniaEssayResults> {
        const resultData = {
            essay_try_id: essayTryId,
            score: userScore,
            ia_result: iaResult,
        };

        return GymniaEssayResults
            .query()
            .insertAndFetch(resultData);
    }
}
