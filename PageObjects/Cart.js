const { expect } = require("@playwright/test");   //import test from playwright modules

class Cart {
  constructor(page) {
    this.page = page
    this.cartPage = this.page.locator('.cart-label').first()
    this.cartRows = this.page.locator('.cart-item-row')
    this.productName = this.page.locator('.product-name')
    this.subTotal = page.locator('.cart-total-right').first()
  }

  async getCartItems() {
    const items = [];
    const count = await this.cartRows.count();
    console.log("Number of Products in the cart: " + count + " items.")

    for (let i = 0; i < count; i++) {
      const row = this.cartRows.nth(i);

      const name = await row.locator('.product-name').innerText()
      const price = parseFloat(
        (await row.locator('.product-unit-price').innerText())
      );
      const qty = parseInt(
        await row.locator('.qty input').inputValue()
      );
      const total = parseFloat(
        (await row.locator('.subtotal').innerText()))
      items.push({ name, price, qty, total });
      console.log(items)
    }

    return items;
  }
  async getSubTotal() {
    return parseFloat((await this.subTotal.innerText()))
  }
}
module.exports = { Cart } 