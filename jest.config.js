module.exports = {
    roots: ['<rootDir>/frontend/src'],
    setupFilesAfterEnv: ['<rootDir>/frontend/src/setupTests.ts'],
    testMatch: ['<rootDir>/frontend/src/**/*.test.{js,jsx,ts,tsx}'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
