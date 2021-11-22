import {
  CompositeReport,
  FailedTestReport,
  Logger,
  Report,
  SkippedTestReport,
  TestReporterDecoratorBase,
  TestStatus,
  TestVisitor,
} from '@testy/core';

export class GitHubActionsReporter extends TestReporterDecoratorBase {
  constructor(baseVisitor: TestVisitor<Report>, private logger: Logger) {
    super(baseVisitor);
  }

  protected beforeRoot(testName: string, testStatus: TestStatus): void | Promise<void> {
    // Do nothing
  }

  protected afterRoot(testName: string, testStatus: TestStatus, report: CompositeReport): void | Promise<void> {
    // Do nothing
  }

  protected beforeTestSuiteRun(testName: string, testStatus: TestStatus): void | Promise<void> {
    // Do nothing
  }

  protected afterTestSuiteRun(testName: string, testStatus: TestStatus, report: Report): void | Promise<void> {
    // Do nothing
  }

  protected beforeTestRun(testName: string, testStatus: TestStatus): void | Promise<void> {
    // Do nothing
  }

  protected afterTestRun(testName: string, testStatus: TestStatus, report: Report): void | Promise<Report> {
    if (report instanceof FailedTestReport) {
      this.printAnnotation('error', null, null, testName, report.message);
    } else if (report instanceof SkippedTestReport) {
      this.printAnnotation('warning', null, null, testName, null);
    }
  }

  private printAnnotation(
    type: 'warning' | 'error',
    file: string,
    line: number | null,
    title: string,
    message: string
  ) {
    console.log(`::${type} file=${file || ''},line=${line || ''},title=${title || ''}::${message}`);
  }
}
