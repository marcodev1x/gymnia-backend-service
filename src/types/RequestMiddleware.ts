import { Request } from 'express';
import { GymniaUser } from '~/domains/users/model';

export type RequestMiddleware = Request & {
    user?: Partial<GymniaUser>
}
