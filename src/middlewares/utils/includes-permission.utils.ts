import { UserRoles } from '~/domains/permissions/model';

export const includesPermission = (
    role_permission: UserRoles | UserRoles[],
    permission: UserRoles,
): boolean => {
    if (permission === UserRoles.ADMIN) return true;

    if (Array.isArray(role_permission)) {
        return role_permission.includes(permission);
    }

    return role_permission === permission;
};
