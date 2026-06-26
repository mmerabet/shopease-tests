import { type Page, type Locator } from '@playwright/test';
import { MESSAGES } from '@constants/messages';
import { BasePage } from '@pages/BasePage';

/**
 * Page de connexion — automationexercise.com/login
 * Couvre : SHOP-3 (connexion email/mot de passe)
 * Sélecteurs : data-qa disponibles sur tous les éléments.
 */
export class LoginPage extends BasePage {

    readonly errorMessage: Locator;
    readonly passwordInput: Locator;

    constructor(page: Page) {
        super(page);
        this.errorMessage = this.page.getByText(MESSAGES.LOGIN_ERROR);
        this.passwordInput = this.page.locator('[data-qa="login-password"]');
    }

    async navigate() {
        await this.page.goto('/login');
    }

    async login(email: string, password: string) {
        await this.page.locator('[data-qa="login-email"]').fill(email);
        await this.page.locator('[data-qa="login-password"]').fill(password);
        await this.page.locator('[data-qa="login-button"]').click();
    }

}