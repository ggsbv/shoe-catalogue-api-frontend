export default class ApiQueryBuilder {
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