import ShoeInventory from './Repositories/ShoeAPI/ShoeInventory';
import TheDOM from './TheDOM';
import HandlebarsTemplate from './HandlebarsTemplate';
import Cart from './Cart';

let shoeInventory = new ShoeInventory('https://shoe-catalogue-api-codex.herokuapp.com/api/shoes/');
let theDOM = new TheDOM();
let searchTemplate = new HandlebarsTemplate('#searchTemplate');
let resultsTemplate = new HandlebarsTemplate('#searchResultsTemplate');
let cartTemplate = new HandlebarsTemplate('#cartTemplate');
let cart = new Cart();

export default function EventHandler() {
    const populateDropdowns = () => {
        console.log("Window Loaded.");
        shoeInventory.all().then((shoeStock) => {
            searchTemplate.renderDropdowns('#searchStockDiv', shoeStock);
            theDOM.sortOptions('#sizeSelect');
        });
    };

    const searchStock = (event) => {
        if (event.target.id === 'searchButton') {
            shoeInventory.filter(theDOM.getUserSearchOptions())
                .then((matchingShoes) => {
                    resultsTemplate.render("#searchResultsOutput", { shoes : matchingShoes });
                });
        }
    };

    const addToStock = (event) => {
        event.preventDefault();

        shoeInventory
            .add(theDOM.getShoeInputFields())
            .then((updatedShoeStock) => {
                theDOM.clearShoeInputFields();

                searchTemplate.renderDropdowns('#searchStockDiv', updatedShoeStock);
                theDOM.sortOptions('#sizeSelect');
                alert('Shoe has been added to stock.');
            });
    };

    const addToCart = (event) => {
        if (event.target.id === 'buyButton') {
            shoeInventory.find(event.target.value).then((shoe) => {
                cart.add(shoe);
                alert("Successfully added to cart!");
            });
        }
    };

    const openAndRenderCart = () => {
        let cartModal = document.querySelector('.cart-modal');

        cartModal.style.display = 'flex';
        cartTemplate.render('.cart-modal', { shoe: cart.get(), total: cart.calculateTotal() });
    };

    const checkout = (event) => {
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
    };

    const openAddStockModal = (event) => document.querySelector('.addStock').style.display = 'flex';

    const closeAddStockModal = (event) => document.querySelector('.addStock').style.display = 'none';

    const closeAddStockModalOnWindowClick = (event) => {
        let addStock = document.querySelector('.addStock');

        if (event.target === addStock) {
            addStock.style.display = 'none';
        }
    };

    const closeCartModal = () => document.querySelector('.cart-modal').style.display = 'none';

    const closeCartModalOnWindowClick = (event) => {
        let cartModal = document.querySelector('.cart-modal');

        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    };

    return {
        populateDropdowns,
        searchStock,
        addToStock,
        addToCart,
        openAndRenderCart,
        checkout,
        openAddStockModal,
        closeAddStockModal,
        closeAddStockModalOnWindowClick,
        closeCartModal,
        closeCartModalOnWindowClick
    }
}