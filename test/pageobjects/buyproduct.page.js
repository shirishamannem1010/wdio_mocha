const { $ } = require('@wdio/globals')
const Page = require('./page');
const {expect}=require('@wdio/globals')
const fs = require('fs');
class BuyProduct extends Page{
    get product(){
        return $('#item_0_title_link')
    }
    get addtocartBtn(){
        return $('#add-to-cart')
    }
    get cartListIcon(){
        return $('//a[@class="shopping_cart_link"]')
    }
    get checkoutBtn(){
        return $('#checkout')
    }
    get firstNameInput(){
        return $('#first-name')
    }
    get lastNameInput(){
        return $('#last-name')
    }
    get pincodeInput(){
        return $('#postal-code')
    }
    get continueBtn(){
        return $('#continue')
    }
    get finishBtn(){
        return $('#finish')
    }
   get  selectedItem(){
        return $('//div[@class="inventory_item_name"]')
    }
    async buyBikeLight(){
        const productText = await this.product.getText();
       await  this.product.click();
       await this.addtocartBtn.click();
        console.log('------------product added to cart------------')
       await this.cartListIcon.click();
        console.log('--------------cart list items-----------------')
    }
    async checkoutProduct(){
     await   this.checkoutBtn.click();
    }
    async checkoutDetails(firstName,lastName,pinCode){
      await  this.firstNameInput.setValue('tommy')
      await  this.lastNameInput.setValue('jerry');
      await  this.pincodeInput.setValue('500082')
        
        const continueBtnDisplayed= await this.continueBtn.isDisplayed();
        await expect(continueBtnDisplayed).toBe(true);
        await this.continueBtn.click();
      
        const isFinishBtnDisplayed = await this.finishBtn.isDisplayed();
        await expect(isFinishBtnDisplayed).toBe(true);

        const selectedItem= await this.selectedItem.getText();
        console.log(selectedItem,"------------------------")
        
       await  this.finishBtn.click();
    }
}
module.exports=new BuyProduct();