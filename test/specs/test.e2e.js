const LoginPage = require('../pageobjects/login.page')
const buyProduct= require('../pageobjects/buyproduct.page')
require('dotenv').config();

describe('Sauce Demo Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()
        // await LoginPage.login('standard_user', 'secret_sauce')
        await LoginPage.login(process.env.user_name, process.env.password)
    })
    it('should buy a product', async()=>{
        console.log('==============================================')
        await buyProduct.buyBikeLight()

        await buyProduct.checkoutProduct();
        await buyProduct.checkoutDetails(process.env.first_name, process.env.last_name, process.env.pin_code);
    })
})
