module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/shared/components/$1',
    '^@services/(.*)$': '<rootDir>/src/shared/services/$1',
    '^@models/(.*)$': '<rootDir>/src/shared/utils/models/$1',
    '^@functions/(.*)$': '<rootDir>/src/shared/utils/functions/$1',
    '^@types/(.*)$': '<rootDir>/src/shared/utils/types/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^uuid$': '<rootDir>/src/testing/mocks/uuid.ts',
  },
  transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|@angular/common/locales/.*\\.js$))'],
};
