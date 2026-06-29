import { type Page, type Locator } from '@playwright/test'
import { BasePage } from '@pages/BasePage'

/**
 * Page détail produit — automationexercise.com/product_details/:id
 * Couvre : SHOP-29 (nom, prix, catégorie, disponibilité, soumission d'avis)
 * ⚠️ Pas de data-qa disponible — sélecteurs CSS en fallback.
 */
export class ProductDetailPage extends BasePage {

    readonly productName: Locator
    readonly productPrice: Locator
    readonly productCategory: Locator
    readonly reviewSuccessMessage: Locator
    readonly availability: Locator

    constructor(page: Page) {
        super(page)

        this.productName = page.locator('div.product-information h2')
        this.productPrice = page.locator('div.product-information span span')
        this.productCategory = page.locator('p').filter({ hasText: 'Category:' })
        this.reviewSuccessMessage = page.getByText('Thank you for your review.')
        this.availability = page.locator('p').filter({ hasText: 'Availability:' })
    }

    async navigate() {
        await this.page.goto('/product_details/1')
    }

    async getProductName() {
        return await this.productName.textContent()
    }

    async getProductPrice() {
        return await this.productPrice.textContent()
    }

    async getProductCategory() {
        return await this.productCategory.textContent()
    }

    async getAvailability() {
        return await this.availability.textContent()
    }

    async submitReview(name: string, email: string, review: string) {
        await this.page.getByPlaceholder('Your Name').fill(name)
        await this.page.locator('#review-form').getByPlaceholder('Email Address').fill(email)
        await this.page.getByPlaceholder('Add Review Here!').fill(review)
        await this.page.getByRole('button', { name: 'Submit' }).click()
    }

    async setQuantity(quantity: number) {
        await this.page.locator('input#quantity').fill(quantity.toString())
    }

    async addToCart() {
        await this.page.getByRole('button', { name: 'Add to cart' }).click()
    }

}
