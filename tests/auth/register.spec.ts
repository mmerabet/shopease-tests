import { test, expect } from '@playwright/test';
import { RegisterPage } from '@pages/RegisterPage';

test.describe('SHOP-5 - Inscription d\'un nouveau  client', () => {

    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        await page.route(/googlesyndication|doubleclick|googleadservices|googletagmanager/, route => route.abort())
        registerPage = new RegisterPage(page);
        await registerPage.navigate();
        const consentButton = page.getByRole('button', { name: /Consent|Autoriser/i })
        if (await consentButton.isVisible()) {
            await consentButton.click()
        }
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
        await expect(registerPage.emailExistsMessage).toBeVisible();
    });

    test.fixme('AC4 - Message de confirmation après inscription', async ({ page }) => {
        // Kevin n'a pas eu le temps de livrer cette feature - Sprint 1
        // Ticket Jira : SHOP-5 - commentaire du 23/04/2026
    });

    test.fixme('AC5 - Email de confirmation envoyé', async ({ page }) => {
        // Kevin n'a pas eu le temps de livrer cette feature - Sprint 1
        // Ticket Jira : SHOP-5 - commentaire du 23/04/2026
    });

    test.fixme('AC7 - Règles de complexité du mot de passe', async ({ page }) => {
        // Kevin n'a pas eu le temps de livrer cette feature - Sprint 1
        // Ticket Jira : SHOP-5 - commentaire du 23/04/2026
    });

    test.fixme('AC8 - Champs facultatifs adresse, ville, code postal', async ({ page }) => {
        // Kevin n'a pas eu le temps de livrer cette feature - Sprint 1
        // Ticket Jira : SHOP-5 - commentaire du 23/04/2026
    });

});
