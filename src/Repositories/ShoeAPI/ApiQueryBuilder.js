export default class ApiQueryBuilder {
    constructor(elementSelectors) {
        this.elementSelectors = elementSelectors;
    }
    
    build() {
        let apiQuery = {};

        for (let i = 0; this.elementSelectors.length; i++) {
            let elementSelector = this.elementSelectors[i];
            let element = document.querySelector(elementId);

            if (element.value !== 'All') {
                query[element.name] = element.value;
            };
        };

        return apiQuery;
    };
}