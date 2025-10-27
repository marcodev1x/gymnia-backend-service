import adaptMocks from '~/__tests__/helpers/adapt-mocks.helper';
import { Request } from 'express';
import { expressMock } from '~/mocks/default-mocks';
import { pagination } from '~/middlewares/pagination';
import { DefaultHttpError } from '~/generic-errors';

describe('Middleware pagination tests', () => {

    const mockedRequest = adaptMocks<Request>(
        {
            query: {
                page: 1,
                limit: 10,
            },
        },
    );

    const { response, next } = expressMock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('error cases', () => {

        const errorCases = [
            {
                case: 'should throw INVALID_PAGINATION_PARAMS if page is not a number',
                query: {
                    page: 'invalid_page',
                    limit: 10,
                },
            },
            {
                case: 'should throw INVALID_PAGINATION_PARAMS if limit is not a number',
                query: {
                    page: 10,
                    limit: 'invalid_limit',
                },
            },
            {
                case: 'should throw INVALID_PAGINATION_PARAMS if page and limit is not a number',
                query: {
                    page: 'invalid_page',
                    limit: 'invalid_limit',
                },
            },
            {
                case: 'should throw INVALID_PAGINATION_PARAMS if page is less than 1',
                query: {
                    page: -1,
                    limit: 10,
                },
            },
            {
                case: 'should throw INVALID_PAGINATION_PARAMS if limit is less than 1',
                query: {
                    page: 10,
                    limit: -1,
                },
            },
            {
                case: 'should throw INVALID_PAGINATION_PARAMS if page and limit is less than 1',
                query: {
                    page: -1,
                    limit: -1,
                },
            },
        ];

        test.each(errorCases)('$case', async ({ query }) => {
            const request = adaptMocks<Request>({ query });

            expect(() => pagination(request, response, next))
                .toThrow(DefaultHttpError({ error: 'INVALID_PAGINATION_PARAMS' }));
        });
    });

    describe('success cases', () => {
        test('should call next if pagination is successful', async () => {
            expect(() => pagination(mockedRequest, response, next))
                .not
                .toThrow();

            expect(next).toHaveBeenCalled();
            expect(mockedRequest.pagination).toEqual({
                page: 1,
                limit: 10,
                offset: 0,
            });
        });
    });

    describe('edge cases', () => {
        test('should default page=1 and limit=10 when not provided', () => {
            const req = adaptMocks<Request>({ query: {} });

            pagination(req, response, next);

            expect(req.pagination).toEqual({ page: 1, limit: 10, offset: 0 });
            expect(next).toHaveBeenCalled();
        });
    });

});
