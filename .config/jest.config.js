// .config/jest.config.js
export default {
  rootDir: '../',
  collectCoverage: true,
  collectCoverageFrom: ['js/**/*.utils.js'],
  coverageDirectory: 'docs/coverage',
  coverageReporters: [
    'json-summary',
    'json',
    'lcov',
    'text'
  ],
  transform: {}, // suppress babel warning
  verbose: true,
  testMatch: ['**/__tests__/**/*.test.js'],
  testEnvironment: 'jsdom'
};
