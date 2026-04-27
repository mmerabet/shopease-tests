import { Page } from '@playwright/test';
import { MESSAGES } from '@constants/messages';

export class RegisterPage {

    constructor(private page: Page) { }

    async goto() {
        await this.page.goto('/login');
    }

    async handleCookiesConsent() {
        const consentButton = this.page.getByRole('button', { name: 'Consent' });
        if (await consentButton.isVisible()) {
            await consentButton.click();
        }
    }

    async register(name: string, email: string) {
        await this.page.locator('[data-qa="signup-name"]').fill(name);
        await this.page.locator('[data-qa="signup-email"]').fill(email);
        await this.page.locator('[data-qa="signup-button"]').click();
    }

    getSuccessMessage() {
        return this.page.getByText(MESSAGES.REGISTER_SUCCESS);
    }

    getEmailExistsMessage() {
        return this.page.getByText(MESSAGES.REGISTER_EMAIL_EXISTS);
    }

}