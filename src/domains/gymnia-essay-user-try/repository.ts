import { GymniaEssayUserTry, GymniaEssayUserTryStatus } from './model';
import { EssayAsyncData } from './services';

export interface GymniaEssayUserTryRepository {
    createTry(tryData: GymniaEssayUserTry): Promise<GymniaEssayUserTry>;
    getTryById(id: number): Promise<GymniaEssayUserTry | undefined>;
    getTryListByUserId(userId: number, status?: GymniaEssayUserTryStatus): Promise<GymniaEssayUserTry[]>;
    updateTry(id: number, tryData: EssayAsyncData, completion?: boolean): Promise<GymniaEssayUserTry>;
    deleteTry(id: number): Promise<void | Error>;
}

export class GymniaEssayUserTryImplementation implements GymniaEssayUserTryRepository {
  async createTry(tryData: GymniaEssayUserTry): Promise<GymniaEssayUserTry> {
    return GymniaEssayUserTry
      .query()
      .insertAndFetch({ ...tryData, status: GymniaEssayUserTryStatus.PENDING });
  }

  async getTryById(id: number): Promise<GymniaEssayUserTry | undefined> {
    return GymniaEssayUserTry
      .query()
      .findById(id);
  }

  async getTryListByUserId(
    userId: number,
    status?: GymniaEssayUserTryStatus,
  ): Promise<GymniaEssayUserTry[]> {
    const query = GymniaEssayUserTry
      .query()
      .where('user_id', userId);

    if (status) {
      query.where('status', status);
    }

    return query;
  }

  async updateTry(
    id: number,
    tryData: EssayAsyncData,
    completion?: boolean,
  ): Promise<GymniaEssayUserTry> {
    const updateValues: Partial<GymniaEssayUserTry> = {};

    if ('content' in tryData) {
      updateValues.essay = tryData.content;
    }

    if (completion && !tryData.setAsPending) {
      updateValues.status = GymniaEssayUserTryStatus.COMPLETED;
    } else {
      updateValues.status = GymniaEssayUserTryStatus.PENDING;
    }

    return GymniaEssayUserTry
      .query()
      .updateAndFetchById(id, updateValues);
  }

  async deleteTry(id: number): Promise<void | Error> {
    await GymniaEssayUserTry
      .query()
      .deleteById(id);
  }
}
