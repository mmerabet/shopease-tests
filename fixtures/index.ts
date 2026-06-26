import { test as base, expect } from '@playwright/test'

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.route(
            /googlesyndication|doubleclick|googleadservices|googletagmanager/,
            route => route.abort()
        )

        await page.addLocatorHandler(
            page.getByRole('button', { name: /Consent|Autoriser/i }),
            async (button) => { await button.click() }
        )

        await use(page)
    },
})

export { expect }
