import { Request } from 'express';
import { UserWithPermissions } from '~/domains/users/model';

export type RequestMiddleware = Request & {
    user?: UserWithPermissions
}
