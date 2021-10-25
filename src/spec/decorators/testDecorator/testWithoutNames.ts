import { TestCase } from '../../../lib/decorators/testCase.decorator';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';
import { Test } from '../../../testyCore';

@TestSuite()
export class TestWithNoNamesTestSuite {
  @Test()
  public myTest1() {
    // I am not an empty method!
  }

  @Test()
  public myTest2() {
    // I am not an empty method!
  }

  @Test()
  @TestCase('myTestCase1')
  @TestCase('myTestCase2')
  @TestCase('myTestCase3')
  public myTest3() {
    // I am not an empty method!
  }
}
