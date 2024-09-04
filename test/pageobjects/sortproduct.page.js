const Page = require('./page');
const fs = require('fs');
const path = require('path');
const data = require('../../data/data.json');
const dataPath = path.join(__dirname, '../../data/data.json');
const { $ } = require('@wdio/globals');
require('dotenv').config();
class SortProduct extends Page {

    get sortDropdown() {
        return $('.product_sort_container');
    }

    get productPrice() {
        return $('(//div[@class="inventory_item_price"])[1]');
    }

    async selectPriceLowToHigh() {
        await this.sortDropdown.selectByAttribute('value', 'lohi');
        console.log('Selected "Price (low to high)" from the dropdown');
    }

    async comparePrices() {
        const firstProductPrice = await this.productPrice.getText();
        const productData = { ...data, firstProductPrice };
        fs.writeFileSync(dataPath, JSON.stringify(productData, null, 2));
        expect(firstProductPrice).toBe(process.env.lowest_price);

    }
}

module.exports = new SortProduct();
