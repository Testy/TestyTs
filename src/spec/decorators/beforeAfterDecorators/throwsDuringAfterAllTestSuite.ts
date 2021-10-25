import { TestCase } from '../../../lib/decorators/testCase.decorator';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';
import { AfterAll, Test, XTest } from '../../../testyCore';

@TestSuite('Throws During After All Test Suite ')
export class ThrowsDuringAfterAllTestSuite {
  @AfterAll()
  public afterAll() {
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
