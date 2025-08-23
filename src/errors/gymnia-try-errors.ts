import { HttpError } from '~/generic-errors';

export enum GymniaTryErrors {
    LOW_ESSAY_LENGTH_OR_INEXISTENT_ESSAY = 'Redação com tamanho insuficiente ou inexistente',
}

export const GymniaTryErrorsData = {
  LOW_ESSAY_LENGTH_OR_INEXISTENT_ESSAY: {
    message: 'Redação com tamanho insuficiente ou inexistente',
    status: 400,
  },
};

export const ThrowGymniaTryError = (error: keyof typeof GymniaTryErrors) => {
  const { message, status } = GymniaTryErrorsData[error];
  throw new HttpError(message, status);
};
