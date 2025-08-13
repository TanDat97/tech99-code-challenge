module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/database/migrations/**',
    '!src/__tests__/**',
  ],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@configs$': '<rootDir>/src/configs',
    '^@core(.*)$': '<rootDir>/src/core$1',
    '^@database$': '<rootDir>/src/database',
    '^@helpers$': '<rootDir>/src/helpers',
    '^@libraries(.*)$': '<rootDir>/src/libraries$1',
    '^@middlewares$': '<rootDir>/src/middlewares',
    '^@utils$': '<rootDir>/src/utils',
  },
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/src/__tests__/setup.ts',
    '/src/__tests__/mocks/',
  ],
}; 