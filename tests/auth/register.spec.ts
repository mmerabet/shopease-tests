import { test, expect } from '@playwright/test';
import { RegisterPage } from '@pages/RegisterPage';

test.describe('SHOP-5 - Inscription d\'un nouveau  client', () => {

    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await registerPage.goto();
        await registerPage.handleCookiesConsent();
    });

    test('AC1 - Formulaire accessible sur le site ', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    });

    test('AC2 - Message d\'erreur champs obligatoire non remplie', async ({ page }) => {
        await registerPage.register('', '');
        await expect(page).toHaveURL('/login');
    });

    test('AC3 - Email mal formaté', async ({ page }) => {
        await registerPage.register('John Doe', 'invalidemail');
        await expect(page.locator('[data-qa="signup-email"]')).toHaveJSProperty('validity.typeMismatch', true);
    });

    test('AC6 - Email déjà existant', async ({ page }) => {
        await registerPage.register('John Doe', process.env.TEST_USER_EMAIL!);
        await expect(registerPage.getEmailExistsMessage()).toBeVisible();
    });

    test.fixme('AC4 - Champs facultatifs', async ({ page }) => {
        // Message de confirmation non disponible sur automationexercise.com - Sprint 1
        // Ticket Jira : SHOP-5 - commentaire du 23/04/2026
    });

    test.fixme('AC5 - Champs facultatifs', async ({ page }) => {
        // Email de confirmation non testable automatiquement sans accès boîte mail - Sprint 1
        // Ticket Jira : SHOP-5 - commentaire du 23/04/2026
    });

    test.fixme('AC7 - Champs facultatifs', async ({ page }) => {
        // Règles de complexité non présentes sur automationexercise.com - Sprint 1
        // Ticket Jira : SHOP-5 - commentaire du 23/04/2026
    });

    test.fixme('AC8 - Champs facultatifs', async ({ page }) => {
        // Champs facultatifs non présents sur automationexercise.com - Sprint 1
        // Ticket Jira : SHOP-5 - commentaire du 23/04/2026
    });

});
