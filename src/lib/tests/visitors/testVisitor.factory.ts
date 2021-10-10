import { TestRunnerVisitor } from './testRunnerVisitor';
import { LoggerTestReporterDecorator } from './decorators/loggerTestReporterDecorator';
import { TestVisitor } from './testVisitor';
import { Report } from '../../reporting/report/report';
import { Logger } from '../../logger/logger';
import { TapTestReporterDecorator } from './decorators/tapTestReporterDecorator';
import { TestyConfig } from '../../interfaces/config';

export type ReporterType = 'standard' | 'TAP';
type VisitorConstructor = (baseVisitor: TestVisitor<Report>, logger: Logger) => TestVisitor<Report>;

export class TestVisitorFactory {
  constructor(private logger: Logger) {}

  public getRunner(config: TestyConfig) {
    let testRunnerVisitor: TestVisitor<Report> = new TestRunnerVisitor(process, config);
    const reporterConstructors: VisitorConstructor[] = [];

    if (config.reporters != null) {
      for (const reporter in config.reporters) {
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

    // No reporter specified, use standard
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
      return (baseVisitor, logger) => new LoggerTestReporterDecorator(baseVisitor, logger);
    }

    if (reporterName === 'TAP') {
      return (baseVisitor, logger) => new TapTestReporterDecorator(baseVisitor, logger);
    }

    throw new Error(`The ${reporterName} reporter is not supported.`);
  }
}
