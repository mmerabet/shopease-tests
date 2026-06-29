import { type Page, type Locator } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * Page panier — automationexercise.com/view_cart
 * Couvre : consultation et gestion du panier.
 */
export class CartPage extends BasePage {

    readonly productName: Locator
    readonly productQuantity: Locator

    constructor(page: Page) {
        super(page)
        this.productName = this.page.locator('td.cart_description h4')
        this.productQuantity = this.page.locator('td.cart_quantity')
    }

    async removeProduct(productName: string) {
        await this.page
            .locator('tr', { hasText: productName })
            .locator('a.cart_quantity_delete')
            .click()
    }

    async navigate() {
        await this.page.goto('/view_cart')
    }
}
