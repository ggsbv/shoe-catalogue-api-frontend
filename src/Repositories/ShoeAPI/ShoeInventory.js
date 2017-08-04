import ApiParams from './ApiParams';
import ApiQueryBuilder from './ApiQueryBuilder';

export default class ShoeInventory {
    constructor(url) {
        this.apiParams = new ApiParams(url);
    }

    all() {
        $.ajax({
            type    : "GET",
            url     : this.apiParams.forAllShoes(),
        }).then(function(shoeStock) {
            return shoeStock;
        });
    };

    filter(userSearchOptions) {
        let apiQueryBuilder = new ApiQueryBuilder(userSearchOptions);
        let apiQuery = apiQueryBuilder.build();

        $.ajax({
            type    : "GET",
            url     : this.apiParams.forShoeSearch(apiQuery),
        }).then(function(shoes) {
            return shoes;
        });
    }
}