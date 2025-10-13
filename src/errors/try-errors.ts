import { HttpError } from '~/generic-errors';

export enum TryErrors {
    LOW_ESSAY_LENGTH_OR_INEXISTENT_ESSAY,
    ERROR_TO_CORRECT_ESSAY,
}

export const TryErrorsData = {
    LOW_ESSAY_LENGTH_OR_INEXISTENT_ESSAY: {
        message: 'Redação com tamanho insuficiente ou inexistente',
        status: 400,
    },
    ERROR_TO_CORRECT_ESSAY: {
        message: 'Erro ao corrigir redação com inteligência artificial',
        status: 500,
    },
};

export const SendTryError = (error: keyof typeof TryErrors): never => {
    const { message, status } = TryErrorsData[error];
    throw new HttpError(message, status);
};
