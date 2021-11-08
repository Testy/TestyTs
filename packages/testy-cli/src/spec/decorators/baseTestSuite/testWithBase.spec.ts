import { expect } from '../../../lib/assertion/expect';
import { Test, TestSuite } from '../../../testyCore';
import { TestSuiteTestsBase } from '../../utils/testSuiteTestsBase';
import { TestUtils } from '../../utils/testUtils';
import { TestSuiteA, TestSuiteB } from './baseWithChildren';
import { BaseTestSuite, TestSuiteWithBase } from './testSuiteWithBase';

@TestSuite('Test Suite With Base Test Suite Tests')
export class BeforeAfterDecoratorsTestSuite extends TestSuiteTestsBase {
  @Test('the base and the actual test suite before and after methods are called.')
  public async trivialCase() {
    // arrange
    const testSuite = TestUtils.getInstance(TestSuiteWithBase);

    // act
    await testSuite.accept(this.visitor);

    // assert
    expect.toBeEqual(testSuite.context.beforeAllExecuted[0], BaseTestSuite);
    expect.toBeEqual(testSuite.context.beforeAllExecuted[1], TestSuiteWithBase);
    expect.toBeEqual(testSuite.context.beforeEachExecuted[0], BaseTestSuite);
    expect.toBeEqual(testSuite.context.beforeEachExecuted[1], TestSuiteWithBase);
    expect.toBeEqual(testSuite.context.afterEachExecuted[0], BaseTestSuite);
    expect.toBeEqual(testSuite.context.afterEachExecuted[1], TestSuiteWithBase);
    expect.toBeEqual(testSuite.context.afterAllExecuted[0], BaseTestSuite);
    expect.toBeEqual(testSuite.context.afterAllExecuted[1], TestSuiteWithBase);
  }

  @Test('base with multiple children')
  public async baseWithMultipleChildren() {
    // arrange
    const a = TestUtils.getInstance(TestSuiteA);
    const b = TestUtils.getInstance(TestSuiteB);

    // assert
    expect.arraysToBeEqual(a.testIds, ['testA']);
    expect.arraysToBeEqual(b.testIds, ['testB']);
  }
}
