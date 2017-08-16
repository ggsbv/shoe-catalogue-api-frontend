import ShoeInventory from './Repositories/ShoeAPI/ShoeInventory';
import TheDOM from './TheDOM';
import HandlebarsTemplate from './HandlebarsTemplate';

var shoeInventory = new ShoeInventory('https://shoe-catalogue-api-codex.herokuapp.com/api/shoes/');
var theDOM = new TheDOM();
let searchTemplate = new HandlebarsTemplate('#searchTemplate');
let resultsTemplate = new HandlebarsTemplate('#searchResultsTemplate');

// populate the dropdown menus with shoe categories when the page loads
window.onload = () => {
    // create options for categories for all shoes in the API
    shoeInventory.all().then((shoeStock) => {
        searchTemplate.render('#searchStockDiv', { shoe : shoeStock });
        theDOM.sortOptions('#sizeSelect');
    });
};

document.querySelector('#searchStockDiv').addEventListener('click', (event) => {
// when user clicks search button
    if (event.target.id === 'searchStockButton') {
        //display the shoes that match their search query
        shoeInventory.filter(theDOM.getUserSearchOptions())
            .then((matchingShoes) => {
                resultsTemplate.render("#searchResultsOutput", { shoes : matchingShoes });
            });
    }
});

// Stock add modal
let addStockModal = document.querySelector(".addStock");

// if user clicks on Admin, open the add stock modal
document.querySelector('#openModal').addEventListener('click', () => addStockModal.style.display = 'flex');

document.querySelector('.close').addEventListener('click', () => addStockModal.style.display = 'none');

window.addEventListener('click', (event) => {
    if (event.target === addStockModal) {
        addStockModal.style.display = 'none';
    }
});

document.querySelector('.addStockButton').addEventListener('click', () => shoeInventory.add(theDOM.getShoeInputFields()));