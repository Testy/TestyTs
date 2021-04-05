import { Test } from '../../../testyCore';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';

@TestSuite('Single Test Test Decorator Test Suite')
export class SingleTestTestDecoratorTestSuite {
  public numberOfRunsTest1: number = 0;

  @Test('My single test')
  private test1() {
    ++this.numberOfRunsTest1;
  }
}
