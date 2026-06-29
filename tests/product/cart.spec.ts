import { test, expect } from "@fixtures/index";
import { CartPage } from "@pages/CartPage";
import { ProductDetailPage } from "@pages/ProductDetailPage";
import { ProductListPage } from "@pages/ProductListPage";

test.describe('SHOP-104 - Gérer son panier', { tag: '@sprint3' }, () => {
    let cartPage: CartPage

    test.beforeEach(async ({ page }) => {
        cartPage = new CartPage(page)
        await cartPage.navigate()
    })


    test("Add product from catalogue increments cart counter", async ({ page }) => {
        const productListPage = new ProductListPage(page)
        await productListPage.navigate()

        const productName = await productListPage.addFirstProductToCart()
        expect(productName).not.toBeNull()

        await page.getByRole('button', { name: 'Continue Shopping' }).click()

        await cartPage.navigate()

        await expect(cartPage.productName).toHaveText(productName!)
        await expect(cartPage.productQuantity).toContainText('1')
    })

    test("Add product from product page with quantity updates cart quantity", async ({ page }) => {
        const productDetailPage = new ProductDetailPage(page)
        await productDetailPage.navigate()

        const productName = await productDetailPage.getProductName()

        await productDetailPage.setQuantity(3)
        await productDetailPage.addToCart()

        await page.getByRole('button', { name: 'Continue Shopping' }).click()
        await cartPage.navigate()

        await expect(cartPage.productName).toHaveText(productName!)
        await expect(cartPage.productQuantity).toContainText('3')
    })

    test("Remove product from cart removes it from the list", async ({ page }) => {})

})