module.exports = {
  collectCoverageFrom: ['packages/*/src/*.{ts,tsx}'],
  coverageReporters: ['html', 'lcovonly', 'text-summary'],
  moduleNameMapper: {
    '^meteor/([^:]*):(.*)$':
      '<rootDir>/packages/uniforms/__mocks__/meteor/$1_$2.ts',
    '^meteor/([^:]*)$': '<rootDir>/packages/uniforms/__mocks__/meteor/$1.ts',
    '^simpl-schema$': '<rootDir>/node_modules/simpl-schema',
    '^uniforms/__suites__': '<rootDir>/packages/uniforms/__suites__',
    '^uniforms([^/]*)(.*)$': '<rootDir>/packages/uniforms$1/src$2',
  },
  preset: 'ts-jest',
  setupFiles: ['./scripts/setupEnzyme.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/_[^/]*$', '\\.d\\.ts$'],
};
