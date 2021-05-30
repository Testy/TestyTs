import { expect } from '../../lib/assertion/expect';
import { Test, TestSuite } from '../../testyCore';

@TestSuite('Expect ToBeSorted InAscendingOrder Tests')
export class ExpectToBeOrdered {
  @Test('ordered numbers to be ordered')
  public orderedNumbersToBeOrdered(): void {
    expect.toBeSorted.inAscendingOrder([-1, 2, 2, 5, 7, 100]);
  }

  @Test('unordered numbers to be ordered to fail')
  public unorderedNumbersToBeOrderedFails(): void {
    expect.toThrow(() => {
      expect.toBeSorted.inAscendingOrder([100, 5, 2, -1, -10]);
    });
  }

  @Test('ordered objects array to be ordered')
  public orderedObjectsToBeOrdered(): void {
    expect.toBeSorted.inAscendingOrder([{ a: -10 }, { a: -1 }, { a: 3 }, { a: 100 }], (x) => x.a);
  }

  @Test('unordered objects array to be ordered, fails')
  public unorderedObjectsToBeOrderedFails(): void {
    expect.toThrow(() => {
      expect.toBeSorted.inAscendingOrder([{ a: 14 }, { a: -1 }, { a: 3 }, { a: 10 }], (x) => x.a);
    });
  }

  @Test('ordered numbers not to be ordered to fail')
  public orderedNumbersNotToBeOrderedFails(): void {
    expect.toThrow(() => {
      expect.not.toBeSorted.inAscendingOrder([-1, 2, 2, 5, 7, 100]);
    });
  }

  @Test('unordered numbers not to be ordered')
  public unorderedNumbersNotToBeOrderedFails(): void {
    expect.not.toBeSorted.inAscendingOrder([100, 5, 2, -1, -10]);
  }

  @Test('ordered objects array not to be ordered')
  public orderedObjectsNotToBeOrdered(): void {
    expect.toThrow(() => {
      expect.not.toBeSorted.inAscendingOrder([{ a: -10 }, { a: -1 }, { a: 3 }, { a: 100 }], (x) => x.a);
    });
  }

  @Test('unordered objects array not to be ordered')
  public unorderedObjectsNotToBeOrdered(): void {
    expect.not.toBeSorted.inAscendingOrder([{ a: 14 }, { a: -1 }, { a: 3 }, { a: 10 }], (x) => x.a);
  }
}
