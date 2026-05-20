import { test, expect } from '@playwright/test'
import { ProductListPage } from '@pages/ProductListPage'

test.describe('SHOP-27 — Parcourir le catalogue produits', () => {
    let productListPage: ProductListPage

    test.beforeEach(async ({ page }) => {
        productListPage = new ProductListPage(page)
        await productListPage.navigate()
        const consentButton = page.getByRole('button', { name: /Consent|Autoriser/i })
        if (await consentButton.isVisible()) {
            await consentButton.click()
        }
    })

    test('Au moins 20 produits affichés par défaut', async ({ page }) => {
        const productCount = await productListPage.getProductCount()
        expect(productCount).toBeGreaterThanOrEqual(20)
    })

    test('Filtre sous-catégorie - Titre, URL et produits affichés', async ({ page }) => {
        await productListPage.expandCategory()
        await productListPage.subcategoryLinks.first().waitFor({ state: 'visible' })
        const categoryName = await productListPage.subcategoryLinks.first().textContent()
        await productListPage.clickSubcategory()
        const title = await productListPage.getPageTitle()
        expect(title).toContain(categoryName?.trim() || '')
        await expect(page).toHaveURL(/category_products/)
        const productCount = await productListPage.getProductCount()
        expect(productCount).toBeGreaterThan(0)
    })

    test('Catégorie parente - Déploiement des sous-catégories', async ({ page }) => {
        await productListPage.expandCategory()
        await expect(productListPage.expandedCategory).toBeVisible()
    })

    test('Sous-catégorie - Produits correspondants affichés', async ({ page }) => {
        await productListPage.expandCategory()
        await productListPage.subcategoryLinks.first().waitFor({ state: 'visible' })
        const subcategoryName = await productListPage.subcategoryLinks.first().textContent()
        await productListPage.clickSubcategory()
        const title = await productListPage.getPageTitle()
        expect(title).toContain(subcategoryName?.trim() || '')
        const productCount = await productListPage.getProductCount()
        expect(productCount).toBeGreaterThan(0)
    })

    test('Filtre par marque - Produits affichés', async ({ page }) => {
        await productListPage.clickBrand()
        const productCount = await productListPage.getProductCount()
        expect(productCount).toBeGreaterThan(0)
    })

})