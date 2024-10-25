module.exports = {
  collectCoverageFrom: ['packages/*/src/*.{ts,tsx}'],
  coverageReporters: ['html', 'lcovonly', 'text-summary'],
  moduleNameMapper: {
    '^uniforms/__suites__$': '<rootDir>/packages/uniforms/__suites__',
    '^uniforms([^/]*)(.*)$': '<rootDir>/packages/uniforms$1/src$2',
  },
  preset: 'ts-jest',
  setupFiles: ['./scripts/setupJest.ts', './scripts/setupFilterWarnings.ts'],
  setupFilesAfterEnv: ['./scripts/setupMatchers.ts'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/_[^/]*$', '\\.d\\.ts$'],
  transform: {
    '\\.(ts|tsx)$': ['ts-jest', { diagnostics: false }],
  },
};
