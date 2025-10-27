export default function adaptMocks<T>(base = {}, adaptation = {}): T {
    return {
        ...base,
        ...adaptation,
    } as T;
}
