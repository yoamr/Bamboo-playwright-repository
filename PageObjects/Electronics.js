const { expect } = require("@playwright/test");   //import test from playwright modules

class Electronics {
    constructor(page) {
        this.page = page
        this.cellPhones = this.page.locator('.title [href="/cell-phones"]').first()
        this.smartPhone = this.page.locator('[data-productid="43"]')
        this.phoneCover = this.page.locator('[data-productid="80"]')
    }

    async userLandOnElectronicsCellPhonesPage() {
        await this.cellPhones.click()
    }
    async addPhoneCoverToCart() {
        await this.page.locator('[value="Add to cart"]').first().click()
        await this.page.waitForSelector('.content', {
            state: 'visible',
            timeout: 1000
        });
        console.log('Phone Cover added successfully');
    }
    async selectPhoneCoverManufacturer(manufacturer) {
        //await this.page.selectOption('#product_attribute_80_2_37', { label:`'${manufacturer}'`})
        if (manufacturer == "Apple") {
            await this.page.selectOption('#product_attribute_80_2_37', { value: "113" })
        }
        else {
            await this.page.selectOption('#product_attribute_80_2_37', { value: "112" })

        }
    }
    async selectPhoneCoverColor(color) {
        if (color == "White") {
            await this.page.locator('#product_attribute_80_1_38').selectOption({ value: '115' })
        }
        if (color == "Black") {
            await this.page.locator('#product_attribute_80_1_38').selectOption({ value: '114' })
        }
        if (color == "Blue") {
            await this.page.locator('#product_attribute_80_1_38').selectOption({ value: '116' })
        }
        if(color == "Yellow")
        {
            await this.page.locator('#product_attribute_80_1_38').selectOption({ value: '117' })
        }
    }

}
module.exports = { Electronics } 