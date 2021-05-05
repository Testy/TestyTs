export class Calculator {
  public sum(a: number, b: number, throwIfBiggerThan?: number) {
    const result = a + b;

    if (throwIfBiggerThan != null && result > throwIfBiggerThan) {
      throw new Error(
        `Expected result to be smaller than ${throwIfBiggerThan}`
      );
    }

    return result;
  }
}
