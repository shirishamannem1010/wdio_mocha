const LoginPage = require('../pageobjects/login.page')
const buyProduct= require('../pageobjects/buyproduct.page')
const sortProduct=require('../pageobjects/sortproduct.page')
require('dotenv').config();
describe('Sauce Demo Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.user_name, process.env.password)
    })
    it('should buy a product', async()=>{
        await buyProduct.buyBikeLight()
        await buyProduct.checkoutProduct();
        await buyProduct.checkoutDetails(process.env.first_name, process.env.last_name, process.env.pin_code);
    })
    it('sort product based on price', async()=>{
        await sortProduct.selectPriceLowToHigh();
        await sortProduct.comparePrices();
    })
    it('should logout the application', async()=>{
        await LoginPage.logout();
    })
})
