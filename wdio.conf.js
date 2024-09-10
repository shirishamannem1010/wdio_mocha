exports.config = {
    
    runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
    ],
    maxInstances: 10,
    
    capabilities: [{
        browserName: 'chrome' ,
        'goog:chromeOptions': {
            prefs: {
                'download.default_directory': 'C:/Users/shirisha.mannem/OneDrive - Feuji Software Solutions Pvt Ltd/Documents/Projects/wdio/filedownloads',
                'download.prompt_for_download': false,
                'download.directory_upgrade': true,
                'plugins.always_open_pdf_externally': true,
            }
        }
    }],
   
    logLevel: 'info',
    bail: 0,
    
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
   
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}