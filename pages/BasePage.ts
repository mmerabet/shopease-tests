import { type Page } from '@playwright/test'

/**
 * Classe de base pour tous les POMs — automationexercise.com
 * Fournit : accès à la page Playwright, contrat navigate().
 */
export abstract class BasePage {
    protected readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    abstract navigate(): Promise<void>

}
