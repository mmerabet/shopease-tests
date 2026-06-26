import { type Page, type Locator } from '@playwright/test';
import { MESSAGES } from '@constants/messages';
import { BasePage } from '@pages/BasePage';

/**
 * Page d'inscription — automationexercise.com/login (formulaire signup)
 * Couvre : SHOP-5 (inscription nouveau client)
 * Sélecteurs : data-qa disponibles sur tous les éléments.
 */
export class RegisterPage extends BasePage {

    readonly successMessage: Locator;
    readonly emailExistsMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.successMessage = this.page.getByText(MESSAGES.REGISTER_SUCCESS);
        this.emailExistsMessage = this.page.getByText(MESSAGES.REGISTER_EMAIL_EXISTS);
    }

    async navigate() {
        await this.page.goto('/login');
    }

    async register(name: string, email: string) {
        await this.page.locator('[data-qa="signup-name"]').fill(name);
        await this.page.locator('[data-qa="signup-email"]').fill(email);
        await this.page.locator('[data-qa="signup-button"]').click();
    }

}