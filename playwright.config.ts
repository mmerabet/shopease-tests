import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'results/junit-report.xml' }],
  ],
  use: {
    baseURL: 'https://www.automationexercise.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        // WebKit est plus lent sur le site externe — actionTimeout étendu pour éviter les faux positifs
        actionTimeout: 45000,
      },
    },
    {
      name: 'authenticated',
      use: { ...devices['Desktop Chrome'], storageState: 'tests/setup/auth.json' },
      dependencies: ['setup'],
      testMatch: '**/checkout.spec.ts',
    },
  ],
});