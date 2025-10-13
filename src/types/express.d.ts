import { Request } from 'express';
import { Pagination } from './Pagination';

declare module 'express-serve-static-core' {
    interface Request {
      pagination?: Pagination;
    }
  }
