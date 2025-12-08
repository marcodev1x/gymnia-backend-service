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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TAGS_ERRORS = [
    'ALREADY_EXISTS',
    'UNAUTHORIZED_INVALID_TOKEN',
    'UNAUTHORIZED_TOKEN_NOT_FOUND',
    'NOT_CREATED',
    'NOT_FOUND',
    'GENERIC_INTERNAL_ERROR',
    'VALIDATION_ERROR',
    'FORBIDDEN',
    'INVALID_PAGINATION_PARAMS',
    'INVALID_ACCESS',
    'NOT_UPDATED',
] as const;

export type GenericErrorKey = typeof TAGS_ERRORS[number];

export const GenericErrors = (element: string = 'Element'): GenericErrorsData => {
    return {
        ALREADY_EXISTS: {
            message: `${element} already exists`,
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
            message: `${element} not created`,
            status: 500,
            code: 'NOT_CREATED',
            retryable: true,
        },
        NOT_FOUND: {
            message: `${element} not found`,
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
        INVALID_PAGINATION_PARAMS: {
            message: 'Bad request using pagination params, probably invalid page or limit',
            status: 400,
            code: 'BAD_REQUEST',
            retryable: false,
        },
        INVALID_ACCESS: {
            message: 'Invalid access',
            status: 403,
            code: 'INVALID_ACCESS',
            retryable: false,
        },
        NOT_UPDATED: {
            message: `${element} not updated`,
            status: 500,
            code: 'NOT_UPDATED',
            retryable: true,
        },
    };
};

export const DefaultHttpError = ({
    element,
    error,
    customMessage,
    metadata,
}: {
    element?: string;
    error: GenericErrorKey;
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

    return httpError;
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
        400,
        'VALIDATION_ERROR',
    );
};
