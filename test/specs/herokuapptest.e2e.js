const FileUploadPage =require('../pageobjects/fileuploadletcode.page')
const DownloadFilePage= require('../pageobjects/downloadfile.page')
require('dotenv').config();
const path = require('path');

describe('File upload functionality in herokuapp', ()=>{
    it('Should navigate and upload file',async()=>{

        await FileUploadPage.herokuapp();
        await FileUploadPage.navigateToFile();
        await browser.pause(process.env.small_wait);
        await FileUploadPage.fileUploading();
        

    })

    it('should navigate and download file', async()=>{
        console.log("+++++++++++++++++++++++++++++++++++++++")
        await DownloadFilePage.herokuapp();
        await DownloadFilePage.navigateToDownload();
        await DownloadFilePage.downloadFile();

    })
})