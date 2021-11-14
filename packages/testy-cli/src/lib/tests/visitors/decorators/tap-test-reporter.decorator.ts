import { CompositeReport } from 'testy-cli/src/lib/reporting/report/compositeReport';
import { TestStatus } from 'testy-cli/src/lib/testStatus';
import { Logger } from '../../../logger/logger';
import { FailedTestReport } from '../../../reporting/report/failedTestReport';
import { Report } from '../../../reporting/report/report';
import { TestResult } from '../../../reporting/report/testResult';
import { TestVisitor } from '../testVisitor';
import { TestReporterDecoratorBase } from './test-reporter-base.decorator';

export class TapTestReporter extends TestReporterDecoratorBase {
  private counter = 1;

  constructor(baseVisitor: TestVisitor<Report>, private logger: Logger) {
    super(baseVisitor);
  }

  protected beforeRoot(testName: string, testStatus: TestStatus): void | Promise<void> {
    // Do nothing!
  }

  protected afterRoot(testName: string, testStatus: TestStatus, report: CompositeReport): void | Promise<void> {
    this.logger.info(`1..${report.numberOfTests - report.numberOfSkippedTests}`);
  }

  protected beforeTestRun(testName: string, testStatus: TestStatus): void | Promise<void> {
    // Do nothing
  }

  protected beforeTestSuiteRun(testName: string, testStatus: TestStatus): void | Promise<void> {
    this.logger.info(`# ${testName}`);
  }

  protected afterTestSuiteRun(testName: string, testStatus: TestStatus, report: Report): void | Promise<void> {
    // Do nothing!
  }

  protected afterTestRun(testName: string, testStatus: TestStatus, report: Report): void | Promise<Report> {
    let msg: string;
    const safeName = testName.replace('#', '');
    if (report.result === TestResult.Success) {
      msg = `ok ${this.counter} ${safeName}`;
    } else if (report instanceof FailedTestReport) {
      msg = `not ok ${this.counter} ${safeName}`;
    } else {
      msg = `ok ${this.counter} ${safeName} # SKIP`;
    }

    this.logger.info(msg);

    this.counter += 1;
  }
}
