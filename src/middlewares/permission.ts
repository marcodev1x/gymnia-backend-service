import { DefaultHttpError } from '~/generic-errors';
import { NextFunction, Response, Request } from 'express';
import { includesPermission } from './utils/includes-permission.utils';
import { UserRoles } from '~/domains/permissions/model';

export const permissionMiddleware = (role_permission: UserRoles | UserRoles[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {

        if (!req.user) {
            throw DefaultHttpError({ error: 'UNAUTHORIZED_TOKEN_NOT_FOUND' });
        }

        if (Array.isArray(role_permission)) {
            if (includesPermission(role_permission, req.user.permissions.role_name)) {
                return next();
            }
        }

        if (includesPermission(role_permission, req.user.permissions.role_name)) {
            return next();
        }

        throw DefaultHttpError({ error: 'FORBIDDEN' });
    };
};
