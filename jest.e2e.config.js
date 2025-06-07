export default {
  preset: 'jest-puppeteer',
  testMatch: ['**/e2e/**/*.test.js'],
  setupFilesAfterEnv: ['./jest-puppeteer.config.js'],
  testTimeout: 30000,
  transform: {},
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  }
}; 