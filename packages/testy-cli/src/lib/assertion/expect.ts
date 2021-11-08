import { ExpectationError } from './expectationError';
import { ToBeSorted } from './toBeSorted';

/**
 * utilitary class with assertion methods.
 */
class Expect {
  private notFlag: boolean;

  /**
   * inverts the following assertion.
   */
  public get not(): Expect {
    const expect = new Expect();
    expect.notFlag = !this.notFlag;
    return expect;
  }

  /**
   * returns a ToBeSorted assertion builder
   */
  public get toBeSorted(): ToBeSorted {
    return new ToBeSorted(this.notFlag);
  }

  /**
   * throws if actual is not equal to expected.
   *
   * @param actual Actual value.
   * @param expected Expected value.
   * @param message Custom assertion failure message.
   */
  public toBeEqual<T>(actual: T, expected: T, message?: string) {
    if (this.notFlag ? actual === expected : actual !== expected) {
      throw new ExpectationError(
        message ||
          `Expected ${this.stringify(actual)} ${this.notFlag ? 'not ' : ''}to equal ${this.stringify(expected)}.`
      );
    }
  }

  /**
   * throws if the two arrays are not equal
   *
   * @param actual Actual array.
   * @param expected Expected array.
   * @param message Custom assertion failure message.
   */
  public arraysToBeEqual<T extends readonly unknown[]>(actual: T, expected: T, message?: string) {
    if (actual.length !== expected.length) {
      throw new ExpectationError(message || 'Expected sequences to be equal, but their lenghts were different.');
    }

    for (const i in actual) {
      if (!actual.hasOwnProperty(i)) {
        continue;
      }

      this.toBeEqual(actual[i], expected[i], message);
    }
  }

  /**
   * throws is actual is not greater than expected.
   *
   * @param actual Value chich is expected to be greater
   * @param expected Value which actual is compared against
   * @param message Custom assertion failure message.
   */
  public toBeGreater(actual: number, expected: number, message?: string) {
    if ((!this.notFlag && actual <= expected) || (this.notFlag && actual > expected)) {
      throw new ExpectationError(
        message || `Expected ${actual} ${this.notFlag ? 'not ' : ''}to be greater than ${expected}.`
      );
    }
  }

  /**
   * throws is actual is not greater than expected.
   *
   * @param actual Value chich is expected to be greater or equal
   * @param expected Value which actual is compared against
   * @param message Custom assertion failure message.
   */
  public toBeGreaterOrEqual(actual: number, expected: number, message?: string) {
    if ((!this.notFlag && actual < expected) || (this.notFlag && actual >= expected)) {
      throw new ExpectationError(
        message || `Expected ${actual} ${this.notFlag ? 'not ' : ''}to be greater than or equal to ${expected}.`
      );
    }
  }

  /**
   * throws is actual is not greater than expected.
   *
   * @param actual Value chich is expected to be lesser
   * @param expected Value which actual is compared against
   * @param message Custom assertion failure message.
   */
  public toBeLess(actual: number, expected: number, message?: string) {
    if ((!this.notFlag && actual >= expected) || (this.notFlag && actual < expected)) {
      throw new ExpectationError(
        message || `Expected ${actual} ${this.notFlag ? 'not ' : ''}to be less than ${expected}.`
      );
    }
  }

  /**
   * throws is actual is not greater than expected.
   *
   * @param actual Value chich is expected to be lesser or equal
   * @param expected Value which actual is compared against
   * @param message Custom assertion failure message.
   */
  public toBeLessOrEqual(actual: number, expected: number, message?: string) {
    if ((!this.notFlag && actual > expected) || (this.notFlag && actual <= expected)) {
      throw new ExpectationError(
        message || `Expected ${actual} ${this.notFlag ? 'not ' : ''}to be less than or equal to ${expected}.`
      );
    }
  }

  /**
   * throws if value is not defined.
   *
   * @param value Value which is expected to be defined.
   * @param message Custom assertion failure message.
   */
  public toBeDefined<T>(value: T, message?: string) {
    if (this.notFlag ? value !== undefined : value === undefined) {
      throw new ExpectationError(message || `Expected value ${this.notFlag ? 'not' : ''} to be defined.`);
    }
  }

  /**
   * throws if the given function does not throw.
   *
   * @param func Function which is expected to throw.
   * @param message Custom assertion failure message.
   */
  public toThrow(func: () => unknown, message?: string) {
    try {
      func();
    } catch (err) {
      if (this.notFlag) {
        throw new ExpectationError(message || 'Expected function not to throw');
      }

      return;
    }

    if (this.notFlag) {
      return;
    }

    throw new ExpectationError(message || 'Expected function to throw');
  }

  /**
   * throws if the given async function does not throw. Do not forget to await this method!
   *
   * @param func Async function which is expected to throw.
   * @param message Custom assertion failure message.
   */
  public async toThrowAsync(func: () => Promise<unknown>, message?: string) {
    try {
      await func();
    } catch (err) {
      if (this.notFlag) {
        throw new ExpectationError(message || 'Expected function not to throw');
      }

      return;
    }

    if (this.notFlag) {
      return;
    }

    throw new ExpectationError(message || 'Expected function to throw');
  }

  /**
   * throws if value is not true.
   *
   * @param value Value which is expected to be true.
   * @param message Custom assertion failure message.
   */
  public toBeTrue(value: boolean, message?: string) {
    if (this.notFlag ? value === true : value !== true) {
      throw new ExpectationError(message || `Expected ${value} to be true.`);
    }
  }

  /**
   * throws if value is not false.
   *
   * @param value Value which is expected to be false.
   * @param message Custom assertion failure message.
   */
  public toBeFalse(value: boolean, message?: string) {
    if (this.notFlag ? value === false : value !== false) {
      throw new ExpectationError(message || `Expected ${value} to be false.`);
    }
  }

  /**
   * throws if value is not truthy (truthy means everything except false, 0, '', null, undefined and NaN).
   *
   * @param value Value which is expected to be truthy.
   * @param message Custom assertion failure message.
   */
  public toBeTruthy<T>(value: T, message?: string) {
    if (this.notFlag ? value : !value) {
      throw new ExpectationError(message || `Expected ${value} to be truthy.`);
    }
  }

  /**
   * throws if value is not falsy (falsy means the value is either false, 0, '', null, undefined or NaN).
   *
   * @param value Value which is expected to be falsy.
   * @param message Custom assertion failure message.
   */
  public toBeFalsy<T>(value: T, message?: string) {
    if (this.notFlag ? !value : value) {
      throw new ExpectationError(message || `Expected ${value} to be falsy.`);
    }
  }

  /**
   * throws if the value does not match the given regular expression.
   *
   * @param str String which is expected to match the given regular expression.
   * @param regex The regex which the string is expected to match.
   * @param message Custom assertion failure message
   */
  public toMatch(str: string, regex: RegExp, message?: string) {
    const matches = regex.test(str);
    if (this.notFlag ? matches : !matches) {
      throw new ExpectationError(message || `Expected "${str}" to match ${regex}.`);
    }
  }

  /**
   * throws if the given item is not part of the given array.
   *
   * @param item Item which is expected to be in the given array.
   * @param array Array in which the given item is expected to be.
   * @param message Custom assertion failure message.
   */
  public toBeIn<T>(item: T, array: readonly T[], message?: string) {
    const isIn = array.find((x) => x === item);
    if (this.notFlag ? isIn : !isIn) {
      throw new ExpectationError(
        message || `Expected ${item} to be in [${array.map((x) => this.stringify(x)).join(', ')}]`
      );
    }
  }

  /**
   * returns a string version of the given value. For objects, returns JSON.stringify(val).
   * For numbers and strings, returns `${val}`.
   */
  private stringify(val: unknown) {
    return typeof val === 'object' ? JSON.stringify(val) : `${val}`;
  }
}

/**
 * utilitary class with assertion methods.
 */
export const expect = new Expect();
