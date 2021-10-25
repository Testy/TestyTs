import { expect } from '../../lib/assertion/expect';
import { Test, TestCase, TestSuite } from '../../testyCore';

@TestSuite('Expect ToBeTruthy Tests')
export class ExpectToBeTruthy {
  @Test('To be truthy, should succeed')
  @TestCase('true', true)
  @TestCase('\'0\'', '0')
  @TestCase('\'false\'', 'false')
  @TestCase('empty object', {})
  @TestCase('empty array', [])
  @TestCase('empty function', () => {
    return;
  })
  public toBeTruthySuccess(arg: unknown): void {
    expect.toBeTruthy(arg);
  }

  @Test('To be truthy, should fail')
  @TestCase('false', false)
  @TestCase('zero', 0)
  @TestCase('empty string', '')
  @TestCase('null', null)
  @TestCase('undefined', undefined)
  @TestCase('NaN', NaN)
  public toBeTruthyFail(arg: unknown): void {
    expect.toThrow(() => {
      expect.toBeTruthy(arg);
    });
  }

  @Test('Not to be truthy, should fail')
  @TestCase('true', true)
  @TestCase('\'0\'', '0')
  @TestCase('\'false\'', 'false')
  @TestCase('empty object', {})
  @TestCase('empty array', [])
  @TestCase('empty function', () => {
    return;
  })
  public notToBeTruthyFail(arg: unknown): void {
    expect.toThrow(() => {
      expect.not.toBeTruthy(arg);
    });
  }

  @Test('Not to be truthy, should succeed')
  @TestCase('false', false)
  @TestCase('zero', 0)
  @TestCase('empty string', '')
  @TestCase('null', null)
  @TestCase('undefined', undefined)
  @TestCase('NaN', NaN)
  public notToBeTruthySuccess(arg: unknown): void {
    expect.not.toBeTruthy(arg);
  }
}
