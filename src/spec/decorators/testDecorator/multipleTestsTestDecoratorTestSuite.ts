import { Test } from '../../../testyCore';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';

@TestSuite('Multiple Test Test Decorator Test Suite')
export class MultipleTestTestDecoratorTestSuite {
  @Test('My first test')
  public test1() {
    // I am not an empty method
  }

  @Test('My second test')
  public test2() {
    // I am not an empty method
  }

  @Test('My third test')
  public test3() {
    // I am not an empty method
  }
}
