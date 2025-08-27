type MockingTypes = jest.Mock | jest.SpyInstance | (() => any) | Function;

export interface InterfaceExpectArgsTestCases {
    case?: string,
    fn?: Function,
    spy: MockingTypes,
    args: any[],
    atIndex?: number,
    useMockCall?: boolean,

    // extra value
    [key: string]: any;
}

export function jestSetDate(date: Date) {
    jest.useFakeTimers();
    jest.setSystemTime(date);
}

export function adaptMocks<T>(original: T, mock = {}): T {
    return { ...original, ...mock } as T;
}

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
