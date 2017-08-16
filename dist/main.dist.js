var ApiParams = function ApiParams(url) {
    this.apiUrl = url;
};

ApiParams.prototype.forAllShoes = function forAllShoes () {
    return this.apiUrl;
};

ApiParams.prototype.forShoeSearch = function forShoeSearch (query) {
    var uri = '';

    for (var category in query) {
        uri += category + '/' + query[category] + '/';
    }

    return this.apiUrl + uri;
};

var ApiQueryBuilder = function ApiQueryBuilder(elementSelectors) {
    this.elementSelectors = elementSelectors;
};
    
ApiQueryBuilder.prototype.buildForShoeSearch = function buildForShoeSearch () {
        var this$1 = this;

    var apiQuery = {};

    for (var i = 0; i < this.elementSelectors.length; i++) {
        var elementSelector = this$1.elementSelectors[i];
        var selectedOption = $(elementSelector + " option:selected");

        if (selectedOption.val() !== 'All') {
            apiQuery[selectedOption.attr('name')] = selectedOption.val();
        }
    }

    return apiQuery;
};

ApiQueryBuilder.prototype.buildForAddingShoe = function buildForAddingShoe () {
    var apiQuery = {};

    this.elementSelectors.forEach(function (elementSelector) {
        apiQuery[$(elementSelector).attr('name')] = $(elementSelector).val();
    });

    return apiQuery;
};

var ShoeInventory = function ShoeInventory(url) {
    this.apiParams = new ApiParams(url);
};

ShoeInventory.prototype.all = function all () {
    return $.ajax({
        type: "GET",
        url : this.apiParams.forAllShoes(),
    }).then(function(shoeStock) {
        return shoeStock;
    });
};

ShoeInventory.prototype.filter = function filter (userSearchOptions) {
    var apiQueryBuilder = new ApiQueryBuilder(userSearchOptions);
    var apiQuery = apiQueryBuilder.buildForShoeSearch();

    return $.ajax({
        type: "GET",
        url : this.apiParams.forShoeSearch(apiQuery),
    }).then(function(shoes) {
        return shoes;
    });
};

ShoeInventory.prototype.add = function add (shoeInputFields) {
    var apiQueryBuilder = new ApiQueryBuilder(shoeInputFields);
    var apiQuery = apiQueryBuilder.buildForAddingShoe();

    return $.ajax({
        type: "POST",
        url : this.apiParams.forAllShoes(),
        data: apiQuery
    }).then(function(shoes) {
        return shoes;
    });
};

function TheDOM() {
    var userSearchOptions = [
        '#brandSelect',
        '#sizeSelect',
        '#colorSelect'
    ];

    var shoeInputFields = [
        '#addShoeBrand',
        '#addShoeSize',
        '#addShoeColor',
        '#addShoeStock',
        '#addShoePrice'
    ];

    var getUserSearchOptions = function () {
        return userSearchOptions;
    };

    var searchButton = function () {
        return document.querySelector('#searchButton');
    };

    //sort the shoe size in ascending order
    var sortOptions = function (optionsSelector) {
        var listOfOptions = document.querySelector(optionsSelector);
        var sortedArray = new Array();

        for (var i = 1; i < listOfOptions.length; i++) {
            sortedArray[i] = listOfOptions.options[i];
        }

        //sort the size options in ascending order by their value
        sortedArray.sort(function (a, b) {
            return  (Number(a.value) > Number(b.value)) ? 1 :
                    ((Number(a.value) < Number(b.value)) ? -1 : 0);
        });

        for (var i$1 = 0; i$1 < sortedArray.length; i$1++) {
            listOfOptions.options[i$1 + 1] = sortedArray[i$1];
        }
    };

    var getShoeInputFields = function () {
        return shoeInputFields;
    };

    return {
        getUserSearchOptions: getUserSearchOptions,
        searchButton: searchButton,
        sortOptions: sortOptions,
        getShoeInputFields: getShoeInputFields,
    }
}

var HandlebarsTemplate = function HandlebarsTemplate(templateSelector) {
    this.template = Handlebars.compile(
        document.querySelector(templateSelector).innerHTML
    );
};

HandlebarsTemplate.prototype.render = function render (outputElemSelector, data) {
    var outputElem = document.querySelector(outputElemSelector);
    outputElem.innerHTML = this.template(data);
};

var shoeInventory = new ShoeInventory('https://shoe-catalogue-api-codex.herokuapp.com/api/shoes/');
var theDOM = new TheDOM();
var searchTemplate = new HandlebarsTemplate('#searchTemplate');
var resultsTemplate = new HandlebarsTemplate('#searchResultsTemplate');

// populate the dropdown menus with shoe categories when the page loads
window.onload = function () {
    // create options for categories for all shoes in the API
    shoeInventory.all().then(function (shoeStock) {
        searchTemplate.render('#searchStockDiv', { shoe : shoeStock });
        theDOM.sortOptions('#sizeSelect');
    });
};

document.querySelector('#searchStockDiv').addEventListener('click', function (event) {
// when user clicks search button
    if (event.target.id === 'searchStockButton') {
        //display the shoes that match their search query
        shoeInventory.filter(theDOM.getUserSearchOptions())
            .then(function (matchingShoes) {
                resultsTemplate.render("#searchResultsOutput", { shoes : matchingShoes });
            });
    }
});

// Stock add modal
var addStockModal = document.querySelector(".addStock");

// if user clicks on Admin, open the add stock modal
document.querySelector('#openModal').addEventListener('click', function () { return addStockModal.style.display = 'flex'; });

document.querySelector('.close').addEventListener('click', function () { return addStockModal.style.display = 'none'; });

window.addEventListener('click', function (event) {
    if (event.target === addStockModal) {
        addStockModal.style.display = 'none';
    }
});

document.querySelector('.addStockButton').addEventListener('click', function () { return shoeInventory.add(theDOM.getShoeInputFields()); });
