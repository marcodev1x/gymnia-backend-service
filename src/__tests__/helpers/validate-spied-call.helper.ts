// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type MockingTypes = jest.Mock | jest.SpyInstance | (() => any) | Function;

export interface InterfaceExpectArgsTestCases {
    case?: string,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    fn?: Function,
    spy: MockingTypes,
    args: any[],
    atIndex?: number,
    useMockCall?: boolean,

    // extra value
    [key: string]: any;
}

/**
 * Validates that a spy was called with specific arguments
 * @param spy - Jest mock function
 * @param args - Expected arguments
 * @param atIndex - Index of the call to validate (default: 1) (useful for multiple calls, like 2 where in a query)
 * @param useMockCall - Use mock.calls instead of toHaveBeenCalledWith (better flexibility with static values)
 */
export function expectCallWithArgs({
    spy,
    args,
    atIndex = 1,
    useMockCall = false,
}: InterfaceExpectArgsTestCases) {
    if (useMockCall && !(spy instanceof Function)) {
        const spyMockCall = spy.mock.calls[atIndex - 1];

        expect(spyMockCall).toEqual(expect.arrayContaining(args));
        return;
    }
    expect(spy).toHaveBeenNthCalledWith(atIndex, ...args);
}
