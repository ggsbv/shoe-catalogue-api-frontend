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
        let apiQuery = apiQueryBuilder.buildForAddingShoe();

        return $.ajax({
            type    : "POST",
            url     : this.apiParams.forAllShoes(),
            data    : apiQuery
        }).then(function(shoes) {
            return shoes;
        });
    }
}