import { expect, Test, TestSuite } from 'testyts';

@TestSuite()
export class MyTestSuite {
  @Test()
  public myTest() {
    // Act
    const [a, b] = this.foo();

    // Assert
    expect.toBeEqual(a + b, 2);
  }

  @Test()
  public myOtherTest() {
    // Act
    const [a, b] = this.foo();

    // Assert
    expect.toBeEqual(a + b, 3);
  }

  private foo(): [a: number, b: number] {
    return [1, 1];
  }
}
