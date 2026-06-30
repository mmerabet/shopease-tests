import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "@pages/BasePage";

/**
 * Page checkout — automationexercise.com/checkout
 * Couvre : consultation et gestion du checkout.
 */
export class CheckoutPage extends BasePage {

    readonly billingAddress: Locator
    readonly shippingAddress: Locator
    readonly orderSummary: Locator

    constructor(page: Page) {
        super(page)
        this.billingAddress = this.page.locator('#address_invoice')
        this.shippingAddress = this.page.locator('#address_delivery')
        this.orderSummary = this.page.locator('#cart_info')
    }


    async navigate(): Promise<void> {
        await this.page.goto('/checkout')
    }

}