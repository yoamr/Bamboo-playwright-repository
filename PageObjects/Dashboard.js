const { expect } = require("@playwright/test");   //import test from playwright modules

class Dashboard {
    constructor(page) {
        this.page = page
        this.loggedEmail = this.page.locator('.header-links a.account').first()
        this.apparelCategory = this.page.locator('[href="/apparel-shoes"]').first()
        this.productItems = this.page.locator(".item-box")
        this.addToCartButtons = this.page.locator('[value="Add to cart"]')
        this.computer = this.page.locator('[href="/computers"]').first()
        this.digitalDownloads = this.page.locator('[href="/digital-downloads"]').first()
        this.electronics = this.page.locator('[href="/electronics"]').first()
        this.jewelry = this.page.locator('[href="/jewelry"]').first()

    }
    async openCategory(name) {
        const normalizedName = name.toLowerCase()
        await this.page.locator(`.header-menu a[href*="/${normalizedName}"]`).first().click()
    }
    async checkUserLoggedAfterReg() {
        await expect(this.loggedEmail).toBeVisible();
    }
    async openApparelsPage() {
        await this.apparelCategory.click()
    }
    async openComputerPage() {
        await this.computer.click()
    }
    async openDigitalDownloadsPage() {
        await this.digitalDownloads.click()
    }
    async openElectronicsPage() {
        await this.electronics.click()
    }
    async openJewelryPage() {
        await this.jewelry.click()
    }


}
module.exports = { Dashboard } 