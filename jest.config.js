// jest.config.js
export default {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    transform: {}, // to suppress babel warning
    verbose: true,
    testMatch: ['**/specs/**/*.test.js'] // match your test file structure
  };
  