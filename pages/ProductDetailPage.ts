import { type Page, type Locator } from '@playwright/test'

/**
 * Page detail produit — automationexercise.com/product_details/1
 * Couvre : consultation du nom, du prix, de la catégorie du produit et de la disponibilité. Ajout d'un avis et validation de son succès.
 * ⚠️ Pas de data-qa disponible — sélecteurs CSS en fallback.  
 */
export class ProductDetailPage {
    readonly page: Page

    readonly productName: Locator
    readonly productPrice: Locator
    readonly productCategory: Locator

    readonly reviewName: Locator
    readonly reviewEmail: Locator
    readonly reviewText: Locator
    readonly reviewSubmitButton: Locator
    readonly reviewSuccessMessage: Locator

    readonly availability: Locator

    constructor(page: Page) {
        this.page = page

        this.productName = page.locator('div.product-information h2')
        this.productPrice = page.locator('div.product-information span span')
        this.productCategory = page.locator('p').filter({ hasText: 'Category:' })

        this.reviewName = page.getByPlaceholder('Your Name')
        this.reviewEmail = page.locator('#review-form').getByPlaceholder('Email Address')
        this.reviewText = page.getByPlaceholder('Add Review Here!')
        this.reviewSubmitButton = page.getByRole('button', { name: 'Submit' })
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

    async submitReview(name: string, email: string, review: string) {
        await this.reviewName.fill(name)
        await this.reviewEmail.fill(email)
        await this.reviewText.fill(review)
        await this.reviewSubmitButton.click()
    }

    async getAvailability() {
        return await this.availability.textContent()
    }

}