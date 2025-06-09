export default {
  rootDir: '../',
  preset: 'jest-puppeteer',
  testMatch: ['**/__tests__/e2e/**/*.test.js'],
  setupFilesAfterEnv: ['./.config/jest-puppeteer.config.js'],
  testTimeout: 30000,
  transform: {},
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  }
}; 