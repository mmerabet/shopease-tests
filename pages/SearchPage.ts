import { type Locator, type Page } from '@playwright/test'
import { BasePage } from '@pages/BasePage'

/**
 * Page de recherche — automationexercise.com/products
 * Couvre : SHOP-28 (recherche de produits par mot-clé)
 * ⚠️ Pas de data-qa disponible — sélecteurs CSS en fallback.
 */
export class SearchPage extends BasePage {
    readonly searchInput: Locator

    constructor(page: Page) {
        super(page)
        this.searchInput = page.getByRole('textbox', { name: 'Search Product' })
    }

    async navigate() {
        await this.page.goto('/products')
    }

    async search(keyword: string) {
        await this.searchInput.fill(keyword)
        await this.page.locator('#submit_search').click()
    }

    async getProductCount() {
        return await this.page.locator('div.single-products').count()
    }

    async getProductNames() {
        return await this.page.locator('div.productinfo p').allTextContents()
    }

}
