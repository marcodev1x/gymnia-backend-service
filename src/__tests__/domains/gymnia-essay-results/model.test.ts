import { Model } from 'objection';
import { GymniaEssayResults } from '~/domains/gymnia-essay-results/model';
import { GymniaEssayUserTry } from '~/domains/gymnia-essay-user-try/model';
import { jestSetDate } from '~/helpers-tests/helpers';

describe('GymniaEssayResults model', () => {

    const mockedDate = new Date('2025-01-01');

    beforeEach(() => {
        jest.clearAllMocks();

        jestSetDate(mockedDate);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('should create a new essay result instance of GymniaEssayResults', () => {
        const essayResult = new GymniaEssayResults();

        expect(essayResult).toBeInstanceOf(GymniaEssayResults);
    });

    describe('GymniaEssayResults model methods', () => {
        const modelMethods = [
            { method: 'tableName', value: 'gymnia_essay_results' },
            { method: 'idColumn', value: 'id' },
        ];

        test.each(modelMethods)('should call $method and return the correct value $value', (method) => {
            const value = GymniaEssayResults[method.method];

            expect(value).toBe(method.value);
        });

        test('should call $beforeInsert with created_at and updated_at with new Date()', () => {
            const essayResult = new GymniaEssayResults();
            essayResult.$beforeInsert();

            expect(essayResult.created_at).toStrictEqual(mockedDate);
            expect(essayResult.updated_at).toStrictEqual(mockedDate);
        });

        test('should call $beforeUpdate with updated_at with new Date()', () => {
            const essayResult = new GymniaEssayResults();
            essayResult.$beforeUpdate();

            expect(essayResult.updated_at).toStrictEqual(mockedDate);
        });
    });

    describe('GymniaEssayResults model relations', () => {
        test('should contains essay_try as relation mapped', () => {
            expect(GymniaEssayResults.relationMappings).toStrictEqual(expect.objectContaining(
                {
                    essay_try: expect.any(Object),
                },
            ));
        });

        test('should container actual relation mapping in essay_try', () => {
            expect(GymniaEssayResults.relationMappings.essay_try).toStrictEqual(expect.objectContaining(
                {
                    relation: Model.BelongsToOneRelation,
                    modelClass: GymniaEssayUserTry,
                    join: expect.objectContaining(
                        {
                            from: 'gymnia_essay_results.essay_try_id',
                            to: 'gymnia_essay_user_try.id',
                        },
                    ),
                },
            ));
        });
    });

});
