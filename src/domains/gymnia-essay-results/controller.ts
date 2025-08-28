import { GymniaEssayResultsRepositoryImplementation } from '~/domains/gymnia-essay-results/repository';
import { GymniaEssayResultsService } from '~/domains/gymnia-essay-results/services';

const repository = new GymniaEssayResultsRepositoryImplementation();
export const gymniaEssayResultsService = new GymniaEssayResultsService(repository);
