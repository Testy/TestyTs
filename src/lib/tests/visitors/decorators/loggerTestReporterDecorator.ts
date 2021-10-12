import { Color, Logger, TextDecoration } from '../../../logger/logger';
import { CompositeReport } from '../../../reporting/report/compositeReport';
import { FailedTestReport } from '../../../reporting/report/failedTestReport';
import { Report } from '../../../reporting/report/report';
import { TestResult } from '../../../reporting/report/testResult';
import { RootTestSuite } from '../../rootTestSuite';
import { TestInstance } from '../../test';
import { TestSuiteInstance } from '../../testSuite';
import { TestVisitor } from '../testVisitor';
import { TestsVisitorDecorator } from './testsVisitorDecorator';

export interface LoggerTestReporterDecoratorConfiguration {
  /** Wether or not the reporter show display colors. Defaults to true. */
  color: boolean;
}

export class LoggerTestReporterDecorator extends TestsVisitorDecorator<Report> {
  private justPrintedTestSuite: boolean;

  constructor(
    baseVisitor: TestVisitor<Report>,
    private logger: Logger,
    private config: LoggerTestReporterDecoratorConfiguration
  ) {
    super(baseVisitor);
  }

  public async visitTest(test: TestInstance): Promise<Report> {
    this.justPrintedTestSuite = false;
    const report = await this.baseVisitTest(test);

    let title;
    const details: string[] = [];
    if (report.result === TestResult.Success) {
      title = `${this.format('√', Color.Green)} ${this.format(test.name, Color.Grey)}`;
    } else if (report instanceof FailedTestReport) {
      title = this.format(`x ${test.name} - ${report.message}`, Color.Red, [TextDecoration.Bold]);

      if (report.stack?.length) {
        details.push(...report.stack.split(/[\r\n|\n]/).map((x) => this.format(x, Color.Grey)));
      }
    } else {
      title = `${this.format('!', Color.Yellow)} ${this.format(`${test.name}`, Color.Grey)}`;
    }

    this.logger.info(title);

    if (details.length) {
      this.logger.increaseIndentation();
      for (const detail of details) {
        this.logger.info(detail);
      }

      this.logger.decreaseIndentation();
    }

    return report;
  }

  public async visitTestSuite(tests: TestSuiteInstance): Promise<Report> {
    if (!this.justPrintedTestSuite) {
      this.logger.info();
      this.justPrintedTestSuite = true;
    }

    this.logger.info(this.format(tests.name, Color.Black, [TextDecoration.Bold]));
    this.logger.increaseIndentation();

    const returnValue = await this.baseVisitTestSuite(tests);

    this.logger.decreaseIndentation();

    return returnValue;
  }

  public async visitRootTestSuite(tests: RootTestSuite): Promise<CompositeReport> {
    const report = (await this.baseVisitRootTestSuite(tests)) as CompositeReport;

    this.logger.info();
    this.printSummary(report);

    return report;
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
