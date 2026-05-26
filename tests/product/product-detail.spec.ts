import { test, expect } from '@playwright/test';
import { ProductDetailPage } from '@pages/ProductDetailPage'

test.describe('Product Detail Page', () => {
    let productDetailPage: ProductDetailPage

    test.beforeEach(async ({ page }) => {
        await page.route(/googlesyndication|doubleclick|googleadservices|googletagmanager/, route => route.abort())
        productDetailPage = new ProductDetailPage(page)
        await productDetailPage.navigate()
        const consentButton = page.getByRole('button', { name: /Consent|Autoriser/i })
        if (await consentButton.isVisible()) {
            await consentButton.click()
        }
    })

    test('La fiche produit affiche le nom, le prix et la catégorie du produit', async ({ page }) => {
        await expect(productDetailPage.productName).toBeVisible()
        await expect(productDetailPage.productPrice).toBeVisible()
        await expect(productDetailPage.productCategory).toBeVisible()
    })

    test('Lorsque lutilisateur laisse un avis sur le produit, un message de confirmation apparaît', async ({ page }) => {
        await productDetailPage.submitReview('Test User', 'test@example.com', 'This is a test review.')
        await expect(productDetailPage.reviewSuccessMessage).toBeVisible()
    })

    test('La fiche produit affiche la disponibilité du produit', async ({ page }) => {
        await expect(productDetailPage.availability).toBeVisible()
        await expect(productDetailPage.availability).toContainText('In Stock')
    })


})