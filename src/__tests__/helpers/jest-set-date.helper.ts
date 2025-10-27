export function jestSetDate(date: string) {
    jest.useFakeTimers().setSystemTime(new Date(date));
}
