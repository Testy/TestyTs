import { expect, Test, TestSuite } from 'testyts';

@TestSuite()
export class MyTestSuite {
  @Test()
  public myTest() {
    // Act
    const value = global['my-setup-var'];

    // Assert
    expect.toBeEqual(value, 'I am set!', `Expected ${value} to equal "I am set!"`);
  }
}
