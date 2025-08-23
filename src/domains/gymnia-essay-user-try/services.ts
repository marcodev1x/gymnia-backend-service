import { ThrowHttpError } from '~/generic-errors';
import { GymniaEssayUserTry, GymniaEssayUserTryStatus } from './model';
import { GymniaEssayUserTryImplementation } from './repository';
import { ThrowGymniaTryError } from '~/errors/gymnia-try-errors';

export type EssayAsyncData = {
    content: string;
    setAsPending?: boolean;
}

export class GymniaEssayUserTryService {
  constructor(private readonly repository: GymniaEssayUserTryImplementation) {}

  async createTry(tryData: GymniaEssayUserTry): Promise<GymniaEssayUserTry> {
    const createTry = await this.repository.createTry(tryData);

    if (!createTry) {
      throw ThrowHttpError('NOT_CREATED');
    }

    return createTry;
  }

  async getTryById(id: number): Promise<GymniaEssayUserTry | undefined> {
    const tryById = await this.repository.getTryById(id);

    if (!tryById) {
      throw ThrowHttpError('NOT_FOUND');
    }

    return tryById;
  }

  async getTryListByUserId(userId: number, status?: GymniaEssayUserTryStatus): Promise<GymniaEssayUserTry[]> {
    return await this.repository.getTryListByUserId(userId, status);
  }

  async updateTry(
    id: number,
    tryData: EssayAsyncData,
    completion?: boolean,
  ): Promise<GymniaEssayUserTry> {
    if (!tryData.content) {
      throw ThrowGymniaTryError('LOW_ESSAY_LENGTH_OR_INEXISTENT_ESSAY');
    }

    const updateTry = await this.repository.updateTry(id, tryData, completion);

    if (!updateTry) {
      throw ThrowHttpError('NOT_FOUND');
    }

    return updateTry;
  }

  async deleteTry(id: number): Promise<void> {
    const deleteTry = await this.repository.deleteTry(id);

    if (!deleteTry) {
      throw ThrowHttpError('NOT_FOUND');
    }
  }
}
