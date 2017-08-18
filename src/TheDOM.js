export default function TheDOM() {
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
};