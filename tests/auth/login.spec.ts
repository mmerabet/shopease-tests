import { test, expect } from '@playwright/test';

test.describe('SHOP-3 - Connexion avec email et mot de passe', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/login');

        const consentButton = page.getByRole('button', { name: 'Consent' });
        if (await consentButton.isVisible()) {
            await consentButton.click();
        }
    });

    test('AC1 - Connexion réussie avec identifiants valides', async ({ page }) => {
        await page.locator('[data-qa="login-email"]').fill(process.env.TEST_USER_EMAIL!);
        await page.locator('[data-qa="login-password"]').fill(process.env.TEST_USER_PASSWORD!);
        await page.locator('[data-qa="login-button"]').click();

        await expect(page).toHaveURL('https://www.automationexercise.com/');
        await expect(page.getByText('Logout')).toBeVisible();
    });

    test('AC2 - Connexion échouée avec mot de passe incorrect', async ({ page }) => {
        await page.locator('[data-qa="login-email"]').fill(process.env.TEST_USER_EMAIL!);
        await page.locator('[data-qa="login-password"]').fill('wrongpassword');
        await page.locator('[data-qa="login-button"]').click();

        await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
        await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();
    });

    test('AC3 - Connexion échouée avec email non enregistré', async ({ page }) => {
        await page.locator('[data-qa="login-email"]').fill('nonexistent@example.com');
        await page.locator('[data-qa="login-password"]').fill(process.env.TEST_USER_PASSWORD!);
        await page.locator('[data-qa="login-button"]').click();

        await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
        await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();

    });

    test('AC4 - La saisie du mot de passe est masquée', async ({ page }) => {
        const passwordInput = page.locator('[data-qa="login-password"]');
        await expect(passwordInput).toHaveAttribute('type', 'password');

    });

    test.fixme('AC5 - Lien "Mot de passe oublié" visible', async ({ page }) => {
        // Kevin n'a pas eu le temps de livrer cette feature - Sprint 1
        // Ticket Jira : SHOP-3 - commentaire du 23/04/2026
    });



});