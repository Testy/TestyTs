import { expect } from '../../lib/assertion/expect';
import { Test, TestSuite } from '../../testyCore';

@TestSuite('Expect ToThrow Test Suite')
export class ExpectToThrowTestSuite {
  @Test('error to throw')
  public errorToThrow(): void {
    expect.toThrow(() => {
      throw new Error('I threw.');
    });
  }

  @Test('no error to throw to fail')
  public noErrorToThrowToFail(): void {
    expect.toThrow(() => {
      expect.toThrow(() => {
        return;
      });
    });
  }

  @Test('error not to throw to fail')
  public errorNotToThrowToFail(): void {
    expect.toThrow(() => {
      expect.not.toThrow(() => {
        throw new Error('I threw.');
      });
    });
  }

  @Test('no error not to throw')
  public noErrorNotToThrow(): void {
    expect.not.toThrow(() => {
      return;
    });
  }

  @Test('error to throw async')
  public async errorToThrowAsync(): Promise<void> {
    await expect.toThrowAsync(async () => {
      throw new Error('I threw.');
    });
  }

  @Test('no error to throw to fail async')
  public async noErrorToThrowToFailAsync(): Promise<void> {
    await expect.toThrowAsync(async () => {
      await expect.toThrowAsync(async () => Promise.resolve(21));
    });
  }

  @Test('error not to throw to fail async')
  public async errorNotToThrowToFailAsync(): Promise<void> {
    await expect.toThrow(() => {
      expect.not.toThrow(() => {
        throw new Error('I threw.');
      });
    });
  }

  @Test('no error not to throw async')
  public async noErrorNotToThrowAsync(): Promise<void> {
    await expect.not.toThrow(async () => Promise.resolve(53));
  }
}
