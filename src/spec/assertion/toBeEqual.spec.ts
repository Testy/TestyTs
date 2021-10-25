import { expect } from '../../lib/assertion/expect';
import { Test, TestSuite } from '../../testyCore';

@TestSuite('Expect ToBeEqual Test Suite')
export class ExpectToBeEqualTestSuite {
  @Test('\'a\' to equal \'a\'')
  public equal(): void {
    expect.toBeEqual('a', 'a');
  }

  @Test('\'a\' not to equal \'b\'')
  public notEqual(): void {
    expect.not.toBeEqual('a', 'b');
  }

  @Test('\'a\' to equal \'b\' to fail')
  public equalFails(): void {
    expect.toThrow(() => {
      expect.toBeEqual('a', 'b');
    });
  }

  @Test('\'a\' not to equal \'a\' to fail')
  public notEqualFails(): void {
    expect.toThrow(() => {
      expect.not.toBeEqual('a', 'a');
    });
  }

  @Test('\'NaN\' not to equal 0')
  public nanNotToEqualZero(): void {
    try {
      expect.toBeEqual(NaN, 0);
    } catch (err) {
      expect.toBeEqual(err.message, 'Expected NaN to equal 0.');
    }
  }

  @Test('\'{ a: 2 }\' to equal \'{ a: 2 }\' to be successful')
  public equalObjects(): void {
    // arrange
    const obj = { a: 2 };

    // assert
    expect.toBeEqual(obj, obj);
  }
}
