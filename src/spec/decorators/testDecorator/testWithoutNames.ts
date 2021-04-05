import { Test } from '../../../testyCore';
import { TestCaseInstance } from '../../../lib/testCaseInstance';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';
import { TestCase } from '../../../lib/decorators/testCase.decorator';

@TestSuite()
export class TestWithNoNamesTestSuite {
  @Test()
  private myTest1() {}

  @Test()
  private myTest2() {}

  @Test()
  @TestCase('myTestCase1')
  @TestCase('myTestCase2')
  @TestCase('myTestCase3')
  private myTest3() {}
}
