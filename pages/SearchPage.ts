import { type Locator, type Page } from '@playwright/test'

/**
 * Page de recherche — automationexercise.com/products
 * Couvre : saisie dans le champ de recherche, validation du résultat.
 * ⚠️ Pas de data-qa disponible — sélecteurs CSS en fallback.
 */
export class SearchPage {
    readonly page: Page
    readonly searchInput: Locator
    readonly searchIcon: Locator
    readonly productCards: Locator
    readonly productName: Locator

    constructor(page: Page) {
        this.page = page
        this.searchInput = page.getByRole('textbox', { name: 'Search Product' })
        this.searchIcon = page.locator('#submit_search')
        this.productCards = page.locator('div.single-products')
        this.productName = page.locator('div.productinfo p')
    }

    async navigate() {
        await this.page.goto('/products')
    }

    async search(keyword: string) {
        await this.searchInput.fill(keyword)
        await this.searchIcon.click()
    }

    async getProductCount() {
        return await this.productCards.count()
    }

    async getProductNames() {
        return await this.productName.allTextContents()
    }


}