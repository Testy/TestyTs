import { Logger, Report, TestReporterDecoratorBase, TestVisitor } from '@testy/core';
import { CompositeReport } from 'testy-cli/src/lib/reporting/report/compositeReport';
import { TestStatus } from 'testy-cli/src/lib/testStatus';

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
    // Do nothing
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
