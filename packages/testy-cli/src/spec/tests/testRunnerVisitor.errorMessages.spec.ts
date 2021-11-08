import { CompositeReport } from '../../lib/reporting/report/compositeReport';
import { FailedTestReport } from '../../lib/reporting/report/failedTestReport';
import { TestRunnerVisitor } from '../../lib/tests/visitors/testRunnerVisitor';
import { BeforeEach, Test, TestSuite } from '../../testyCore';
import { TestUtils } from '../utils/testUtils';
import { AsyncTestsFailures } from './visitors/asyncTestsFailures';
import { SyncTestsFailures } from './visitors/syncTestsFailures';
import { getProcessMock, ProcessMock } from '../utils/processMock';

@TestSuite('Test Runner Visitor Error Messages Tests')
export class TestRunnerVisitorErrorMessagesTests {
  private testRunnerVisitor: TestRunnerVisitor;
  private processMock: ProcessMock;

  @BeforeEach()
  beforeEach() {
    this.processMock = getProcessMock();
    this.testRunnerVisitor = new TestRunnerVisitor(this.processMock, null);
  }

  @Test('Asynchronous tests failures')
  async asyncTestsFailure() {
    // arrange
    const testSuite = TestUtils.getInstance(AsyncTestsFailures);

    const expectedReport = new CompositeReport('AsyncTestsFailures');
    expectedReport.addReport(new FailedTestReport('testA', 'Test has timed out.', null, 0));
    expectedReport.addReport(new FailedTestReport('testC', 'Some rejection message!', null, 0));
    expectedReport.addReport(new FailedTestReport('testD', 'Some error!', null, 0));

    // act
    const actualReport = await testSuite.accept(this.testRunnerVisitor);

    // assert
    TestUtils.expectReportsToBeEqual(actualReport, expectedReport);
    this.processMock.expectFailure();
  }

  @Test('Tests failures')
  async testsFailures() {
    // arrange
    const testSuite = TestUtils.getInstance(SyncTestsFailures);

    const expectedReport = new CompositeReport('SyncTestsFailures');
    expectedReport.addReport(new FailedTestReport('error', 'Some error!', null, 0));

    // act
    const actualReport = await testSuite.accept(this.testRunnerVisitor);

    // assert
    TestUtils.expectReportsToBeEqual(actualReport, expectedReport);
    this.processMock.expectFailure();
  }
}
