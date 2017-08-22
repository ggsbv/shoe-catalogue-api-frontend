import ShoeInventory from './Repositories/ShoeAPI/ShoeInventory';
import TheDOM from './TheDOM';
import HandlebarsTemplate from './HandlebarsTemplate';
import Cart from './Cart';

var shoeInventory = new ShoeInventory('http://localhost:3006/api/shoes/');//'https://shoe-catalogue-api-codex.herokuapp.com/api/shoes/');
var theDOM = new TheDOM();
let searchTemplate = new HandlebarsTemplate('#searchTemplate');
let resultsTemplate = new HandlebarsTemplate('#searchResultsTemplate');
let cartTemplate = new HandlebarsTemplate('#cartTemplate');
let notificationTemplate = new HandlebarsTemplate('#notification-template');
let cart = new Cart();

// populate the dropdown menus with shoe categories when the page loads
window.onload = () => {
    // create options for categories for all shoes in the API
    shoeInventory.all().then((shoeStock) => {
        searchTemplate.renderDropdowns('#searchStockDiv', shoeStock);
        theDOM.sortOptions('#sizeSelect');
    });
};

document.querySelector('#searchStockDiv').addEventListener('click', (event) => {
// when user clicks search button
    if (event.target.id === 'searchButton') {
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

// if user clicks on close button, close the modal
document.querySelector('.close').addEventListener('click', () => addStockModal.style.display = 'none');

// if user clicks anywhere other than the modal, close the modal
window.addEventListener('click', (event) => {
    if (event.target === addStockModal) {
        addStockModal.style.display = 'none';
    }
});

// when user submits a shoe, add the shoe to the shoe inventory
document.querySelector('.addStockButton').addEventListener('click', (event) => {
    event.preventDefault();

    shoeInventory
        .add(theDOM.getShoeInputFields())
        .then((updatedShoeStock) => {
            theDOM.clearShoeInputFields();

            searchTemplate.renderDropdowns('#searchStockDiv', updatedShoeStock);
            theDOM.sortOptions('#sizeSelect');
            alert('Shoe has been added to stock.');
        });
});

document.querySelector('#searchResultsOutput').addEventListener('click', (event) => {
   if (event.target.id === 'buyButton') {
       shoeInventory.find(event.target.value).then((shoe) => {
           cart.add(shoe);
           alert("Successfully added to cart!");
           // notificationTemplate.render(".notification", { message : "Successfully added to card!" });
       });
   }
});

let cartModal = document.querySelector('.cart-modal');

// if user clicks on Admin, open the add stock modal
document.querySelector('#openCartModal').addEventListener('click', () => {
    cartModal.style.display = 'flex';
    cartTemplate.render('.cart-modal', { shoe: cart.get(), total: cart.calculateTotal() });
});

// if user clicks on close button, close the modal
document.querySelector('.cart-modal').addEventListener('click', () => cartModal.style.display = 'none');

// if user clicks anywhere other than the modal, close the modal
window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

document.querySelector('.cart-modal').addEventListener('click', (event) => {
    if (event.target.id === 'checkoutButton') {
        shoeInventory.sale(cart.get())
            .then(() => {
                cart.clear();
                cartModal.style.display = 'none';
                alert("You have successfully checked out! Your shoes will be delivered shortly.");

                shoeInventory.filter(theDOM.getUserSearchOptions())
                    .then((matchingShoes) => {
                        resultsTemplate.render("#searchResultsOutput", { shoes : matchingShoes });
                    });
            });
    }
});