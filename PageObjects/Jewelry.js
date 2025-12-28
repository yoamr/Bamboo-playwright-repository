const { expect } = require("@playwright/test");   //import test from playwright modules

class Jewelry {
    constructor(page) {
        this.page = page
        this.diamondHeart = this.page.locator('[data-productid="14"]')
    }

    async selectDiamondHeart() {
        await this.diamondHeart.locator('[value="Add to cart"]').click()
        await this.page.waitForTimeout(1000)
        await this.page.waitForSelector('.content', {
            state: 'visible'
        });
        console.log('Diamond heart necklace added successfully')

}
}
module.exports = { Jewelry } 