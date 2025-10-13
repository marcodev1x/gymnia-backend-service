import { SendHttpError } from '~/generic-errors';
import { RequestMiddleware } from '~/types/RequestMiddleware';
import { NextFunction, Response } from 'express';
import { includesPermission } from './utils/includes-permission.utils';
import { UserRoles } from '~/domains/permissions/model';

export const permissionMiddleware = (role_permission: UserRoles | UserRoles[]) => {
    return (req: RequestMiddleware, _res: Response, next: NextFunction) => {

        if (!req.user) {
            throw SendHttpError({ error: 'UNAUTHORIZED_TOKEN_NOT_FOUND' });
        }

        if (Array.isArray(role_permission)) {
            if (includesPermission(role_permission, req.user.permissions.role_name)) {
                return next();
            }
        }

        if (includesPermission(role_permission, req.user.permissions.role_name)) {
            return next();
        }

        throw SendHttpError({ error: 'FORBIDDEN' });
    };
};
