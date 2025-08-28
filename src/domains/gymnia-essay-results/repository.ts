import { GymniaEssayResults } from '~/domains/gymnia-essay-results/model';

export interface GymniaEssayResultsRepository {
    createResult(essay_try_id: number, score: number, ia_result: JSON): Promise<GymniaEssayResults>;
}

export class GymniaEssayResultsRepositoryImplementation implements GymniaEssayResultsRepository {
    async createResult(
        essay_try_id: number,
        score: number,
        ia_result: JSON,
    ) {
        return GymniaEssayResults
            .query()
            .insertAndFetch({
                essay_try_id,
                score,
                ia_result,
            });
    }
}
