export default function TheDOM() {
    let userSearchOptions = [
        '#brandSelect',
        '#sizeSelect',
        '#colorSelect'
    ];

    const getUserSearchOptions = function () {
        return userSearchOptions;
    };

    const searchButton = function () {
        return document.querySelector('#searchButton');
    };

    return {
        getUserSearchOptions,
        searchButton,
    }
};