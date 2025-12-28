const { expect } = require("@playwright/test");   //import test from playwright modules

class DigitalDownloads {
    constructor(page) {
        this.page = page
        this.thirdAlbum = this.page.locator('[data-productid="53"]')
        this.music=this.page.locator('[data-productid="52"]')
        this.music2=this.page.locator('[data-productid="51"]')
    }
    async userSelectThirdAlbum() {
        await this.thirdAlbum.locator('[value="Add to cart"]').click()
        await this.page.waitForTimeout(1000)
        await this.page.waitForSelector('.content', {
            state: 'visible',
            timeout: 1000
        });
        console.log('ThirdAlbum added successfully');
    }
    async userSelectMusic1() {
        await this.music.locator('[value="Add to cart"]').click()
        await this.page.waitForTimeout(1000)
        await this.page.waitForSelector('.content', {
            state: 'visible',
            timeout: 1000
        });
        console.log('Music 1 added successfully')
    }
    async userSelectMusic2() {
        await this.music2.locator('[value="Add to cart"]').click()
        await this.page.waitForTimeout(1000)
        await this.page.waitForSelector('.content', {
            state: 'visible',
            timeout: 1000
        });
        console.log('Music 2 added successfully')
    }
    
}
module.exports = { DigitalDownloads } 