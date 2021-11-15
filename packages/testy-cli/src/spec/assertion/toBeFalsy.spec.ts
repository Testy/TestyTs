import { expect } from '../../lib/assertion/expect';
import { Test, TestCase, TestSuite } from '../../testyCore';

@TestSuite('Expect ToBeFalsy Tests')
export class ExpectToBeFalsy {
  @Test('To be falsy, should succeed')
  @TestCase('false', false)
  @TestCase('zero', 0)
  @TestCase('empty string', '')
  @TestCase('null', null)
  @TestCase('undefined', undefined)
  @TestCase('NaN', NaN)
  private toBeFalsySuccess(arg) {
    expect.toBeFalsy(arg);
  }

  @Test('To be falsy, should fail')
  @TestCase('true', true)
  @TestCase("'0'", '0')
  @TestCase('Object', { a: 1 })
  private toBeFalsyFail(arg) {
    expect.toThrow(() => {
      expect.toBeFalsy(arg);
    });
  }

  @Test('Not to be falsy, should succeed')
  @TestCase('true', true)
  @TestCase("'0'", '0')
  @TestCase('Object', { a: 1 })
  private notToBeFalsySuccess(arg) {
    expect.not.toBeFalsy(arg);
  }

  @Test('Not to be falsy, should fail')
  @TestCase('false', false)
  @TestCase('zero', 0)
  @TestCase('empty string', '')
  @TestCase('null', null)
  @TestCase('undefined', undefined)
  @TestCase('NaN', NaN)
  private notToBeFalsyFail(arg) {
    expect.toThrow(() => {
      expect.not.toBeFalsy(arg);
    });
  }
}
