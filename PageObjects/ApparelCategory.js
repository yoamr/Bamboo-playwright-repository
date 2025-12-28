const { expect } = require("@playwright/test");   //import test from playwright modules

class ApparelCategory {
    constructor(page) {
        this.page = page
    }
    async selectSneakersSize(size)
    {
        await this.page.selectOption('#product_attribute_28_7_10', { label: `${size}` })
        
    }
    async selectSneakersColor(color)
    {
        await this.page.locator(`[title=${color}]`).click()
    }
    async addApparelToCart()
    {
        await this.page.locator('[value="Add to cart"]').first().click()
        await this.page.waitForSelector('.content', {
            state: 'visible',
            timeout: 1000
        });
        console.log('Apparel added successfully');
    }
}
module.exports = { ApparelCategory } 