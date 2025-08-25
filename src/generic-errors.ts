export enum GenericErrorsEnum {
    ALREADY_EXISTS = 'Element already exists',
    UNAUTHORIZED_INVALID_TOKEN = 'Unauthorized. Invalid token.',
    UNAUTHORIZED_TOKEN_NOT_FOUND = 'Unauthorized. Token not found.',
    NOT_CREATED = 'Element not created',
    NOT_FOUND = 'Element not found',
    GENERIC_INTERNAL_ERROR = 'Internal Server Error',
}

export interface GenericErrorsData {
    [key: string]: {
        message: string;
        status: number;
    }
}

export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export const GenericErrors = (element?: string): GenericErrorsData => ({
  ALREADY_EXISTS: { message: `${element} already exists`, status: 409 },
  UNAUTHORIZED_INVALID_TOKEN: { message: 'Unauthorized. Invalid token.', status: 401 },
  UNAUTHORIZED_TOKEN_NOT_FOUND: { message: 'Unauthorized. Token not found.', status: 401 },
  NOT_CREATED: { message: `${element} not created`, status: 500 },
  NOT_FOUND: { message: `${element} not found`, status: 404 },
  GENERIC_INTERNAL_ERROR: { message: 'Internal Server Error', status: 500 },
});

export const ThrowHttpError = ({
  element,
  error,
}: {
    element?: string;
    error: keyof GenericErrorsData;
}) => {
  const { message, status } = GenericErrors(element || 'Element')[error];
  throw new HttpError(message, status);
};
