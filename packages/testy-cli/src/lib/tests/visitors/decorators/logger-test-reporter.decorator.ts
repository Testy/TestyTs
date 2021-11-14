import { TestStatus } from 'testy-cli/src/lib/testStatus';
import { Color, Logger, TextDecoration } from '../../../logger/logger';
import { CompositeReport } from '../../../reporting/report/compositeReport';
import { FailedTestReport } from '../../../reporting/report/failedTestReport';
import { Report } from '../../../reporting/report/report';
import { TestResult } from '../../../reporting/report/testResult';
import { TestSuiteInstance } from '../../testSuite';
import { TestVisitor } from '../testVisitor';
import { TestReporterDecoratorBase } from './test-reporter-base.decorator';

export interface LoggerTestReporterDecoratorConfiguration {
  // Wether or not the reporter show display colors. Defaults to true.
  color: boolean;
}

export class LoggerTestReporter extends TestReporterDecoratorBase {
  private justPrintedTestSuite: boolean;

  constructor(
    baseVisitor: TestVisitor<Report>,
    private logger: Logger,
    private config: LoggerTestReporterDecoratorConfiguration
  ) {
    super(baseVisitor);
  }

  protected beforeRoot(testName: string, testStatus: TestStatus): void | Promise<void> {
    // Do nothing!
  }

  protected afterRoot(testName: string, testStatus: TestStatus, report: CompositeReport): void | Promise<void> {
    this.logger.info();
    this.printSummary(report);
  }
  protected beforeTestSuiteRun(testName: string, testStatus: TestStatus): void | Promise<void> {
    if (!this.justPrintedTestSuite) {
      this.logger.info();
      this.justPrintedTestSuite = true;
    }

    this.logger.info(this.format(testName, Color.Black, [TextDecoration.Bold]));
    this.logger.increaseIndentation();
  }

  protected afterTestSuiteRun(testName: string, testStatus: TestStatus, report: Report): void | Promise<void> {
    this.logger.decreaseIndentation();
  }

  protected beforeTestRun(testName: string, testStatus: TestStatus): void | Promise<void> {
    this.justPrintedTestSuite = false;
  }

  protected afterTestRun(testName: string, testStatus: TestStatus, report: Report): void | Promise<Report> {
    let title;
    const details: string[] = [];
    if (report.result === TestResult.Success) {
      title = `${this.format('√', Color.Green)} ${this.format(testName, Color.Grey)}`;
    } else if (report instanceof FailedTestReport) {
      title = this.format(`x ${testName} - ${report.message}`, Color.Red, [TextDecoration.Bold]);

      if (report.stack?.length) {
        details.push(...report.stack.split(/[\r\n|\n]/).map((x) => this.format(x, Color.Grey)));
      }
    } else {
      title = `${this.format('!', Color.Yellow)} ${this.format(`${testName}`, Color.Grey)}`;
    }

    this.logger.info(title);

    if (details.length) {
      this.logger.increaseIndentation();
      for (const detail of details) {
        this.logger.info(detail);
      }

      this.logger.decreaseIndentation();
    }
  }

  private printSummary(tests: CompositeReport) {
    const success = tests.numberOfSuccessfulTests;
    const failed = tests.numberOfTests - tests.numberOfSuccessfulTests - tests.numberOfSkippedTests;
    const skipped = tests.numberOfSkippedTests;
    const total = tests.numberOfTests;

    const successMsg = `${success}/${total} ${this.format('passed', success > 0 ? Color.Green : null)}`;
    const failedMsg = `${failed}/${total} ${this.format('failed', failed > 0 ? Color.Red : null)}`;
    const skippedMsg = `${skipped}/${total} ${this.format('skipped', skipped > 0 ? Color.Yellow : null)}`;

    this.logger.info(`Summary: ${successMsg}, ${failedMsg}, ${skippedMsg}. (${tests.duration / 1000}s)`);
  }

  private format(msg: string, color: Color, textDecorations?: TextDecoration[]): string {
    return this.config?.color === false ? msg : this.logger.format(msg, color, textDecorations);
  }
}
