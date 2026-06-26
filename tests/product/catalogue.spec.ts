import { test, expect } from '@fixtures/index'
import { ProductListPage } from '@pages/ProductListPage'

test.describe('SHOP-27 — Parcourir le catalogue produits', () => {
    let productListPage: ProductListPage

    test.beforeEach(async ({ page }) => {
        productListPage = new ProductListPage(page)
        await productListPage.navigate()
    })

    test('Affichage par défaut - Au moins 20 produits affichés', async ({ page }) => {
        const productCount = await productListPage.getProductCount()
        expect(productCount).toBeGreaterThanOrEqual(20)
    })

    test('Filtre sous-catégorie - Titre, URL et produits', async ({ page }) => {
        await productListPage.expandCategory()
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