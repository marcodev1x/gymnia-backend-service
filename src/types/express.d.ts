// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';
import { UserWithPermissions } from '~/domains/users/model';

export type Pagination = {
    page: number;
    limit: number;
    offset: number;
};

declare module 'express-serve-static-core' {
    interface Request {
      pagination: Pagination;
      user?: UserWithPermissions;
  }
}
