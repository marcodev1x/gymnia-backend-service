import { permissionMiddleware } from '~/middlewares/permission';
import { DefaultHttpError } from '~/generic-errors';
import adaptMocks from '~/__tests__/helpers/adapt-mocks.helper';
import { Request } from 'express';
import { expressMock } from '~/mocks/default-mocks';
import { UserRoles } from '~/domains/permissions/model';

describe('permission middleware tests', () => {

    const { response, next } = expressMock;

    const uniquePermissionFn = permissionMiddleware(UserRoles.TRIAL);
    const arrayPermissionFn = permissionMiddleware([UserRoles.TRIAL, UserRoles.ADMIN]);

    const possibleUsesFunctions = [
        { fn: uniquePermissionFn },
        { fn: arrayPermissionFn },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('error cases', () => {
        test('should throw UNAUTHORIZED_INVALID_PERMISSION if user is not logged', async () => {
            const requestNotLogged = adaptMocks<Request>({ user: undefined });

            expect(() => uniquePermissionFn(requestNotLogged, response, next))
                .toThrow(DefaultHttpError({ error: 'UNAUTHORIZED_TOKEN_NOT_FOUND' }));
        });

        test.each(possibleUsesFunctions)('should throw FORBIDDEN error in error cases', async ({ fn }) => {
            const requestDifferentRole = adaptMocks<Request>({
                user: { permissions: { role_name: 'any_other_role' } },
            });

            expect(() => fn(requestDifferentRole, response, next))
                .toThrow(DefaultHttpError({ error: 'FORBIDDEN' }));
        });
    });

    describe('success cases (next)', () => {
        test.each(possibleUsesFunctions)('should call next if user has permission to that route', async ({ fn }) => {
            const requestSameRole = adaptMocks<Request>({
                user: { permissions: { role_name: UserRoles.TRIAL } },
            });

            fn(requestSameRole, response, next);

            expect(next).toHaveBeenCalledTimes(1);
        });
    });

});
