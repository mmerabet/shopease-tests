import { BasePage } from "@pages/BasePage";
import { type Locator, type Page } from "@playwright/test";


export class PaymentDonePage extends BasePage {

    readonly orderPlacedMessage: Locator
    
    
    constructor(page: Page) {
        super(page)
        this.orderPlacedMessage = this.page.locator('[data-qa="order-placed"]')
    }
    
    async navigate() {
        // URL is dynamically generated based on the order ID
    }

}