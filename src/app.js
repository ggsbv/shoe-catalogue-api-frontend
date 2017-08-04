import ShoeInventory from './Repositories/ShoeAPI/ShoeInventory';
import TheDOM from './TheDOM';
import HandlebarsTemplate from './HandlebarsTemplate';

let shoeInventory = new ShoeInventory('waiter-availability-webapp.herokuapp.com/api/shoes/');
let theDOM = new TheDOM();
let searchTemplate = new HandlebarsTemplate('#searchTemplate');
let resultsTemplate = new HandlebarsTemplate('#searchResultsTemplate');

// populate the dropdown menus with shoe categories when the page loads
window.onload = () => {
    // create options for categories for all shoes in the API
    shoeInventory.all().then((shoeStock) => {
        searchTemplate.render('#searchStockDiv', shoeStock);
    });
};

// when user clicks search button
theDOM.searchButton.addEventListener('click', () => {
    //display the shoes that match their search query
    resultsTemplate.render(
        '#searchResultsOutput',
        shoeInventory.filter(theDom.getUserSearchOptions)
    );
});