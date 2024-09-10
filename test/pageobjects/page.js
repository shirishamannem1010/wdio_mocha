const { browser } = require('@wdio/globals')

module.exports = class Page {
    open () {
        return browser.url(`https://www.saucedemo.com/`)
    }
    letcode(){
        return browser.url(`https://letcode.in/test`)
    }
    herokuapp(){
        return browser.url(`https://the-internet.herokuapp.com/`)
    }
}
