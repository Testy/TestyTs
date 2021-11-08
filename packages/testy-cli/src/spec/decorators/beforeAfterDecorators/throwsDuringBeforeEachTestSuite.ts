import { TestCase } from '../../../lib/decorators/testCase.decorator';
import { BeforeEach, Test, TestSuite, XTest } from '../../../testyCore';

@TestSuite('Throws During Before Each Test Suite')
export class ThrowsDuringBeforeEachTestSuite {
  @BeforeEach()
  public beforeEach() {
    throw new Error('This should be handled.');
  }

  @Test('a')
  public a() {
    // I am not an empty method!
  }

  @Test('b')
  public b() {
    // I am not an empty method!
  }

  @Test('c')
  @TestCase('c.1')
  @TestCase('c.2')
  @TestCase('c.3')
  public c() {
    // I am not an empty method!
  }

  @XTest('d')
  public d() {
    // I am not an empty method!
  }
}
