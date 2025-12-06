import { RecoveryPasswordRepository } from '~/domains/recovery-password/repository';
import { DefaultHttpError } from '~/generic-errors';
import crypto from 'crypto';
import { RecoveryPassword } from '~/domains/recovery-password/model';

export class RecoveryPasswordService {
    constructor(private readonly repository: RecoveryPasswordRepository) {}

    async createRecoveryTry(userId: number): Promise<RecoveryPassword> {
        let token = '';

        while(true) {
            const tokenAttempt = crypto.randomUUID();

            const recoveryTry = await this.repository.getRecoveryTry(token);

            if (!recoveryTry) {
                token = tokenAttempt;
                break;
            }
        }

        const recoveryTry = await this.repository.createRecoveryTry(userId, token);

        if (!recoveryTry) {
            throw DefaultHttpError({ element: 'Recovery try', error: 'NOT_CREATED' });
        }

        return recoveryTry;
    }
}
