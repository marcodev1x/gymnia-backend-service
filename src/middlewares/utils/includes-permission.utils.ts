import { GymniaUserRoles } from '~/domains/gymnia-permissions/model';

export const includesPermission = (
    role_permission: GymniaUserRoles | GymniaUserRoles[],
    permission: GymniaUserRoles,
): boolean => {
    if (permission === GymniaUserRoles.ADMIN) return true;

    if (Array.isArray(role_permission)) {
        return role_permission.includes(permission);
    }

    return role_permission === permission;
};
