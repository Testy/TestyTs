import { expect } from '../../lib/assertion/expect';
import { Test, TestSuite } from '../../testyCore';

@TestSuite('Expect ToMatch Tests')
export class ExpectToMatch {
  @Test("'hello' to match /[a-z]/, should succeed")
  public helloToMatchSuccess(): void {
    expect.toMatch('hello', /[a-z]/);
  }

  @Test("'hello' to match /[A-Z]/, should fail")
  public helloToMatchFail(): void {
    expect.toThrow(() => {
      expect.toMatch('hello', /[A-Z]/);
    });
  }

  @Test("'hello' not to match /[a-z]/, should fail")
  public helloNotToMatchFail(): void {
    expect.toThrow(() => {
      expect.not.toMatch('hello', /[a-z]/);
    });
  }

  @Test("'hello' not to match /[A-Z]/, should fail")
  public helloNotToMatchSuccess(): void {
    expect.not.toMatch('hello', /[A-Z]/);
  }
}
