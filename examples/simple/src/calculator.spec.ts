import { BeforeEach, expect, Test, TestCase, TestSuite } from 'testyts';
import { Calculator } from './calculator';

@TestSuite()
export class CalculatorTests {
  private calculator: Calculator | null = null;

  @BeforeEach()
  public beforeEach() {
    this.calculator = new Calculator();
  }

  @Test('Sum - Some numbers - Returns expected value')
  @TestCase('Simple sum with integers', 100, 25, 25, 50)
  @TestCase('Simple sum with decimals', 0.5, 0.1, 0.4)
  public add_someNumbers_returnsExpectedSum(expectedSum: number, ...numbers: number[]) {
    // Act
    const actualSum = this.calculator?.sum(...numbers);

    // Assert
    expect.toBeEqual(actualSum, expectedSum);
  }
}
