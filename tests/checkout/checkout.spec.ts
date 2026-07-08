import { expect, test } from '@fixtures/index';
import { CartPage } from '@pages/CartPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { PaymentDonePage } from '@pages/PaymentDone';
import { PaymentPage } from '@pages/PaymentPage';
import { ProductListPage } from '@pages/ProductListPage';
import { PAYMENT_CONSTANTS as CONSTANTS } from '@constants/payment';

test.describe('SHOP-105 - Checkout process', { tag: '@sprint3' }, () => {
    let productListPage: ProductListPage
    let cartPage: CartPage
    let checkoutPage: CheckoutPage
    let paymentPage: PaymentPage
    let paymentDonePage: PaymentDonePage

    test.use({ storageState: 'tests/setup/auth.json' })

    test.beforeEach(async ({ page }) => {
        productListPage = new ProductListPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        paymentPage = new PaymentPage(page)
        paymentDonePage = new PaymentDonePage(page)
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
        await productListPage.addFirstProductToCart()
        await page.locator('#cartModal a[href="/view_cart"]').click()
        await cartPage.proceedToCheckout()
        await checkoutPage.placeOrder()
        await paymentPage.fillPaymentDetails(CONSTANTS.NAME_ON_CARD, CONSTANTS.CARD_NUMBER, CONSTANTS.CVV, CONSTANTS.EXPIRATION_MONTH, CONSTANTS.EXPIRATION_YEAR)
        await paymentPage.confirmOrder()
        await expect(paymentDonePage.orderPlacedMessage).toBeVisible()
    })

})