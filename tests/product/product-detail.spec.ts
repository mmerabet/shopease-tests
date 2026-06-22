import { test, expect } from '@playwright/test';
import { ProductDetailPage } from '@pages/ProductDetailPage'

test.describe('SHOP-29 — Consulter la fiche produit', () => {
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

    test('Fiche produit - Nom, prix et catégorie affichés', async ({ page }) => {
        await expect(productDetailPage.productName).toBeVisible()
        await expect(productDetailPage.productPrice).toBeVisible()
        await expect(productDetailPage.productCategory).toBeVisible()
    })

    test('Fiche produit - Message confirmation après avis', async ({ page }) => {
        await productDetailPage.submitReview('Test User', 'test@example.com', 'This is a test review.')
        await expect(productDetailPage.reviewSuccessMessage).toBeVisible()
    })

    test('Fiche produit - Disponibilité In Stock affichée', async ({ page }) => {
        await expect(productDetailPage.availability).toBeVisible()
        await expect(productDetailPage.availability).toContainText('In Stock')
    })

})