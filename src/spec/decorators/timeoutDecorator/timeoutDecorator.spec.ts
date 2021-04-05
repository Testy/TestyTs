import { Test, TestSuite, expect, BeforeEach } from '../../../testyCore';
import { TestUtils } from '../../utils/testUtils';
import { TestSuiteWithTimeouts } from './testSuiteWithTimeouts';
import { TestRunnerVisitor } from '../../../lib/tests/visitors/testRunnerVisitor';
import { CompositeReport } from '../../../lib/reporting/report/compositeReport';
import { FailedTestReport } from '../../../lib/reporting/report/failedTestReport';
import { SuccessfulTestReport } from '../../../lib/reporting/report/successfulTestReport';
import { getProcessMock, ProcessMock } from '../../utils/processMock';

@TestSuite('Test suite with timeouts')
export class TestDecoratorTestSuite {
  private testRunnerVisitor: TestRunnerVisitor;
  private processMock: ProcessMock;

  @BeforeEach()
  beforeEach() {
    this.processMock = getProcessMock();
    this.testRunnerVisitor = new TestRunnerVisitor(this.processMock, null);
  }

  @Test('One successful test, one timeout')
  private async singleTest() {
    // Arrange
    const testSuite = TestUtils.getInstance(TestSuiteWithTimeouts);

    // Act
    const report = (await testSuite.accept(this.testRunnerVisitor)) as CompositeReport;
    const successfulTest = report.getChildren()[0];
    const failedTest = report.getChildren()[1];

    // Assert
    expect.toBeEqual(report.numberOfSuccessfulTests, 1);
    expect.toBeTrue(successfulTest instanceof SuccessfulTestReport);
    expect.toBeTrue(failedTest instanceof FailedTestReport);
    expect.toBeEqual((failedTest as FailedTestReport).message, 'Test has timed out.');
    this.processMock.expectFailure();
  }
}
