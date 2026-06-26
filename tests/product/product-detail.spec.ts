import { test, expect } from '@fixtures/index';
import { ProductDetailPage } from '@pages/ProductDetailPage'

test.describe('SHOP-29 — Consulter la fiche produit', () => {
    let productDetailPage: ProductDetailPage

    test.beforeEach(async ({ page }) => {
        productDetailPage = new ProductDetailPage(page)
        await productDetailPage.navigate()
    })

    test('Fiche produit - Nom, prix et catégorie affichés', async () => {
        await expect(productDetailPage.productName).toBeVisible()
        await expect(productDetailPage.productPrice).toBeVisible()
        await expect(productDetailPage.productCategory).toBeVisible()
    })

    test('Fiche produit - Message confirmation après avis', async () => {
        await productDetailPage.submitReview('Test User', 'test@example.com', 'This is a test review.')
        await expect(productDetailPage.reviewSuccessMessage).toBeVisible()
    })

    test('Fiche produit - Disponibilité In Stock affichée', async () => {
        await expect(productDetailPage.availability).toBeVisible()
        await expect(productDetailPage.availability).toContainText('In Stock')
    })

})