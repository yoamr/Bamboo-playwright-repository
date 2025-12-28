const { expect } = require("@playwright/test");   //import test from playwright modules

class Computers {
    constructor(page) {
        this.page = page
        this.desktops = this.page.locator('[href="/desktops"]').first()
    }
    async userLandsOnDesktopsPage() {
        await this.desktops.click()
    }
    async userSelectSimpleComputerSpecs(Specname,sepcvalue) {
        await this.page.locator(`.text-prompt:has-text('${Specname}')`).
        locator('xpath=ancestor::div[contains(@class,"attributes")]//ul[contains(@class,"option-list")]').
        locator(`label:has-text("${sepcvalue}")`).click()
    }
    async addComputerToCart()
    {
                await this.page.locator('[value="Add to cart"]').first().click()
        await this.page.waitForSelector('.content', {
            state: 'visible',
            timeout: 1000
        });
        console.log('Simple Computer added successfully')
    }

}
module.exports = { Computers } 