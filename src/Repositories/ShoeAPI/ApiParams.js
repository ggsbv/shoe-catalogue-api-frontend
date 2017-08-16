export default class ApiParams {
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
        };

        return this.apiUrl + uri;
    };
}

