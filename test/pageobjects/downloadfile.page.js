const Page = require('./page')
const path = require('path');
const fs = require('fs');
const { $ } = require('@wdio/globals')
class DownloadFile extends Page{

    // herokuapp(){
    //     return super.herokuapp('herokuapp');
    // }
    herokuapp(){
        return super.herokuapp('herokuapp');
    }
    get downloadfileLink(){
        return $('//a[@href="/download"]')
    }
    get webdriverPngLink(){
        return $('//a[@href="download/webdriverIO.png"]')
    }
    async navigateToDownload(){
        await this.downloadfileLink.click();
    }
    async downloadFile(){
        await this.webdriverPngLink.click();

        const downloadDir = 'C:/Users/shirisha.mannem/OneDrive - Feuji Software Solutions Pvt Ltd/Documents/Projects/wdio/filedownloads/';
        const filePath = path.join(downloadDir, 'webdriverIO.png');
    
        await browser.pause(5000); 
    
        const fileExists = fs.existsSync(filePath);
        // expect(fileExists).toBe(true);  
    
        if (fileExists) {
            console.log("File downloaded in saved location successfully:", filePath);
        } else {
            console.log("File is not downloaded in saved location.");
        }
    }
}
module.exports= new DownloadFile();