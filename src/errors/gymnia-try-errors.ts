import { HttpError } from '~/generic-errors';

export enum GymniaTryErrors {
    LOW_ESSAY_LENGTH_OR_INEXISTENT_ESSAY,
    ERROR_AT_CORRECT_ESSAY,
}

export const GymniaTryErrorsData = {
  LOW_ESSAY_LENGTH_OR_INEXISTENT_ESSAY: {
    message: 'Redação com tamanho insuficiente ou inexistente',
    status: 400,
  },
  ERROR_AT_CORRECT_ESSAY: {
    message: 'Erro ao corrigir redação com inteligência artificial',
    status: 500,
  },
};

export const ThrowGymniaTryError = (error: keyof typeof GymniaTryErrors): never => {
  const { message, status } = GymniaTryErrorsData[error];
  throw new HttpError(message, status);
};
