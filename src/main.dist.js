import uniq from 'lodash/uniq';

class ApiParams {
    constructor(url) {
        this.apiUrl = url;
    };

    forAllShoes() {
        return this.apiUrl;
    };

    forShoeSearch(query) {
        let uri = '';

        for (let category in query) {
            uri += category + '/' + query[category] + '/';
        }

        return this.apiUrl + uri;
    };
}

class ApiQueryBuilder {
    constructor(elementSelectors) {
        this.elementSelectors = elementSelectors;
    }
    
    buildForShoeSearch() {
        let apiQuery = {};

        for (let i = 0; i < this.elementSelectors.length; i++) {
            let elementSelector = this.elementSelectors[i];
            let selectedOption = $(elementSelector + " option:selected");

            if (selectedOption.val() !== 'All') {
                apiQuery[selectedOption.attr('name')] = selectedOption.val();
            }
        }

        return apiQuery;
    };

    buildForAddingShoe() {
        let apiQuery = {};

        this.elementSelectors.forEach((elementSelector) => {
            apiQuery[$(elementSelector).attr('name')] = $(elementSelector).val();
        });

        return JSON.stringify(apiQuery);
    }
}

class ShoeInventory {
    constructor(url) {
        this.apiParams = new ApiParams(url);
    }

    all() {
        return $.ajax({
            type    : "GET",
            url     : this.apiParams.forAllShoes(),
        }).then(function(shoeStock) {
            return shoeStock;
        });
    };

    filter(userSearchOptions) {
        let apiQueryBuilder = new ApiQueryBuilder(userSearchOptions);
        let apiQuery = apiQueryBuilder.buildForShoeSearch();

        return $.ajax({
            type    : "GET",
            url     : this.apiParams.forShoeSearch(apiQuery),
        }).then(function(shoes) {
            return shoes;
        });
    }

    add(shoeInputFields) {
        let apiQueryBuilder = new ApiQueryBuilder(shoeInputFields);
        let shoe = apiQueryBuilder.buildForAddingShoe();
        let _all = this.all;

        return $.ajax({
            type : "POST",
            url : this.apiParams.forAllShoes(),
            data : shoe,
            contentType : 'application/json'
        }).then(function() {
            return _all();
        });
    }
}

function TheDOM() {
    let userSearchOptions = [
        '#brandSelect',
        '#sizeSelect',
        '#colorSelect'
    ];

    let shoeInputFields = [
        '#addShoeBrand',
        '#addShoeSize',
        '#addShoeColor',
        '#addShoeStock',
        '#addShoePrice'
    ];

    const getUserSearchOptions = function () {
        return userSearchOptions;
    };

    const searchButton = function () {
        return document.querySelector('#searchButton');
    };

    //sort the shoe size in ascending order
    const sortOptions = function (optionsSelector) {
        let listOfOptions = document.querySelector(optionsSelector);
        let sortedArray = new Array();

        for (let i = 1; i < listOfOptions.length; i++) {
            sortedArray[i] = listOfOptions.options[i];
        }

        //sort the size options in ascending order by their value
        sortedArray.sort((a, b) => {
            return  (Number(a.value) > Number(b.value)) ? 1 :
                    ((Number(a.value) < Number(b.value)) ? -1 : 0);
        });

        for (let i = 0; i < sortedArray.length; i++) {
            listOfOptions.options[i + 1] = sortedArray[i];
        }
    };

    const getShoeInputFields = function () {
        return shoeInputFields;
    };

    const clearShoeInputFields = function () {
      shoeInputFields.forEach((elementSelector) => {
          document.querySelector(elementSelector).value = "";
      });
    };

    return {
        getUserSearchOptions,
        searchButton,
        sortOptions,
        getShoeInputFields,
        clearShoeInputFields
    }
}

class HandlebarsTemplate {
    constructor(templateSelector) {
        this.template = Handlebars.compile(
            document.querySelector(templateSelector).innerHTML
        );
    }

    render(outputElemSelector, data) {
        let outputElem = document.querySelector(outputElemSelector);
        outputElem.innerHTML = this.template(data);
    }

    sortUniqueShoeProperties(data) {
        let holder = {
            brand: [],
            size: [],
            color: []
        };

        data.forEach((shoe) => {
            Object.keys(holder)
                .forEach((key) => {
                    holder[key].push(shoe[key]);
                });
        });

        for (let key in holder) {
            holder[key] = uniq(holder[key]);
        }

        return holder;
    }

    renderDropdowns(outputElemSelector, data) {
        this.render(outputElemSelector, { shoe: this.sortUniqueShoeProperties(data) });
    }
}

var shoeInventory = new ShoeInventory('https://shoe-catalogue-api-codex.herokuapp.com/api/shoes/');
var theDOM = new TheDOM();
let searchTemplate = new HandlebarsTemplate('#searchTemplate');
let resultsTemplate = new HandlebarsTemplate('#searchResultsTemplate');

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
        });
});

/*
{
    brand : [],
    color : [],
    size : []
}
 */
