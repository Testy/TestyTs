import { expect } from '../../lib/assertion/expect';
import { Test, TestCase, TestSuite } from '../../testyCore';

@TestSuite('Expect ToBeFalse Test Suite')
export class ExpectToBeFalseTestSuite {
  @Test('false to be false, should succeed')
  private falseToBeFalse() {
    expect.toBeFalse(false);
  }

  @Test('false not to be false, should fail')
  private falseNotToBeFalseFail() {
    expect.toThrow(() => {
      expect.not.toBeFalse(false);
    });
  }

  @Test('To be false, should fail')
  @TestCase('true', true)
  @TestCase('undefined', undefined)
  @TestCase('null', null)
  @TestCase('empty array', [])
  @TestCase('empty object', {})
  @TestCase('NaN', NaN)
  private toBeFalseFail(arg) {
    expect.toThrow(() => {
      expect.toBeFalse(arg);
    });
  }

  @Test('Not to be false, should succeed')
  @TestCase('true', true)
  @TestCase('undefined', undefined)
  @TestCase('null', null)
  @TestCase('empty array', [])
  @TestCase('empty object', {})
  @TestCase('NaN', NaN)
  private notToBeFalseSuccess(arg) {
    expect.not.toBeFalse(arg);
  }
}
