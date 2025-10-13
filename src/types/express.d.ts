// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
      pagination?: {
        page?: number;
        limit?: number;
        offset?: number;
      };
    }
  }
