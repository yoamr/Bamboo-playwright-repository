const { expect } = require("@playwright/test");   //import test from playwright modules
class RegisterationPage {

    constructor(page) {
        this.page = page
        this.registerationPage = page.locator('[href="/register"]')
        this.registerBtn = page.locator('[value="Register"]')
        this.firstNAme = page.locator("#FirstName")
        this.lastNAme = page.locator("#LastName")
        this.email = page.locator("#Email")
        this.password = page.locator('[name="Password"]')
        this.confirmPassword = page.locator('[name="ConfirmPassword"]')
        this.continueBtn = page.locator('[value="Continue"]')

    }
    async landOnRegistrationPage() {
        await this.registerationPage.click()
    }


    async validRegistration(firstNAme, lastName, password, email) {
        await this.firstNAme.fill(firstNAme)
        await this.lastNAme.fill(lastName)
        await this.email.fill(email)
        await this.password.fill(password)
        await this.confirmPassword.fill(password)
        await this.registerBtn.click()
    }
    async verifyRegistrationSuccess() {
        try {
            const successMessage = this.page.locator(".result");
            await expect(successMessage).toHaveText("Your registration completed");
            console.log("Registration successful");
            return true;
        } catch (error) {
            console.error("Registration failed:", error.message)
            return false;
        }
    }
    async openDashBoardPage() {
        await this.continueBtn.click()
    }
}

module.exports = { RegisterationPage };