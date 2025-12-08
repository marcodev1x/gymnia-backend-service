import { HttpError } from '~/generic-errors';

export enum RecoveryPasswordErrors {
    USED,
    EXPIRED_TRY,
}

export const RecoveryPasswordErrorList = {
    USED: {
        message: 'Recovery try already used',
        status: 400,
        code: 'USED',
    },
    EXPIRED_TRY: {
        message: 'Recovery try expired',
        status: 400,
        code: 'EXPIRED_TRY',
    },
};

export const SendRecoveryError = (error: keyof typeof RecoveryPasswordErrors): never => {
    const { message, status } = RecoveryPasswordErrorList[error];

    const code = RecoveryPasswordErrorList[error].code;

    throw new HttpError(message, status, code);
};
