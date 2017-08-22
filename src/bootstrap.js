import ShoeInventory from './Repositories/ShoeAPI/ShoeInventory';
import TheDOM from './TheDOM';
import HandlebarsTemplate from './HandlebarsTemplate';
import Cart from './Cart';

module.exports = function () {
    const shoeInventory = function() { return new ShoeInventory('https://shoe-catalogue-api-codex.herokuapp.com/api/shoes/') };
    const theDOM = function () { return new TheDOM() };
    let searchTemplate = new HandlebarsTemplate('#searchTemplate');
    let resultsTemplate = new HandlebarsTemplate('#searchResultsTemplate');
    let cartTemplate = new HandlebarsTemplate('#cartTemplate');
    let cart = new Cart();

    return {

    }
};
