import { Request } from 'express';
import adaptMocks from '~/__tests__/helpers/adapt-mocks.helper';
import { authentication } from '~/middlewares/authentication';
import { DefaultHttpError, GenericErrorKey } from '~/generic-errors';
import { JwtPayload, verifyJwtToken } from '~/middlewares/utils/jwt.utils';
import { expressMock } from '~/mocks/default-mocks';
import { JsonWebTokenError } from 'jsonwebtoken';
import { userService } from '~/domains/users/controller';
import { UserWithPermissions } from '~/domains/users/model';
import { expectCallWithArgs, InterfaceExpectArgsTestCases } from '~/__tests__/helpers/validate-spied-call.helper';

jest.mock('~/middlewares/utils/jwt.utils', () => {
    const originalModule = jest.requireActual('~/middlewares/utils/jwt.utils');

    return {
        ...originalModule,
        verifyJwtToken: jest.fn(),
    };
});

jest.mock('~/domains/users/controller', () => {
    const originalModule = jest.requireActual('~/domains/users/controller');

    return {
        ...originalModule,
        userService: {
            findById: jest.fn(),
        },
    };
});

describe('Middleware authentication tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockedVerifyJwtToken = jest.mocked(verifyJwtToken)
        .mockReturnValue(
            adaptMocks<JwtPayload>({
                id: 123,
            }),
        );

    const mockedUserFindById = jest.mocked(userService.findById)
        .mockResolvedValue(
            adaptMocks<UserWithPermissions>({
                id: 1,
                name: 'any_name',
                email: 'any_email',
                password: 'any_password',
            }),
        );

    const mockedRequest = adaptMocks<Request>(
        {
            headers: {
                authorization: 'Bearer valid_token',
            },
        },
    );

    const { response, next } = expressMock;

    describe('error cases', () => {
        const errorTokenCases = [
            {
                token: null,
                expectedError: 'UNAUTHORIZED_TOKEN_NOT_FOUND',
                maintainDefault: false,
            },
            {
                token: 'Bearer invalid_token',
                expectedError: 'UNAUTHORIZED_INVALID_TOKEN',
                maintainDefault: true,
            },
        ];

        test.each(errorTokenCases)('should throw error $expectedError when token is $token', async ({
            token,
            expectedError,
            maintainDefault,
        }) => {
            if (maintainDefault) {
                const actual = jest.requireActual('~/middlewares/utils/jwt.utils');
                mockedVerifyJwtToken.mockImplementationOnce(actual.verifyJwtToken);
            }

            const requestSubstituteToken = adaptMocks<Request>(
                {
                    headers: {
                        authorization: token,
                    },
                },
            );

            await expect(authentication(requestSubstituteToken, response, next))
                .rejects
                .toThrow(DefaultHttpError({ error: expectedError as GenericErrorKey }));
        });

        test('should throw error UNAUTHORIZED_INVALID_TOKEN when decoded token is valid but have no id', async () => {
            mockedVerifyJwtToken.mockImplementationOnce(() => ({
                id: 0,
            }));

            await expect(authentication(mockedRequest, response, next))
                .rejects
                .toThrow(DefaultHttpError({ error: 'UNAUTHORIZED_INVALID_TOKEN' }));

            expect(next).not.toHaveBeenCalled();
        });

        test('should throw error UNAUTHORIZED_INVALID_TOKEN if jwt fn throws JsonWebTokenError', async () => {
            mockedVerifyJwtToken.mockImplementationOnce(() => {
                throw new JsonWebTokenError('Invalid token');
            });

            await expect(authentication(mockedRequest, response, next))
                .rejects
                .toThrow(DefaultHttpError({ error: 'UNAUTHORIZED_INVALID_TOKEN' }));

            expect(next).not.toHaveBeenCalled();
        });

        const promiseErrorCases = [
            {
                mockedFn: mockedVerifyJwtToken,
                error: new Error('Any other error'),
            },
            {
                mockedFn: mockedUserFindById,
                error: new Error('Any findById error'),
            },
        ];

        test.each(promiseErrorCases)('should throw error $expectedError if $mockedFn fails', async ({
            mockedFn,
            error,
        }) => {
            mockedFn.mockImplementationOnce(() => {
                throw error;
            });

            await expect(authentication(mockedRequest, response, next))
                .rejects
                .toThrow(error);

            expect(next).not.toHaveBeenCalled();
        });
    });

    describe('success cases', () => {
        test('should call next if authentication is successful', async () => {
            await authentication(mockedRequest, response, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(mockedRequest.user).toEqual(
                expect.objectContaining({
                    id: 1,
                    name: 'any_name',
                    email: 'any_email',
                    password: 'any_password',
                }),
            );
        });
    });

    describe('important calls validations', () => {
        const expectCalls: InterfaceExpectArgsTestCases[] = [
            {
                case: 'should call verifyJwtToken with token',
                spy: mockedVerifyJwtToken,
                args: [mockedRequest.headers.authorization?.split(' ')[1] as string],
            },
            {
                case: 'should call findById with id',
                spy: mockedUserFindById,
                args: [123],
            },
        ];

        test.each(expectCalls)('$case', async ({ spy, args }) => {
            await authentication(mockedRequest, response, next);

            expectCallWithArgs({ spy, args });
        });
    });
});
