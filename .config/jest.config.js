// .config/jest.config.js
export default {
  rootDir: '../',
  collectCoverage: true,
  collectCoverageFrom: ['js/**/*.js'],
  coverageDirectory: 'docs/coverage',
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'docs/coverage', outputName: 'junit.xml' }]
  ],
  coverageReporters: [
    'json-summary',  // ← tells Jest to write coverage/coverage-summary.json
    'json', 
    'lcov',
    'text',
    'cobertura'
  ],

  transform: {},    // suppress babel warning
  verbose: true,
  testMatch: ['**/__tests__/*.test.js'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/e2e/']
};
