import uniq from '../lodash-es/uniq';

export default class HandlebarsTemplate {
    constructor(templateSelector) {
        this.template = Handlebars.compile(
            document.querySelector(templateSelector).innerHTML
        );
    }

    render(outputElemSelector, data) {
        let outputElem = document.querySelector(outputElemSelector);
        outputElem.innerHTML = this.template(data);
    }

    sortUniqueShoeProperties(data) {
        let holder = {
            brand: [],
            size: [],
            color: []
        };

        data.forEach((shoe) => {
            Object.keys(holder)
                .forEach((key) => {
                    holder[key].push(shoe[key]);
                });
        });

        for (let key in holder) {
            holder[key] = uniq(holder[key]);
        }

        return holder;
    }

    renderDropdowns(outputElemSelector, data) {
        this.render(outputElemSelector, { shoe: this.sortUniqueShoeProperties(data) });
    }
}