module.exports = {
  collectCoverageFrom: ['packages/*/src/*.{ts,tsx}'],
  coverageReporters: ['html', 'lcovonly', 'text-summary'],
  moduleNameMapper: {
    '^meteor/([^:]*):(.*)$':
      '<rootDir>/packages/uniforms/__mocks__/meteor/$1_$2.ts',
    '^meteor/([^:]*)$': '<rootDir>/packages/uniforms/__mocks__/meteor/$1.ts',
    '^simpl-schema$': '<rootDir>/node_modules/simpl-schema',
    '^uniforms([^/]*)(.*)$': '<rootDir>/packages/uniforms$1/src$2'
  },
  setupFiles: ['./scripts/setupEnzyme.js'],
  testMatch: ['**/__tests__/**/!(_)*.{ts,tsx}', '!**/*.d.ts'],
  transform: {
    '^.+\\.(js|ts|tsx)$': './scripts/transform.js'
  }
};
