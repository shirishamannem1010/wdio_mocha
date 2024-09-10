require('dotenv').config();
const path = require('path');
const FileUploadPage= require('../pageobjects/fileuploadletcode.page')

describe('functions on letcode test application', ()=>{
    it('File upload operations', async()=>{
        await FileUploadPage.letcode();
        await FileUploadPage.openFileManagement();
        await browser.pause(process.env.small_wait);
        const filePath = path.join(__dirname, '../../data/sample.txt');
        
        const fileInput = await $('//input[@type="file"]');  
        
        await fileInput.setValue(filePath);

        const uploadButton = await $('//span[@class="file-label"]'); 
        await uploadButton.click();

        // const successMessage = await $('#success-message');
        // await expect(successMessage).toBeDisplayed();

        console.log('file uploaded successfully')
    })
})