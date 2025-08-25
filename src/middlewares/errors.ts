import { GenericErrors, HttpError } from '~/generic-errors';
import { isDevelopment } from '~/global';
import { NextFunction, Request, Response } from 'express';

export function errorMiddlewareSent(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(err);

  let code = 'GENERIC_INTERNAL_ERROR';
  let statusCode = GenericErrors().GENERIC_INTERNAL_ERROR.status;
  let message = GenericErrors().GENERIC_INTERNAL_ERROR.message;
  let exception: string | undefined;

  if (err instanceof HttpError) {
    statusCode = err.status;
    message = err.message;
    exception = isDevelopment ? err.stack : undefined;

    const match = Object.keys(GenericErrors()).find(
      key => GenericErrors()[key as keyof typeof GenericErrors].message === err.message,
    );
    if (match) {
      code = match;
    }
  } else if (err instanceof Error) {
    message = err.message || message;
    exception = isDevelopment ? err.stack : undefined;
  }

  res.status(statusCode).json({
    error: {
      code,       // Ex: "NOT_FOUND"
      message,    // Ex: "Element not found"
      exception,  // Apenas em dev
    },
  });
}
