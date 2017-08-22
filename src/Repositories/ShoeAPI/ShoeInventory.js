import ApiParams from './ApiParams';
import ApiQueryBuilder from './ApiQueryBuilder';

export default class ShoeInventory {
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

        return $.ajax({
            type : "POST",
            url : this.apiParams.forAllShoes(),
            data : shoe,
            contentType : 'application/json'
        }).then(() => this.all());
    }

    find(shoeId) {
        let apiQuery = { _id : shoeId };

        return $.ajax({
            type : "GET",
            url : this.apiParams.forShoeSearch(apiQuery),
        }).then(function(shoe) {
            console.log(shoe);
            return shoe;
        });
    }

    sale(shoes) {
        console.log(this.apiParams.forShoeSale());

        return $.ajax({
            type : "POST",
            url : this.apiParams.forShoeSale(),
            data : JSON.stringify(shoes),
            contentType : 'application/json'
        }).then(function(result) {
            console.log(result);
        });
    }
};