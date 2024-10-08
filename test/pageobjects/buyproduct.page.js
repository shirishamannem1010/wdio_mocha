const { $ } = require('@wdio/globals');
const Page = require('./page');
const { expect } = require('@wdio/globals');
const path = require('path');
const fs = require('fs');
const dataPath = path.join(__dirname, '../../data/data.json'); 
const data = require('../../data/data.json');
class BuyProduct extends Page {
    get product() {
        return $('#item_0_title_link');
    }
    get addtocartBtn() {
        return $('#add-to-cart');
    }
    get cartListIcon() {
        return $('//a[@class="shopping_cart_link"]');
    }
    get checkoutBtn() {
        return $('#checkout');
    }
    get firstNameInput() {
        return $('#first-name');
    }
    get lastNameInput() {
        return $('#last-name');
    }
    get pincodeInput() {
        return $('#postal-code');
    }
    get continueBtn() {
        return $('#continue');
    }
    get finishBtn() {
        return $('#finish');
    }
    get selectedItem() {
        return $('//div[@class="inventory_item_name"]');
    }
    get thanksMessage(){
        return $('//h2[@class="complete-header"]')
    }
    get backHomeBtn(){
        return $('#back-to-products')
    }
    async buyBikeLight() {
        const productText = await this.product.getText();
        const updatedData = { ...data, productText };
        fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2), 'utf-8');
        console.log('Product text saved to data.json:', productText);

        await this.product.click();
        await this.addtocartBtn.click();
        console.log('------------product added to cart------------');
        await this.cartListIcon.click();
        console.log('--------------cart list items-----------------');
    }
    async checkoutProduct() {
        await this.checkoutBtn.click();
    }
    async checkoutDetails(firstName, lastName, pinCode) {
        await this.firstNameInput.setValue('tommy');
        await this.lastNameInput.setValue('jerry');
        await this.pincodeInput.setValue('500082');
        
        const continueBtnDisplayed = await this.continueBtn.isDisplayed();
        await expect(continueBtnDisplayed).toBe(true);
        await this.continueBtn.click();
      
        const isFinishBtnDisplayed = await this.finishBtn.isDisplayed();
        await expect(isFinishBtnDisplayed).toBe(true);

        const selectedItem = await this.selectedItem.getText();
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        const productText = data.productText;
        console.log(`Selected Item: ${selectedItem}`);

        expect(selectedItem).toBe(productText);
        await this.finishBtn.click();

        const message= await this.thanksMessage.getText();
        const updatedData = { ...data, message };
        fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2), 'utf-8');
        console.log('Thanks Message saved to data.json:', message);
        await this.backHomeBtn.click()
    }
}

module.exports = new BuyProduct();
