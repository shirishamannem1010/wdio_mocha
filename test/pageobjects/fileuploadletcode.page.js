
const Page = require('./page');
const path = require('path');
// class FileUpload extends Page{
//     letcode() {
//         return super.letcode('letcode');
//     }
//     get fileBtn(){
//         return $('//a[text()="File management"]')
//     }
    
//     async openFileManagement(){
//         await this.fileBtn.scrollIntoView();
//         await this.fileBtn.click()
        
//     }
// }
// module.exports= new FileUpload();

class FileUpload extends Page{
    herokuapp(){
        return super.herokuapp('herokuapp');
    }

    get fileuploadLink(){
        return $('//a[text()="File Upload"]')
    }
    get fileInput(){
        return $('//input[@type="file"]')
    }
    get uploadBtn(){
        return $('#file-submit')
    }
    get successMessage(){
        return $('//div[@class="example"]//h3')
    }

    async navigateToFile(){
        await this.fileuploadLink.click()
    }

    async fileUploading(){
        const filePath = path.join(__dirname, '../../data/sample.txt');
        await this.fileInput.setValue(filePath);

        await this.uploadBtn.click();

        const successMessage = await this.successMessage.getText();
        await expect(successMessage).toBe('File Uploaded!');  
        console.log(successMessage);
    }

}
module.exports= new FileUpload();