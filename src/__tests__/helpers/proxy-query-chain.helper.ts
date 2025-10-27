import { AnyQueryBuilder, QueryBuilderType } from 'objection';

const newInstance = ['$query'];

const createMockQueryChain = (): jest.Mocked<QueryBuilderType<any>> => new Proxy({}, {
    get: (target, prop) => {
        const obj = target;
        if (!obj[prop]) {
            obj[prop] = jest.fn().mockReturnThis();
        }

        if (typeof prop === 'string' && newInstance.includes(prop)) {
            obj[prop] = jest.fn(() => createMockQueryChain());
        }

        return obj[prop];
    },
}) as jest.Mocked<AnyQueryBuilder>;

export default createMockQueryChain;
