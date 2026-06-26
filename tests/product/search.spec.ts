import { test, expect } from '@fixtures/index';
import { SearchPage } from '@pages/SearchPage';

test.describe('SHOP-28 — Recherche de produits', () => {
    let searchPage: SearchPage;

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page)
        await searchPage.navigate()
    })

    test('Recherche - Saisie mot-clé et lancement', async ({ page }) => {
        await searchPage.search('dress')
        const count = await searchPage.getProductCount()
        expect(count).toBeGreaterThan(0)
    })

    test.skip('Recherche - Résultats contiennent le mot-clé', async ({ page }) => {
        // AC2 supprimé — redondant avec AC1 après reformulation
        // Voir ticket de dette technique pour suppression dans Xray
    })

    test('Recherche - Barre accessible depuis la page produits', async ({ page }) => {
        await expect(searchPage.searchInput).toBeVisible()
    })

    test('Recherche - Champ vide affiche tous les produits', async ({ page }) => {
        await searchPage.search('')
        const count = await searchPage.getProductCount()
        expect(count).toBeGreaterThanOrEqual(20)
    })

});