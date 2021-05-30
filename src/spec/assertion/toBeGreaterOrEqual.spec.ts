import { expect } from '../../lib/assertion/expect';
import { Test, TestSuite } from '../../testyCore';

@TestSuite('Expect ToBeGreaterOrEqual Test Suite')
export class ExpectToBeEqualTestSuite {
  @Test(`1 to be greater than or equal 0`)
  private greater() {
    expect.toBeGreaterOrEqual(1, 0);
  }

  @Test(`0 to be greater than or equal 1`)
  private less() {
    expect.toThrow(() => {
      expect.toBeGreaterOrEqual(0, 1);
    });
  }

  @Test(`0 to be greater than or equal to 0`)
  private equal() {
    expect.toBeGreaterOrEqual(0, 0);
  }

  @Test(`1 not to be greater than or equal 0`)
  private notGreater() {
    expect.toThrow(() => {
      expect.not.toBeGreaterOrEqual(1, 0);
    });
  }

  @Test(`0 not to be greater than or equal 1`)
  private notLess() {
    expect.not.toBeGreaterOrEqual(0, 1);
  }

  @Test(`0 not to be greater than or equal to 0`)
  private notEqual() {
    expect.toThrow(() => {
      expect.not.toBeGreaterOrEqual(0, 0);
    });
  }
}
