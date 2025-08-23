import { GymniaEssayUserTryImplementation } from './repository';
import { GymniaEssayUserTryService } from './services';

const repository = new GymniaEssayUserTryImplementation();
export const gymniaEssayUserTryService = new GymniaEssayUserTryService(repository);
