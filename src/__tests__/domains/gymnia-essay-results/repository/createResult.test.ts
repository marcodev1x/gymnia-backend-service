import { QueryBuilderType } from 'objection';
import { GymniaEssayResults } from '~/domains/gymnia-essay-results/model';
import { GymniaEssayResultsRepositoryImplementation } from '~/domains/gymnia-essay-results/repository';
import { adaptMocks, expectCallWithArgs, InterfaceExpectArgsTestCases } from '~/helpers-tests/helpers';

type createResultDataTypes = {
    essay_try_id: number;
    score: number;
    ia_result: JSON;
}

describe('createResult method', () => {
    const { createResult } = new GymniaEssayResultsRepositoryImplementation();

    const data = adaptMocks<createResultDataTypes>({
        essay_try_id: 1,
        score: 10,
        ia_result: JSON.parse(JSON.stringify({ test: 'test' })),
    });

    const mockInsertAndFetch = jest.fn().mockResolvedValue({
        created: true,
    });
    const spyQuery = jest.spyOn(GymniaEssayResults, 'query');

    beforeEach(() => {
        jest.clearAllMocks();

        spyQuery.mockReturnValue({
            insertAndFetch: mockInsertAndFetch,
        } as unknown as QueryBuilderType<GymniaEssayResults>);
    });

    const {
        essay_try_id,
        score,
        ia_result,
    } = data;

    test('should create a new registry in database', async () => {
        await expect(createResult(essay_try_id, score, ia_result))
            .resolves
            .toEqual({
                created: true,
            });
    });

    describe('implementation test cases', () => {
        const implementationTestCases: InterfaceExpectArgsTestCases[] = [
            {
                case: 'should call .query',
                spy: spyQuery,
                args: [],
            },
            {
                case: 'should call .insertAndFetch',
                spy: mockInsertAndFetch,
                args: [
                    expect.objectContaining({
                        essay_try_id,
                        score,
                        ia_result,
                    }),
                ],
            },
        ];

        test.each(implementationTestCases)('$case', async ({ spy, args }) => {
            await createResult(essay_try_id, score, ia_result);

            expectCallWithArgs({
                spy,
                args,
            });
        });
    });
});
