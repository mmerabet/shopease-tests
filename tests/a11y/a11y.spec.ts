import { test } from '@fixtures/index'
import { AxeBuilder } from '@axe-core/playwright'

const auditPages = [
    { name: 'Login',          path: '/login' },
    { name: 'Products',       path: '/products' },
    { name: 'Product Detail', path: '/product_details/1' },
]

test.describe('A11y — Audit accessibilité', { tag: '@sprint3' }, () => {

    for (const { name, path } of auditPages) {
        test(`A11y audit — ${name}`, async ({ page }) => {
            await page.goto(path)

            const results = await new AxeBuilder({ page }).analyze()

            results.violations.forEach(v => {
                console.log(`[${v.impact}] ${v.id} — ${v.description}`)
            })
        })
    }

})
