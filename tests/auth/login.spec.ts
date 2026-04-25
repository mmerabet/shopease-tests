import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';


test.describe('SHOP-3 - Connexion avec email et mot de passe', () => {

    let loginPage: LoginPage;
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.handleCookiesConsent();
    });

    test('AC1 - Connexion réussie avec identifiants valides', async ({ page }) => {
        await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);

        await expect(page).toHaveURL('https://www.automationexercise.com/');
        await expect(page.getByText('Logout')).toBeVisible();
    });

    test('AC2 - Connexion échouée avec mot de passe incorrect', async ({ page }) => {
        await loginPage.login(process.env.TEST_USER_EMAIL!, 'wrongpassword');

        await expect(loginPage.getErrorMessage()).toBeVisible();
        await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();
    });

    test('AC3 - Connexion échouée avec email non enregistré', async ({ page }) => {
        await loginPage.login('nonexistent@exemple.com', process.env.TEST_USER_PASSWORD!);

        await expect(loginPage.getErrorMessage()).toBeVisible();
        await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();

    });

    test('AC4 - La saisie du mot de passe est masquée', async ({ page }) => {
        const passwordInput = loginPage.getPasswordInput();
        await expect(passwordInput).toHaveAttribute('type', 'password');

    });

    test.fixme('AC5 - Lien "Mot de passe oublié" visible', async ({ page }) => {
        // Kevin n'a pas eu le temps de livrer cette feature - Sprint 1
        // Ticket Jira : SHOP-3 - commentaire du 23/04/2026
    });



});