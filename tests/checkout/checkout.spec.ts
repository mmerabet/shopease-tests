import { expect, test } from '@fixtures/index';
import { CartPage } from '@pages/CartPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { ProductListPage } from '@pages/ProductListPage';

test.describe('SHOP-105 - Checkout process', { tag: '@sprint3' }, () => {
    let productListPage: ProductListPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage

    test.use({ storageState: 'tests/setup/auth.json' })

    test.beforeEach(async ({ page }) => {
        productListPage = new ProductListPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        await productListPage.navigate()
        
    })

    test("Checkout page displays prefilled addresses and order summary", async ({ page }) => {
        await productListPage.addFirstProductToCart()
        await page.locator('#cartModal a[href="/view_cart"]').click()
        await cartPage.proceedToCheckout()
        await expect(checkoutPage.billingAddress).toBeVisible()
        await expect(checkoutPage.shippingAddress).toBeVisible()
        await expect(checkoutPage.orderSummary).toBeVisible()
    })

    test("Confirming order with valid payment redirects to confirmation page", async ({ page }) => {
        
    })

})