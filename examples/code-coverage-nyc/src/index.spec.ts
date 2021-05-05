import { BeforeEach, expect, Test, TestSuite } from 'testyts';
import { Calculator } from './index';

@TestSuite()
export class MyTestClass {
  private calculator: Calculator | null = null;

  @BeforeEach()
  public beforeEach() {
    this.calculator = new Calculator();
  }

  @Test()
  public sum_onePlusThree_returnsFour() {
    // Arrange
    const a = 1;
    const b = 3;

    // Act
    const result = this.calculator?.sum(a, b);

    // Assert
    expect.toBeEqual(result, 4);
  }

  //// Uncomment this test to get 100% coverage
  // @Test()
  // public sum_throwIfBiggerThanThree_throws() {
  //   // Arrange
  //   const a = 1;
  //   const b = 3;
  //   const throwIfBiggerThan = 3;

  //   // Act
  //   // Assert
  //   expect.toThrow(() => this.calculator?.sum(a, b, throwIfBiggerThan));
  // }
}
