import { EssayResultsRepositoryImplementation } from '~/domains/essay-results/repository';
import { EssayResultsService } from '~/domains/essay-results/services';

const repository = new EssayResultsRepositoryImplementation();
export const essayResultsService = new EssayResultsService(repository);
