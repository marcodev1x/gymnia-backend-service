const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '**/?(*.)+(spec|test).+(ts|tsx|js)',
    ],
    extensionsToTreatAsEsm: ['.ts'],
    setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
    transform: {
        '^.+\\.ts$': ['ts-jest', { useESM: true }],
    },
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/src/$1',
    },
    testPathIgnorePatterns: [
        '/node_modules/',
        '<rootDir>/src/jest.setup.ts',
        '<rootDir>/src/__tests__/helpers/',
        '/dist/',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
