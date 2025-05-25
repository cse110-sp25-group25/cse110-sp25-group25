// jest.config.js
export default {
  collectCoverage: true,
  collectCoverageFrom: ['js/**/*.js'], 
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  transform: {}, // to suppress babel warning
  verbose: true,
  testMatch: ['**/__tests__/**/*.test.js'],
  testEnvironment: 'jsdom'  
};
