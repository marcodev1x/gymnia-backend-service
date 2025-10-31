import { EssayUserTry, EssayUserTryStatus } from './model';
import { EssayAsyncData } from './services';

export interface EssayUserTryRepository {
    createTry(tryData: EssayUserTry): Promise<EssayUserTry>;
    getTryById(id: number): Promise<EssayUserTry | undefined>;
    getTryListByUserId(userId: number, status?: EssayUserTryStatus): Promise<EssayUserTry[]>;
    updateTry(id: number, tryData: EssayAsyncData, completion?: boolean): Promise<EssayUserTry>;
    deleteTry(id: number): Promise<void | Error>;
}

export default class EssayUserTryImplementation implements EssayUserTryRepository {
    async createTry(tryData: Partial<EssayUserTry>): Promise<EssayUserTry> {
        return EssayUserTry
            .query()
            .insertAndFetch({ ...tryData, status: EssayUserTryStatus.PENDING });
    }

    async getTryById(id: number): Promise<EssayUserTry | undefined> {
        return EssayUserTry
            .query()
            .findById(id);
    }

    async getTryListByUserId(
        userId: number,
        status?: EssayUserTryStatus,
    ): Promise<EssayUserTry[]> {
        const query = EssayUserTry
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
    ): Promise<EssayUserTry> {
        const updateValues: Partial<EssayUserTry> = {};

        if ('title' in tryData) {
            updateValues.essay_title = tryData.title;
        }

        if ('content' in tryData) {
            updateValues.essay = tryData.content;
        }

        if (completion && !tryData.setAsPending) {
            updateValues.status = EssayUserTryStatus.COMPLETED;
        } else {
            updateValues.status = EssayUserTryStatus.PENDING;
        }

        return EssayUserTry
            .query()
            .updateAndFetchById(id, updateValues);
    }

    async deleteTry(id: number): Promise<void | Error> {
        await EssayUserTry
            .query()
            .deleteById(id);
    }
}
