import _find from '../lodash-es/find';
import _sumBy from '../lodash-es/sumBy';

export default class Cart {
    constructor() {
        this.contents = [];
    }

    get() {
        return this.contents;
    }

    add(shoe) {
        let match = _find(this.contents, (currentShoe) => currentShoe._id === shoe._id);

        match ? match.qty++ : (
            shoe['qty'] = 1,
            this.contents.push(shoe)
        );
    }

    clear() {
        this.contents = [];
    }

    calculateTotal() {
        return _sumBy(this.contents, (shoe) => shoe.qty * shoe.price);
    }
}
