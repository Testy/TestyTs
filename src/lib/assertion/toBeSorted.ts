import { ExpectationError } from './expectationError';

export class ToBeSorted {
  constructor(private notFlag: boolean) {}

  public inAscendingOrder<T>(array: T[], selector?: (item: T) => unknown, message?: string): void {
    this.toBeOrdered(array, selector, Order.Ascending, message);
  }

  public inDescendingOrder<T>(array: T[], selector?: (item: T) => unknown, message?: string): void {
    this.toBeOrdered(array, selector, Order.Descending, message);
  }

  private toBeOrdered<T>(array: T[], selector: (item: T) => unknown, order: Order, message?: string) {
    if (!selector) selector = (x) => x;

    if (this.isOrdered(array, order, selector)) {
      throw new ExpectationError(
        message ||
          `Expected ${array} to be be sorted ${order === Order.Ascending ? 'from low to high' : 'from high to low'}.`,
      );
    }
  }

  private isOrdered<T>(array: T[], order: Order, selector: (item: T) => unknown) {
    const isOrdered = array.every((val, i, arr) => i === 0 || this.compare(order, selector, arr[i - 1], val));
    return this.notFlag ? isOrdered : !isOrdered;
  }

  private compare(order: Order, selector: (item: unknown) => unknown, a: unknown, b: unknown) {
    return order === Order.Ascending ? selector(a) <= selector(b) : selector(b) <= selector(a);
  }
}

enum Order {
  Ascending,
  Descending,
}
