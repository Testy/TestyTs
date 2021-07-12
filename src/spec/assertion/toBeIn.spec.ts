import { expect } from '../../lib/assertion/expect';
import { Test, TestSuite } from '../../testyCore';

@TestSuite('Expect ToBeIn Tests')
export class ExpectToMatch {
  @Test(`'a' to be in, should succeed`)
  public aToBeInSuccess() {
    expect.toBeIn('a', ['a', 'b', 'c']);
  }

  @Test(`'a' to be in ReadonlyArray, should succeed`)
  public aToBeInReadonlySuccess() {
    const readonlyArray: readonly string[] = ['a', 'b', 'c'];
    expect.toBeIn('a', readonlyArray);
  }

  @Test(`'a' to be in, should fail`)
  public aToBeInFail() {
    expect.toThrow(() => {
      expect.toBeIn('a', ['b', 'c', 'd']);
    });
  }

  @Test(`'a' not to be in, should fail`)
  public aNotToBeInFail() {
    expect.toThrow(() => {
      expect.not.toBeIn('a', ['a', 'b', 'c']);
    });
  }

  @Test(`'a' not to be in, should succeed`)
  public aNotToBeInSuccess() {
    expect.not.toBeIn('a', ['b', 'c', 'd']);
  }
}
