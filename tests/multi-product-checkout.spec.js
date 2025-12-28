const { test, expect } = require("@playwright/test");
const { POManager } = require('../PageObjects/POManager');
const { calculateExpectedSubTotal } = require('../utils/priceUtils');
const orderData = require('../utils/TestData/OrderData.json');
const fs = require('fs');
const path = require('path');

// Import reporting libraries (choose one)
// Option 1: Playwright HTML Reporter (built-in)
const { chromium } = require('playwright');

// Option 2: Allure Reporter
// require('@playwright/test').addAllureReporter();

// Option 3: Custom Reporter
class TestReporter {
  constructor() {
    this.testResults = [];
    this.startTime = new Date();
  }

  logStep(step, status = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, step, status };
    console.log(`[${status.toUpperCase()}] ${step}`);
    this.testResults.push(logEntry);

    // Also write to file
    fs.appendFileSync(
      path.join(__dirname, '../test-results/test-execution.log'),
      `${timestamp} - ${status} - ${step}\n`
    );
  }

  generateReport() {
    const report = {
      executionDate: this.startTime.toISOString(),
      totalDuration: Date.now() - this.startTime.getTime(),
      steps: this.testResults,
      summary: {
        totalSteps: this.testResults.length,
        passed: this.testResults.filter(r => r.status === 'pass').length,
        failed: this.testResults.filter(r => r.status === 'fail').length,
        warnings: this.testResults.filter(r => r.status === 'warn').length
      }
    };

    const reportPath = path.join(__dirname, '../test-results/test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`Report generated: ${reportPath}`);
  }
}

// Global reporter instance
const reporter = new TestReporter();

test.describe('E-commerce Order Placement Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    reporter.logStep('Test execution started', 'info');
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Take screenshot on failure
    if (testInfo.status === 'failed') {
      const screenshotPath = path.join(
        __dirname,
        `../test-results/screenshots/failure-${Date.now()}.png`
      );
      await page.screenshot({ path: screenshotPath, fullPage: true });
      reporter.logStep(`Screenshot saved: ${screenshotPath}`, 'warn');
    }

    reporter.logStep(`Test ${testInfo.title} - Status: ${testInfo.status}`,
      testInfo.status === 'passed' ? 'pass' : 'fail');
  });

  test.afterAll(() => {
    reporter.generateReport();
  });

  test('TC001: Place order with multiple products including price validation', async ({ page }) => {
    const testName = 'Place order with multiple products';
    reporter.logStep(`Starting test: ${testName}`);

    // Initialize POM
    const poManager = new POManager(page);
    const registrationPage = poManager.getRegistrationPage();
    const dashboard = poManager.getDashBoardPage();
    const computer = poManager.getComputersPage();
    const apparelPage = poManager.getApparelPage();
    const digitalDownload = poManager.getDigitalDownloadsPage();
    const electronic = poManager.getElectronicsPage();
    const jewelry = poManager.getJewelryPage();
    const product = poManager.getProduct();
    const header = poManager.getHeader();
    const cart = poManager.getCartpage();

    // Generate unique email
    const email = generateRandomEmail();
    reporter.logStep(`Generated test email: ${email}`);

    try {
      // --- STEP 1: Navigate & Register ---
      reporter.logStep('Step 1: Navigating to website');
      await page.goto("https://demowebshop.tricentis.com/");
      await expect(page).toHaveTitle(/Demo Web Shop/);

      reporter.logStep('Step 2: User registration');
      await registrationPage.landOnRegistrationPage();
      await registrationPage.validRegistration(
        orderData.user.firstName,
        orderData.user.lastName,
        orderData.user.password,
        email
      );

      const registrationSuccess = await registrationPage.verifyRegistrationSuccess();
      expect(registrationSuccess).toBeTruthy();
      reporter.logStep('User registration successful', 'pass');

      await registrationPage.openDashBoardPage();
      await dashboard.checkUserLoggedAfterReg();
      reporter.logStep('User logged in and on dashboard', 'pass');

      // --- STEP 2: Product Selection & Configuration ---
      reporter.logStep(`Step 3: Processing ${orderData.products.length} products from JSON`);

      const addedProducts = [];
      for (const [index, productData] of orderData.products.entries()) {
        reporter.logStep(`Processing product ${index + 1}: ${productData.name} (${productData.category})`);

        await dashboard.openCategory(productData.category);

        switch (productData.category.toLowerCase()) {
          case 'computers':
            await computer.userLandsOnDesktopsPage();
            await product.selectProduct(productData.name);
            reporter.logStep(`Selected computer: ${productData.name}`);

            // Configure specs
            for (const [specType, specValue] of Object.entries(productData.specs)) {
              await computer.userSelectSimpleComputerSpecs(specType, specValue);
              reporter.logStep(`Configured ${specType}: ${specValue}`);
            }

            await computer.addComputerToCart();
            addedProducts.push({ ...productData, category: 'computers' });
            reporter.logStep('Computer added to cart', 'pass');
            break;

          case 'apparel':
            await product.selectProduct(productData.name);
            reporter.logStep(`Selected apparel: ${productData.name}`);

            await apparelPage.selectSneakersSize(productData.options.size);
            await apparelPage.selectSneakersColor(productData.options.color);
            reporter.logStep(`Configured size: ${productData.options.size}, color: ${productData.options.color}`);

            await apparelPage.addApparelToCart();
            addedProducts.push({ ...productData, category: 'apparel' });
            reporter.logStep('Apparel added to cart', 'pass');
            break;

          case 'digital':
            if (productData.name == "Music 1") {
              await digitalDownload.userSelectMusic1();
              reporter.logStep('Music 1 selected');
            } else if (productData.name === "Music 2") {
              await digitalDownload.userSelectMusic2();
              reporter.logStep('Music 2 selected');
            }
            else{
              await product.selectProduct(productData.name);
            reporter.logStep(`Selected digital product: ${productData.name}`);
            }
            addedProducts.push({ ...productData, category: 'digital' });
            reporter.logStep('Digital downloads added', 'pass');
            break;

          case 'electronics':
            if (productData.subcategory === 'Cell phones') {
              await electronic.userLandOnElectronicsCellPhonesPage();
              await product.selectProduct(productData.name);
              reporter.logStep(`Selected cell phone: ${productData.name}`);
            }

            if (productData.subcategory === 'Phone Cover') {
              await electronic.userLandOnElectronicsCellPhonesPage();
              await product.selectProduct(productData.name);
              reporter.logStep(`Selected phone cover: ${productData.name}`);

              await electronic.selectPhoneCoverManufacturer(productData.options.manufacturer);
              await electronic.selectPhoneCoverColor(productData.options.color);
              reporter.logStep(`Configured manufacturer: ${productData.options.manufacturer}, color: ${productData.options.color}`);

              await electronic.addPhoneCoverToCart();
              addedProducts.push({ ...productData, category: 'electronics' });
              reporter.logStep('Phone cover added to cart', 'pass');
            }
            break;

          case 'jewelry':
            await jewelry.selectDiamondHeart();
            addedProducts.push({ ...productData, category: 'jewelry' });
            reporter.logStep('Jewelry added to cart', 'pass');
            break;

          default:
            reporter.logStep(`Unknown category: ${productData.category}`, 'warn');
        }

        // Small delay between adding products
        await page.waitForTimeout(1000);
      }

      // --- STEP 3: Cart Validation ---
      reporter.logStep('Step 4: Validating cart contents');
      await header.openCart();

      const cartItemsUI = await cart.getCartItems();
      reporter.logStep(`Found ${cartItemsUI.length} items in cart`);

      // Assert individual item totals
      for (const [index, item] of cartItemsUI.entries()) {
        const expectedTotal = item.price * item.qty;
        expect(item.total).toBe(expectedTotal);
        reporter.logStep(`Item ${index + 1}: ${item.name} - Price: $${item.price}, Qty: ${item.qty}, Total: $${item.total} (PASS)`);
      }

      // Assert subtotal
      const uiSubTotal = await cart.getSubTotal();
      const calculatedSubTotal = calculateExpectedSubTotal(cartItemsUI);

      reporter.logStep(`UI Subtotal: $${uiSubTotal}`);
      reporter.logStep(`Calculated Subtotal: $${calculatedSubTotal}`);

      expect(uiSubTotal).toBe(calculatedSubTotal);
      reporter.logStep('Subtotal validation PASSED', 'pass');

      // --- STEP 4: Generate Test Evidence ---
      reporter.logStep('Step 5: Generating test evidence');

      // Take final screenshot
      const evidencePath = path.join(__dirname, `../test-results/screenshots/final-cart-${Date.now()}.png`);
      await page.screenshot({ path: evidencePath, fullPage: true });
      reporter.logStep(`Evidence screenshot saved: ${evidencePath}`);

      // Save cart details
      const cartSummary = {
        timestamp: new Date().toISOString(),
        email: email,
        addedProducts: addedProducts,
        cartItems: cartItemsUI,
        subtotal: uiSubTotal,
        calculatedSubtotal: calculatedSubTotal
      };

      const cartSummaryPath = path.join(__dirname, '../test-results/cart-summary.json');
      fs.writeFileSync(cartSummaryPath, JSON.stringify(cartSummary, null, 2));
      reporter.logStep(`Cart summary saved: ${cartSummaryPath}`);

      reporter.logStep('TEST COMPLETED SUCCESSFULLY', 'pass');

    } catch (error) {
      reporter.logStep(`Test failed: ${error.message}`, 'fail');
      throw error;
    }
  });
});

function generateRandomEmail() {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `testuser_${timestamp}_${randomString}@testmail.com`;
}