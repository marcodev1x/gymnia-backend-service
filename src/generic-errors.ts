
export enum GenericErrorsEnum {
    ALREADY_EXISTS = 'Element already exists',
    UNAUTHORIZED_INVALID_TOKEN = 'Unauthorized. Invalid token.',
    UNAUTHORIZED_TOKEN_NOT_FOUND = 'Unauthorized. Token not found.',
    NOT_CREATED = 'Element not created',
    NOT_FOUND = 'Element not found',
    GENERIC_INTERNAL_ERROR = 'Internal Server Error',
    // Pequenas adições úteis
    VALIDATION_ERROR = 'Validation failed',
    FORBIDDEN = 'Forbidden access',
}

export interface GenericErrorsData {
    [key: string]: {
        message: string;
        status: number;
        code?: string;
        retryable?: boolean;
    }
}

export class HttpError extends Error {
    status: number;
    code?: string;
    retryable?: boolean;
    timestamp: Date;

    constructor(message: string, status: number, code?: string, retryable?: boolean) {
        super(message);
        this.status = status;
        this.code = code;
        this.retryable = retryable;
        this.timestamp = new Date();

        this.name = 'HttpError';
        Object.setPrototypeOf(this, HttpError.prototype);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }
    }

    toJSON() {
        return {
            message: this.message,
            status: this.status,
            code: this.code,
            timestamp: this.timestamp,
            retryable: this.retryable,
        };
    }
}

export const GenericErrors = (element?: string): GenericErrorsData => ({
    ALREADY_EXISTS: {
        message: `${element || 'Element'} already exists`,
        status: 409,
        code: 'ALREADY_EXISTS',
        retryable: false,
    },
    UNAUTHORIZED_INVALID_TOKEN: {
        message: 'Unauthorized. Invalid token.',
        status: 401,
        code: 'UNAUTHORIZED_INVALID_TOKEN',
        retryable: false,
    },
    UNAUTHORIZED_TOKEN_NOT_FOUND: {
        message: 'Unauthorized. Token not found.',
        status: 401,
        code: 'UNAUTHORIZED_TOKEN_NOT_FOUND',
        retryable: false,
    },
    NOT_CREATED: {
        message: `${element || 'Element'} not created`,
        status: 500,
        code: 'NOT_CREATED',
        retryable: true, // Erro de servidor pode ser tentado novamente
    },
    NOT_FOUND: {
        message: `${element || 'Element'} not found`,
        status: 404,
        code: 'NOT_FOUND',
        retryable: false,
    },
    GENERIC_INTERNAL_ERROR: {
        message: 'Internal Server Error',
        status: 500,
        code: 'INTERNAL_ERROR',
        retryable: true,
    },
    VALIDATION_ERROR: {
        message: 'Validation failed',
        status: 422,
        code: 'VALIDATION_ERROR',
        retryable: false,
    },
    FORBIDDEN: {
        message: 'Forbidden access',
        status: 403,
        code: 'FORBIDDEN',
        retryable: false,
    },
});

export const ThrowHttpError = ({
    element,
    error,
    customMessage,
    metadata,
}: {
    element?: string;
    error: keyof GenericErrorsData;
    customMessage?: string;
    metadata?: Record<string, unknown>;
}) => {
    const errorConfig = GenericErrors(element || 'Element')[error];

    if (!errorConfig) {
        throw new Error(`Error configuration not found for: ${error}`);
    }

    const { message, status, code, retryable } = errorConfig;

    const finalMessage = customMessage || message;

    const httpError = new HttpError(finalMessage, status, code, retryable);

    if (metadata) {
        Object.assign(httpError, metadata);
    }

    throw httpError;
};

export const isHttpError = (error: unknown): error is HttpError => {
    return error instanceof HttpError;
};

export const isRetryableError = (error: HttpError): boolean => {
    return error.retryable === true;
};

export const createValidationError = (field: string, value?: unknown) => {
    return new HttpError(
        `Validation failed for field: ${field}${value ? ` (value: ${value})` : ''}`,
        422,
        'VALIDATION_ERROR',
        false,
    );
};
