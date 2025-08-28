import { Request } from 'express';
import { GymniaUserWithPermissions } from '~/domains/users/model';

export type RequestMiddleware = Request & {
    user?: GymniaUserWithPermissions
}
