import { test, expect } from '@playwright/test';
import { SearchPage } from '@pages/SearchPage';

test.describe('SHOP-28 — Recherche de produits', () => {
    let searchPage: SearchPage;

    test.beforeEach(async ({ page }) => {
        await page.route(/googlesyndication|doubleclick|googleadservices|googletagmanager/, route => route.abort())
        searchPage = new SearchPage(page)
        await searchPage.navigate()
        const consentButton = page.getByRole('button', { name: /Consent|Autoriser/i })
        if (await consentButton.isVisible()) {
            await consentButton.click()
        }
    })

    test('saisir un mot-clé et lancer la recherche', async ({ page }) => {
        await searchPage.search('dress')
        const count = await searchPage.getProductCount()
        expect(count).toBeGreaterThan(0)
    })

    test.skip('vérifier que les résultats contiennent le mot-clé', async ({ page }) => {
        // AC2 supprimé — redondant avec AC1 après reformulation
        // Voir ticket de dette technique pour suppression dans Xray
    })

    test('vérifier que la barre de recherche est visible', async ({ page }) => {
        await expect(searchPage.searchInput).toBeVisible()
    })

    test('lancer une recherche avec champ vide', async ({ page }) => {
        await searchPage.search('')
        const count = await searchPage.getProductCount()
        expect(count).toBeGreaterThanOrEqual(20)
    })


});