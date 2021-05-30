import { expect } from '../../lib/assertion/expect';
import { Test, TestSuite } from '../../testyCore';

@TestSuite('Expect ToBeLess Test Suite')
export class ExpectToBeEqualTestSuite {
  @Test(`0 to be less than 1`)
  private less() {
    expect.toBeLess(0, 1);
  }

  @Test(`1 to be less than 0`)
  private greater() {
    expect.toThrow(() => {
      expect.toBeLess(1, 0);
    });
  }

  @Test(`0 to be less than 0`)
  private equal() {
    expect.toThrow(() => {
      expect.toBeLess(0, 0);
    });
  }

  @Test(`0 not to be less than 1`)
  private notLess() {
    expect.toThrow(() => {
      expect.not.toBeLess(0, 1);
    });
  }

  @Test(`1 not to be less than 0`)
  private notGreater() {
    expect.not.toBeLess(1, 0);
  }

  @Test(`0 not to be less than 0`)
  private notEqual() {
    expect.not.toBeLess(0, 0);
  }
}
