import { BasePage } from "@pages/BasePage";
import { type Page } from "@playwright/test";

/**
 * Page payment — automationexercise.com/payment
 * Couvre : consultation et gestion du paiement.
 */
export class PaymentPage extends BasePage {

    constructor(page: Page) {
        super(page)
    }

    async navigate() {
        await this.page.goto('/payment')
    }

    async fillPaymentDetails(nameOnCard: string, cardNumber: string, cvv: string, expirationMonth: string, expirationYear: string) {
        const nameOnCardInput = this.page.locator('[data-qa="name-on-card"]')
        const cardNumberInput = this.page.locator('[data-qa="card-number"]')
        const cvvInput = this.page.locator('[data-qa="cvc"]')
        const expirationMonthInput = this.page.locator('[data-qa="expiry-month"]')
        const expirationYearInput = this.page.locator('[data-qa="expiry-year"]')

        await nameOnCardInput.fill(nameOnCard)
        await cardNumberInput.fill(cardNumber)
        await cvvInput.fill(cvv)
        await expirationMonthInput.fill(expirationMonth)
        await expirationYearInput.fill(expirationYear)
    }

    async confirmOrder() {
        const confirmOrderButton = this.page.locator('[data-qa="pay-button"]')
        await confirmOrderButton.click()
    }


}