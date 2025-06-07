import { env } from 'process';

export default {
  launch: {
    headless: env.CI === 'true',
    slowMo: env.CI === 'true' ? 100 : 0,
    defaultViewport: {
      width: 1280,
      height: 800
    }
  },
  browserContext: 'default'
}; 