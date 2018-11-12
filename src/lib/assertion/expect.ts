import { ExpectationError } from './expectationError';
import { ToBeSorted } from './toBeSorted';

class Expect {
    private notFlag: boolean;

    public get not(): Expect {
        const expect = new Expect();
        expect.notFlag = !this.notFlag;
        return expect;
    }

    public get toBeSorted(): ToBeSorted {
        return new ToBeSorted(this.notFlag);
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

        if (this.notFlag)
            return;

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

    public toBeTruthy<T>(value: T, message?: string) {
        if (this.notFlag ? value : !value) {
            throw new ExpectationError(message || `Expected ${value} to be truthy.`);
        }
    }

    public toBeFalsy<T>(value: T, message?: string) {
        if (this.notFlag ? !value : value) {
            throw new ExpectationError(message || `Expected ${value} to be falsy.`);
        }
    }

    public toMatch(str: string, regex: RegExp, message?: string) {
        const matches = regex.test(str);
        if (this.notFlag ? matches : !matches) {
            throw new ExpectationError(message || `Expected "${str}" to match ${regex}.`);
        }
    }

    public toBeIn<T>(item: T, array: T[], message?: string): any {
        const isIn = array.find(x => x === item);
        if (this.notFlag ? isIn : !isIn) {
            throw new ExpectationError(message || `Expected ${item} to be in [${array.map(x => JSON.stringify(x)).join(', ')}]`);
        }
    }
}


export const expect = new Expect();