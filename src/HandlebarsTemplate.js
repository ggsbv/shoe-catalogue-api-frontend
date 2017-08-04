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
}