const { RegisterationPage } = require('../PageObjects/RegistrationPage');
const { Dashboard } = require('./Dashboard');
const { ApparelCategory } = require('../PageObjects/ApparelCategory');
const { DigitalDownloads } = require('../PageObjects/DigitalDownloads');
const { Electronics } = require('../PageObjects/Electronics');
const { Jewelry } = require('../PageObjects/Jewelry');
const { Computers } = require('../PageObjects/Computers');
const { Products } = require('../PageObjects/Products');
const { Header } = require('../PageObjects/Header');
const { Cart } = require('../PageObjects/Cart');

class POManager
{
    constructor(page)
    {   
        this.page=page
        this.RegisterationPage = new RegisterationPage(page)
        this.Dashboard = new Dashboard(page)
        this.ApparelCategory = new ApparelCategory(page)
        this.DigitalDownloads = new DigitalDownloads(page)
        this.Electronics=new Electronics(page)
        this.Jewelry = new Jewelry(page)
        this.Computers= new Computers(page)
        this.Products = new Products(page)
        this.Header= new Header(page)
        this.Cart=new Cart(page)

    }
    getRegistrationPage()
    {
        return this.RegisterationPage
    }
    getDashBoardPage()
    {
        return this.Dashboard
    }
    getApparelPage()
    {
        return this.ApparelCategory
    }
    getDigitalDownloadsPage()
    {
        return this.DigitalDownloads
    }
    getElectronicsPage()
    {
        return this.Electronics
    }
    getJewelryPage()
    {
        return this.Jewelry
    }
    getComputersPage()
    {
        return this.Computers
    }
    getProduct()
    {
        return this.Products
    }
    getHeader()
    {
        return this.Header
    }
    getCartpage()
    {
        return this.Cart
    }
}

module.exports={POManager}  