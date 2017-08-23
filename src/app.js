import EventHandler from './EventHandler.js';

let eventHandler = new EventHandler();

window.onload = eventHandler.populateDropdowns;

document.querySelector('#searchStockDiv').addEventListener('click', eventHandler.searchStock);

// if user clicks on Admin, open the add stock modal
document.querySelector('#openModal').addEventListener('click', eventHandler.openAddStockModal);

// if user clicks on close button, close the modal
document.querySelector('.close').addEventListener('click', eventHandler.closeAddStockModal);

// if user clicks anywhere other than the modal, close the modal
window.addEventListener('click', eventHandler.closeAddStockModalOnWindowClick);

// when user submits a shoe, add the shoe to the shoe inventory
document.querySelector('.addStockButton').addEventListener('click', eventHandler.addToStock);

// when user clicks on "Add to Cart", the shoe should be added to cart
document.querySelector('#searchResultsOutput').addEventListener('click', eventHandler.addToCart);

// if user clicks on Admin, open the add stock modal
document.querySelector('#openCartModal').addEventListener('click', eventHandler.openAndRenderCart);

// if user clicks on close button, close the modal
document.querySelector('.cart-modal').addEventListener('click', eventHandler.closeCartModal);

// if user clicks anywhere other than the modal, close the modal
window.addEventListener('click', eventHandler.closeCartModalOnWindowClick);

document.querySelector('.cart-modal').addEventListener('click', eventHandler.checkout);