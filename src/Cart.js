import _find from '../lodash-es/find';

export default class Cart {
    constructor(contents) {
        this.contents = contents;
    }

    get() {
        return this.contents;
    }

    add(shoe) {
        let match = _find(this.contents, (currentShoe) => currentShoe.id === shoe.id);

        match ? match.total++ : (
            shoe['total'] = 1,
            this.contents.push(shoe)
        );
    }

    remove() {

    }

    clear() {

    }
}
