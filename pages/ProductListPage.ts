import { type Locator, type Page } from '@playwright/test'
import { BasePage } from '@pages/BasePage'

/**
 * Page catalogue produits — automationexercise.com/products
 * Couvre : SHOP-27 (parcourir le catalogue, catégories, marques)
 * ⚠️ Pas de data-qa disponible — sélecteurs CSS en fallback.
 */
export class ProductListPage extends BasePage {
    readonly expandedCategory: Locator
    readonly subcategoryLinks: Locator

    constructor(page: Page) {
        super(page)
        this.expandedCategory = page.locator('div.panel-collapse.in')
        this.subcategoryLinks = page.locator('a[href^="/category_products/"]')
    }

    async navigate() {
        await this.page.goto('/products')
    }

    async getProductCount() {
        return await this.page.locator('div.single-products').count()
    }

    async expandCategory() {
        await this.page.locator('a[data-toggle="collapse"]').first().click()
    }

    async clickSubcategory() {
        await this.subcategoryLinks.first().click()
    }

    async clickBrand() {
        await this.page.locator('div.brands-name a').first().click()
    }

    async getPageTitle() {
        return await this.page.locator('h2.title.text-center').textContent()
    }

    async addFirstProductToCart(): Promise<string> {
        const firstCard = this.page.locator('div.single-products').first()
        const productName = await firstCard.locator('div.productinfo p').textContent()
        await firstCard.locator('div.productinfo a.add-to-cart').click()
        return productName!
    }

}
