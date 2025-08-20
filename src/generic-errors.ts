interface GenericErrors {
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

export const GenericErrors: GenericErrors = {
  ALREADY_EXISTS: { message: 'User already exists', status: 409 },
  NOT_CREATED: { message: 'User not created', status: 500 },
  NOT_FOUND: { message: 'User not found', status: 404 },
} as const;

export const ThrowHttpError = (error: keyof typeof GenericErrors) => {
  const { message, status } = GenericErrors[error];
  throw new HttpError(message, status);
};
