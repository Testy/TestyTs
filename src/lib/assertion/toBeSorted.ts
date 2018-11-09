import { ExpectationError } from './expectationError';

export class ToBeSorted {
    constructor(private notFlag: boolean) { }

    public inAscendingOrder<T>(array: T[], selector?: ((T) => any), message?: string) {
        this.toBeOrdered(array, selector, Order.Ascending, message);
    }

    public inDescendingOrder<T>(array: T[], selector?: ((T) => any), message?: string) {
        this.toBeOrdered(array, selector, Order.Descending, message);
    }

    private toBeOrdered<T>(array: T[], selector: ((T) => any), order: Order, message?: string, ) {
        if (!selector) selector = x => x;

        const compare = (a, b) => {
            return order === Order.Ascending
                ? selector(a) <= selector(b)
                : selector(b) <= selector(a)
        };

        const isOrdered = array.every((val, i, arr) => i === 0 || compare(arr[i - 1], val));
        if (this.notFlag ? isOrdered : !isOrdered) {
            throw new ExpectationError(message || `Expected ${array} to be be sorted ${order === Order.Ascending ? 'from low to high' : 'from high to low'}.`);
        }
    }
}

enum Order { Ascending, Descending }
