import { EssayResultsRepositoryImplementation } from '~/domains/essay-results/repository';
import { EssayResultsService } from '~/domains/essay-results/services';
import { Response, Request } from 'express';

const repository = new EssayResultsRepositoryImplementation();
export const essayResultsService = new EssayResultsService(repository);

export const userAverageScore = async (request: Request, response: Response) => {
    const averageScore = await essayResultsService.getUserAverageScore(Number(request.user?.id));

    return response.json(
        {
            user_id: Number(request.user?.id),
            averageScore,
        },
    );
};
