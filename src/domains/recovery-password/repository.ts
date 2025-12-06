import { RecoveryPassword } from '~/domains/recovery-password/model';

export interface RecoveryPasswordRepository {
    createRecoveryTry(userId: number, token: string): Promise<RecoveryPassword>;
    getRecoveryTry(token: string): Promise<RecoveryPassword | undefined>;
}

export class RecoveryPasswordImplementation implements RecoveryPasswordRepository {
    async createRecoveryTry(userId: number, token: string): Promise<RecoveryPassword> {
        return RecoveryPassword
            .query()
            .insertAndFetch({ user_id: userId, token });
    }

    async getRecoveryTry(token: string): Promise<RecoveryPassword | undefined> {
        return RecoveryPassword
            .query()
            .where('token', token)
            .first();
    }
}
