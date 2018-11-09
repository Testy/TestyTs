import { ExpectationError } from './expectationError';

class Expect {
    private notFlag: boolean;

    public get not(): Expect {
        const expect = new Expect();
        expect.notFlag = !this.notFlag;
        return expect;
    }

    public toBeEqual<T>(actual: T, expected: T, message?: string) {
        if (this.notFlag ? actual === expected : actual !== expected)
            throw new ExpectationError(message || `Expected ${JSON.stringify(actual)} ${this.notFlag ? 'not' : ''} to equal ${JSON.stringify(expected)}.`);
    }

    public toBeDefined<T>(value: T, message?: string) {
        if (this.notFlag ? value !== undefined : value === undefined)
            throw new ExpectationError(message || `Expected value ${this.notFlag ? 'not' : ''} to be defined.`);
    }

    public toThrow(func: (() => any), message?: string) {
        try {
            func();
        }
        catch (err) {
            if (this.notFlag)
                throw new ExpectationError(message || 'Expected function not to throw');

            return;
        }

        if (this.notFlag)
            return;

        throw new ExpectationError(message || 'Expected function to throw');
    }

    public async toThrowAsync(func: (() => Promise<any>), message?: string) {
        try {
            await func();
        }
        catch (err) {
            if (this.notFlag)
                throw new ExpectationError(message || 'Expected function not to throw');

            return;
        }

        throw new ExpectationError(message || 'Expected function to throw');
    }

    public toBeTrue(value: boolean, message?: string) {
        if (this.notFlag ? value === true : value !== true) {
            throw new ExpectationError(message || `Expected ${value} to be true.`);
        }
    }

    public toBeFalse(value: boolean, message?: string) {
        if (this.notFlag ? value === false : value !== false) {
            throw new ExpectationError(message || `Expected ${value} to be false.`);
        }
    }

    public toBeTruthy(value: boolean, message?: string) {
        if (this.notFlag ? value : !value) {
            throw new ExpectationError(message || `Expected ${value} to be truthy.`);
        }
    }

    public toBeFalsy(value: boolean, message?: string) {
        if (this.notFlag ? !value : value) {
            throw new ExpectationError(message || `Expected ${value} to be falsy.`);
        }
    }

    public toBeOrdered<T>(array: T[], order: Order = Order.LowToHigh, selector?: ((T) => any), message?: string) {
        if (!selector) x => x;

        const compare = (a, b) => {
            return order === Order.LowToHigh
                ? selector(a) <= selector(b)
                : selector(b) <= selector(a)
        };

        const isOrdered = array.every((val, i, arr) => i === 0 || compare(arr[i - 1], val));
        if (this.notFlag ? isOrdered : !isOrdered) {
            throw new ExpectationError(message || `Expected ${array} to be be sorted ${order === Order.LowToHigh ? 'from low to high' : 'from high to low'}.`);
        }
    }

    public toMatch(str: string, regex: RegExp, message?: string) {
        const matches = regex.test(str);
        if (this.notFlag ? matches : !matches) {
            throw new ExpectationError(message || `Expected "${str}" to match ${regex}.`)
        }
    }

    public toBeIn<T>(item: T, array: T[], message?: string): any {
        const isIn = array.find(x => x === item);
        if (this.notFlag ? isIn : !isIn) {
            throw new ExpectationError(message || `Expected ${item} to be in [${array.map(x => JSON.stringify(x)).join(', ')}]`);
        }
    }
}

export enum Order { LowToHigh, HighToLow }

export const expect = new Expect();