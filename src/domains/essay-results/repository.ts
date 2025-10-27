import { EssayResults } from '~/domains/essay-results/model';
import { EssayJsonResult } from '~/types/UseAi';
import { EssayUserTry } from '../essay-user-try/model';

export interface EssayResultsRepository {
    createResult(essayTryId: number, userScore: number, iaResult: EssayJsonResult): Promise<EssayResults>;
    getUserAverageScore(userId: number): Promise<number>;
}

export class EssayResultsRepositoryImplementation implements EssayResultsRepository {
    async createResult(essayTryId: number, userScore: number, iaResult: EssayJsonResult): Promise<EssayResults> {
        const resultData = {
            essay_try_id: essayTryId,
            score: userScore,
            ia_result: iaResult,
        };

        return EssayResults
            .query()
            .insertAndFetch(resultData);
    }

    async getUserAverageScore(userId: number): Promise<number> {
        const averageScore = await EssayUserTry
            .query()
            .join('essay_results', 'essay_user_try.id', 'essay_results.essay_try_id')
            .where('essay_user_try.user_id', userId)
            .avg('essay_results.score as average')
            .first() as EssayUserTry & { average: number };

        return Number(Math.round(averageScore?.average)) || 0;
    }
}
