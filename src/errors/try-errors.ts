import { HttpError } from '~/generic-errors';

export enum TryErrors {
    LOW_ESSAY_LENGTH_OR_INEXISTENT_ESSAY,
    ERROR_TO_CORRECT_ESSAY,
    UNEXISTENT_ESSAY_TRY,
    INVALID_TRY_OWNER,
    DAILY_LIMIT_REACHED,
}

export const TryErrorsData = {
    LOW_ESSAY_LENGTH_OR_INEXISTENT_ESSAY: {
        message: 'Essay length is too low or essay is not provided',
        status: 400,
    },
    ERROR_TO_CORRECT_ESSAY: {
        message: 'Error at correct essay. Please, try again later',
        status: 500,
    },
    INVALID_TRY_OWNER: {
        message: 'Try owner invalid',
        status: 403,
    },
    UNEXISTENT_ESSAY_TRY: {
        message: 'Essay try not found',
        status: 404,
    },
    DAILY_LIMIT_REACHED: {
        message: 'Daily limit reached',
        status: 400,
    },
};

export const SendTryError = (error: keyof typeof TryErrors): never => {
    const { message, status } = TryErrorsData[error];
    throw new HttpError(message, status);
};
