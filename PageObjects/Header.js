const { expect } = require("@playwright/test");   //import test from playwright modules

class Header {
    constructor(page) {
        this.page = page
        this.customerInfo=this.page.locator('[href="/customer/info"]')
        this.logOut = this.page.locator('[href="/logout"]]')
        this.cart=this.page.locator('.cart-label').first()
    }

    async openCart() {
        await this.cart.click()
    }
}
module.exports = { Header } 