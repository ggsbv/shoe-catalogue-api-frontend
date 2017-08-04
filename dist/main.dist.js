var ApiParams = function ApiParams(url) {
    this.apiUrl = url;
};

ApiParams.prototype.forAllShoes = function forAllShoes () {
    return this.apiUrl;
};

ApiParams.prototype.forShoeSearch = function forShoeSearch (query) {
    var uri;

    for (var category in query) {
        uri += category + '/' + query[category] + '/';
    }

    return this.apiUrl + uri;
};

var ApiQueryBuilder = function ApiQueryBuilder(elementSelectors) {
    this.elementSelectors = elementSelectors;
};
    
ApiQueryBuilder.prototype.build = function build () {
        var this$1 = this;

    var apiQuery = {};

    for (var i = 0; this.elementSelectors.length; i++) {
        var elementSelector = this$1.elementSelectors[i];
        var element = document.querySelector(elementId);

        if (element.value !== 'All') {
            query[element.name] = element.value;
        }
    }

    return apiQuery;
};

var ShoeInventory = function ShoeInventory(url) {
    this.apiParams = new ApiParams(url);
};

ShoeInventory.prototype.all = function all () {
    $.ajax({
        type: "GET",
        url : this.apiParams.forAllShoes(),
    }).then(function(shoeStock) {
        return shoeStock;
    });
};

ShoeInventory.prototype.filter = function filter (userSearchOptions) {
    var apiQueryBuilder = new ApiQueryBuilder(userSearchOptions);
    var apiQuery = apiQueryBuilder.build();

    $.ajax({
        type: "GET",
        url : this.apiParams.forShoeSearch(apiQuery),
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

    var getUserSearchOptions = function () {
        return userSearchOptions;
    };

    var searchButton = function () {
        return document.querySelector('#searchButton');
    };

    return {
        getUserSearchOptions: getUserSearchOptions,
        searchButton: searchButton,
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

var shoeInventory = new ShoeInventory('waiter-availability-webapp.herokuapp.com/api/shoes/');
var theDOM = new TheDOM();
var searchTemplate = new HandlebarsTemplate('#searchTemplate');
var resultsTemplate = new HandlebarsTemplate('#searchResultsTemplate');

// populate the dropdown menus with shoe categories when the page loads
window.onload = function () {
    // create options for categories for all shoes in the API
    shoeInventory.all().then(function (shoeStock) {
        searchTemplate.render('#searchStockDiv', shoeStock);
    });
};

// when user clicks search button
theDOM.searchButton.addEventListener('click', function () {
    //display the shoes that match their search query
    resultsTemplate.render(
        '#searchResultsOutput',
        shoeInventory.filter(theDom.getUserSearchOptions)
    );
});
