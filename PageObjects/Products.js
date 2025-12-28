const { expect } = require("@playwright/test");   //import test from playwright modules

class Products {
    constructor(page) {
        this.page = page
    }

    async selectProduct(productName) {
        await this.page.locator(`.product-title:has-text('${productName}')`)
            .locator('xpath=ancestor::div[contains(@class,"product-item")]//div[contains(@class,"buttons")]//input[@value="Add to cart"]')
            .click();
    }
}
module.exports = { Products } 