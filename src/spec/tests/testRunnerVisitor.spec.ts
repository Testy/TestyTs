import { CompositeReport } from '../../lib/reporting/report/compositeReport';
import { FailedTestReport } from '../../lib/reporting/report/failedTestReport';
import { Report } from '../../lib/reporting/report/report';
import { SkippedTestReport } from '../../lib/reporting/report/skippedTestReport';
import { SuccessfulTestReport } from '../../lib/reporting/report/successfulTestReport';
import { TestInstance } from '../../lib/tests/test';
import { TestSuiteInstance } from '../../lib/tests/testSuite';
import { TestRunnerVisitor } from '../../lib/tests/visitors/testRunnerVisitor';
import { TestStatus } from '../../lib/testStatus';
import { BeforeEach, Test, TestSuite } from '../../testyCore';
import { getProcessMock, ProcessMock } from '../utils/processMock';
import { TestUtils } from '../utils/testUtils';

@TestSuite('Test Runner Visitor Tests')
export class TestRunnerVisitorTests {
  private testRunnerVisitor: TestRunnerVisitor;
  private processMock: ProcessMock;

  @BeforeEach()
  beforeEach() {
    this.processMock = getProcessMock();
    this.testRunnerVisitor = new TestRunnerVisitor(this.processMock, null);
  }

  @Test('Simple test suite')
  async simpleTestSuite() {
    // Arrange
    const root = new TestSuiteInstance();
    root.name = 'Root';
    root.set('A', new TestInstance('A', () => {}, TestStatus.Normal));
    root.set('B', new TestInstance('B', () => {}, TestStatus.Normal));

    // prettier-ignore
    const expected =
    report('Root', r => r
      .success('A')
      .success('B')
    );

    // Act
    const actual = await root.accept(this.testRunnerVisitor);

    // Assert
    TestUtils.expectReportsToBeEqual(actual, expected);
    this.processMock.expectSuccess();
  }

  @Test('Test suite with failure')
  async testSuiteWithFailure() {
    // Arrange
    const root = new TestSuiteInstance();
    root.name = 'Root';
    root.set('A', new TestInstance('A', () => {}, TestStatus.Normal));
    root.set(
      'B',
      new TestInstance(
        'B',
        () => {
          throw new Error('oops');
        },
        TestStatus.Normal
      )
    );

    // prettier-ignore
    const expected =
    report('Root', r => r
      .success('A')
      .failed('B', 'oops')
    );

    // Act
    const actual = await root.accept(this.testRunnerVisitor);

    // Assert
    TestUtils.expectReportsToBeEqual(actual, expected);
    this.processMock.expectFailure();
  }

  @Test('Test suite with skipped tests')
  async testSuiteWithSkippedTests() {
    // Arrange
    const root = new TestSuiteInstance();
    root.name = 'Root';
    root.set('A', new TestInstance('A', () => {}, TestStatus.Ignored));
    root.set('B', new TestInstance('B', () => {}, TestStatus.Normal));

    // prettier-ignore
    const expected =
      report('Root', r => r
        .skipped('A')
        .success('B')
      );

    // Act
    const actual = await root.accept(this.testRunnerVisitor);

    // Assert
    TestUtils.expectReportsToBeEqual(actual, expected);
    this.processMock.expectSuccess();
  }

  @Test('Skipped and focused')
  async skippedAndFocusedTests() {
    // Arrange
    const root = new TestSuiteInstance();
    root.name = 'Root';
    root.set('A', new TestInstance('A', () => {}, TestStatus.Normal));
    root.set('B', new TestInstance('B', () => {}, TestStatus.Normal));

    const sub1 = new TestSuiteInstance();
    sub1.name = 'Sub 1';
    sub1.status = TestStatus.Ignored;
    sub1.set('C', new TestInstance('C', () => {}, TestStatus.Normal));
    sub1.set('D', new TestInstance('D', () => {}, TestStatus.Normal));
    root.set('Sub 1', sub1);

    // prettier-ignore
    const expected =
      report('Root', r => r
        .success('A')
        .success('B')
        .subReport('Sub 1', sr => sr
          .skipped('C')
          .skipped('D')
        )
      );

    // Act
    const actual = await root.accept(this.testRunnerVisitor);

    // Assert
    TestUtils.expectReportsToBeEqual(actual, expected);
    this.processMock.expectSuccess();
  }
}

//#region Helpers

function report(name: string, instructions: (report: ReportBuilder) => ReportBuilder): Report {
  return instructions(_reportBuilder(new CompositeReport(name))).report;
}

function _reportBuilder(r: CompositeReport): ReportBuilder {
  return {
    report: r,
    success: (name: string, duration?: number) => {
      r.addReport(new SuccessfulTestReport(name, duration ?? 0));
      return _reportBuilder(r);
    },
    skipped: (name: string) => {
      r.addReport(new SkippedTestReport(name));
      return _reportBuilder(r);
    },
    failed: (name: string, reason?: string, stack?: string, duration?: number) => {
      r.addReport(new FailedTestReport(name, reason, stack, duration ?? 0));
      return _reportBuilder(r);
    },
    subReport: (name: string, descriptor: (subReport: ReportBuilder) => ReportBuilder) => {
      const subReport = report(name, descriptor);
      r.addReport(subReport);
      return _reportBuilder(r);
    },
  };
}

interface ReportBuilder {
  report: CompositeReport;
  success(name: string, duration?: number): ReportBuilder;
  skipped(name: string): ReportBuilder;
  failed(name: string, reason?: string, stack?: string, duration?: number): ReportBuilder;
  subReport(name: string, builder: (subReport: ReportBuilder) => ReportBuilder): ReportBuilder;
}

//#endregion
