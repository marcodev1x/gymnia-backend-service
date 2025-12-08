import { RecoveryPasswordRepository } from '~/domains/recovery-password/repository';
import { DefaultHttpError } from '~/generic-errors';
import crypto from 'crypto';
import { RecoveryPassword } from '~/domains/recovery-password/model';
import { SendRecoveryError } from '~/errors/recovery-password-errors';

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

    async rulesRecoveryTry(token: string): Promise<RecoveryPassword> {
        // Regras.
        // 1. Token existente. 2. Token não usado. 3. Token não expirado (validade de 2 horas).

        const recoveryTry = await this.repository.getRecoveryTry(token);

        if (!recoveryTry) {
            throw DefaultHttpError({ element: 'Recovery try', error: 'NOT_FOUND' });
        }

        if (recoveryTry?.used) {
            throw SendRecoveryError('USED');
        }

        if (recoveryTry?.expires_at < new Date()) {
            throw SendRecoveryError('EXPIRED_TRY');
        }

        return recoveryTry;
    }

    async updateRecoveryTry(token: string) {
        await this.repository.updateRecoveryTry(token);
    }
}
