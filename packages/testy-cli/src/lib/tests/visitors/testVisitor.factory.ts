import { TestRunnerVisitor } from './testRunnerVisitor';
import {
  LoggerTestReporter,
  LoggerTestReporterDecoratorConfiguration,
} from './decorators/logger-test-reporter.decorator';
import { TestVisitor } from './testVisitor';
import { Report } from '../../reporting/report/report';
import { Logger } from '../../logger/logger';
import { TapTestReporter } from './decorators/tap-test-reporter.decorator';
import { TestyConfig } from '../../interfaces/config';

export type ReporterType = 'standard' | 'TAP';
type VisitorConstructor = (baseVisitor: TestVisitor<Report>, logger: Logger) => TestVisitor<Report>;

export class TestVisitorFactory {
  constructor(private logger: Logger) {
    // This is not an empty constructor!
  }

  public getRunner(config: TestyConfig) {
    let testRunnerVisitor: TestVisitor<Report> = new TestRunnerVisitor(process, config);
    const reporterConstructors: VisitorConstructor[] = [];

    if (config.reporters != null) {
      for (const reporter in config.reporters) {
        if (!config.reporters.hasOwnProperty(reporter)) {
          continue;
        }

        const reporterConfig = config.reporters[reporter];
        reporterConstructors.push(this.getReporterConstructor(reporter, reporterConfig));
      }
    }

    if (config.reporter != null) {
      this.logger.warn(
        'WARNING! The "reporter" configuration is deprecated. Prefer using the "reporters" configuration.'
      );
      reporterConstructors.push(this.getReporterConstructor(config.reporter || 'standard'));
    }

    // no reporter specified, use standard
    if (reporterConstructors.length === 0) {
      reporterConstructors.push(this.getReporterConstructor('standard'));
    }

    for (const reporterConstructor of reporterConstructors) {
      testRunnerVisitor = reporterConstructor(testRunnerVisitor, this.logger.create());
    }

    return testRunnerVisitor;
  }

  private getReporterConstructor(reporterName: string, config?: unknown): VisitorConstructor {
    if (reporterName === 'standard') {
      const c = config as LoggerTestReporterDecoratorConfiguration;
      return (baseVisitor, logger) => new LoggerTestReporter(baseVisitor, logger, c);
    }

    if (reporterName === 'TAP') {
      return (baseVisitor, logger) => new TapTestReporter(baseVisitor, logger);
    }

    throw new Error(`The ${reporterName} reporter is not supported.`);
  }
}
