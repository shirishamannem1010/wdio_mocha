const { $ } = require('@wdio/globals')
const Page = require('./page');
class LoginPage extends Page {
    get inputUsername () {
        return $('#user-name');
    }
    get inputPassword () {
        return $('#password');
    }
    get btnSubmit () {
        return $('#login-button');
    }
    get menuIcon(){
        return $('#react-burger-menu-btn')
    }
    get logoutBtn(){
        return $('#logout_sidebar_link')
    }
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
    open () {
        return super.open('login');
    }
    async logout(){
        await this.menuIcon.click();
        await this.logoutBtn.click();
        const url= await browser.getUrl();
        console.log(`loginpage url`, url)
    }
}
module.exports = new LoginPage();