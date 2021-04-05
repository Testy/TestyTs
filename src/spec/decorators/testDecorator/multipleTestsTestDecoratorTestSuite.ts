import { Test } from '../../../testyCore';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';

@TestSuite('Multiple Test Test Decorator Test Suite')
export class MultipleTestTestDecoratorTestSuite {
  @Test('My first test')
  private test1() {}

  @Test('My second test')
  private test2() {}

  @Test('My third test')
  private test3() {}
}
