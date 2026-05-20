import { type Locator, type Page } from '@playwright/test'

/**
 * Page catalogue produits — automationexercise.com/products
 * Couvre : navigation par catégorie, filtre par marque, liste produits.
 * ⚠️ Pas de data-qa disponible — sélecteurs CSS en fallback.
 */
export class ProductListPage {
  readonly page: Page
  readonly productCards: Locator
  readonly categoryParent: Locator
  readonly expandedCategory: Locator
  readonly subcategoryLinks: Locator
  readonly brandLinks: Locator
  readonly pageTitle: Locator

  constructor(page: Page) {
    this.page = page
    this.productCards = page.locator('div.single-products')
    this.categoryParent = page.locator('a[data-toggle="collapse"]')
    this.expandedCategory = page.locator('div.panel-collapse.in')
    this.subcategoryLinks = page.locator('a[href^="/category_products/"]')
    this.brandLinks = page.locator('div.brands-name a')
    this.pageTitle = page.locator('h2.title.text-center')
  }

  async navigate() {
    await this.page.goto('/products')
  }

  async getProductCount() {
    return await this.productCards.count()
  }

  async expandCategory() {
    await this.categoryParent.first().click()
  }

  async clickSubcategory() {
    await this.subcategoryLinks.first().click()
  }
  
  async clickBrand() {
    await this.brandLinks.first().click()
  }

  async getPageTitle() {
    return await this.pageTitle.textContent()
  }

}