// jest.config.js
export default {
  collectCoverage: true,
  collectCoverageFrom: ['js/**/*.utils.js'],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'json-summary',  // ← tells Jest to write coverage/coverage-summary.json
    'json', 
    'lcov',
    'text'
  ],
  transform: {},    // suppress babel warning
  verbose: true,
  testMatch: ['**/__tests__/**/*.test.js'],
  testEnvironment: 'jsdom'
};
