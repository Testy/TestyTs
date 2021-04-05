import { Logger, Color } from '../../../logger/logger';
import { CompositeReport } from '../../../reporting/report/compositeReport';
import { FailedTestReport } from '../../../reporting/report/failedTestReport';
import { Report } from '../../../reporting/report/report';
import { TestResult } from '../../../reporting/report/testResult';
import { TestInstance } from '../../test';
import { TestSuiteInstance } from '../../testSuite';
import { TestVisitor } from '../testVisitor';
import { TestsVisitorDecorator } from './testsVisitorDecorator';
import { RootTestSuite } from '../../rootTestSuite';

export class LoggerTestReporterDecorator extends TestsVisitorDecorator<Report> {
  private justPrintedTestSuite: boolean;

  constructor(baseVisitor: TestVisitor<Report>, private logger: Logger) {
    super(baseVisitor);
  }

  public async visitTest(test: TestInstance): Promise<Report> {
    this.justPrintedTestSuite = false;
    const report = await this.baseVisitTest(test);

    let msg;
    if (report.result === TestResult.Success) {
      msg = `${this.logger.color('√', Color.Green)} ${this.logger.color(test.name, Color.Grey)}`;
    } else if (report instanceof FailedTestReport) {
      msg = this.logger.color(`x ${test.name} - ${report.message}`, Color.Red);
    } else {
      msg = `${this.logger.color('!', Color.Yellow)} ${this.logger.color(`${test.name}`, Color.Grey)}`;
    }

    this.logger.info(msg);

    return report;
  }

  public async visitTestSuite(tests: TestSuiteInstance): Promise<Report> {
    if (!this.justPrintedTestSuite) {
      this.logger.info();
      this.justPrintedTestSuite = true;
    }

    this.logger.info(tests.name);
    this.logger.increaseIndentation();

    const returnValue = await this.baseVisitTestSuite(tests);

    this.logger.decreaseIndentation();

    return returnValue;
  }

  public async visitRootTestSuite(tests: RootTestSuite): Promise<CompositeReport> {
    const report = (await this.visitTestSuite(tests)) as CompositeReport;

    this.logger.info();
    this.printSummary(report);

    return report;
  }

  private printSummary(tests: CompositeReport) {
    const success = tests.numberOfSuccessfulTests;
    const failed = tests.numberOfTests - tests.numberOfSuccessfulTests - tests.numberOfSkippedTests;
    const skipped = tests.numberOfSkippedTests;
    const total = tests.numberOfTests;

    this.logger.info(
      `Summary: ${success}/${total} passed, ${failed}/${total} failed, ${skipped}/${total} skipped. (${
        tests.duration / 1000
      }s)`
    );
  }
}
