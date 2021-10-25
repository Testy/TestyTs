import { expect } from '../../lib/assertion/expect';
import { Test, TestSuite } from '../../testyCore';

@TestSuite('Expect ToBeGreater Test Suite')
export class ExpectToBeEqualTestSuite {
  @Test('1 to be greater than 0')
  private greater() {
    expect.toBeGreater(1, 0);
  }

  @Test('0 to be greater than 1')
  private less() {
    expect.toThrow(() => {
      expect.toBeGreater(0, 1);
    });
  }

  @Test('0 to be greater than 0')
  private equal() {
    expect.toThrow(() => {
      expect.toBeGreater(0, 0);
    });
  }

  @Test('1 not to be greater than 0')
  private notGreater() {
    expect.toThrow(() => {
      expect.not.toBeGreater(1, 0);
    });
  }

  @Test('0 not to be greater than 1')
  private notLess() {
    expect.not.toBeGreater(0, 1);
  }

  @Test('0 not to be greater than 0')
  private notEqual() {
    expect.not.toBeGreater(0, 0);
  }
}
