import { Page } from '@playwright/test';
import { MESSAGES } from '../constants/messages';

export class LoginPage {

    constructor(private page: Page) { }

    async goto() {
        await this.page.goto('/login');
    }

    async login(email: string, password: string) {
        await this.page.locator('[data-qa="login-email"]').fill(email);
        await this.page.locator('[data-qa="login-password"]').fill(password);
        await this.page.locator('[data-qa="login-button"]').click();
    }

    async handleCookiesConsent() {
        const consentButton = this.page.getByRole('button', { name: 'Consent' });
        if (await consentButton.isVisible()) {
            await consentButton.click();
        }
    }

    getErrorMessage() {
        return this.page.getByText(MESSAGES.LOGIN_ERROR);
    }

    getPasswordInput() {
        return this.page.locator('[data-qa="login-password"]');
    }

}