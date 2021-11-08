import { expect } from '../../lib/assertion/expect';
import { Test, TestSuite } from '../../testyCore';

@TestSuite('Expect ToBeDefined Test Suite')
export class ExpectToBeDefinedTestSuite {
  @Test('\'a\' to be defined')
  public aToBeDefined(): void {
    expect.toBeDefined('a');
  }

  @Test('undefined to be defined to fail')
  public undefinedToBeDefinedToFail(): void {
    expect.toThrow(() => {
      expect.toBeDefined(undefined);
    });
  }

  @Test('\'a\' not to be defined to fail')
  public aNotToBeDefinedToFail(): void {
    expect.toThrow(() => {
      expect.not.toBeDefined('a');
    });
  }

  @Test('undefined not to be defined')
  public undefinedNotToBeDefinedToFail(): void {
    expect.not.toBeDefined(undefined);
  }
}
