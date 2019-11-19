import { TestRunnerVisitor } from './testRunnerVisitor';
import { LoggerTestReporterDecorator } from './decorators/loggerTestReporterDecorator';
import { TestVisitor } from './testVisitor';
import { Report } from '../../reporting/report/report';
import { Logger } from '../../logger/logger';
import { TapTestReporterDecorator } from './decorators/tapTestReporterDecorator';

export type ReporterType = 'standard' | 'TAP';
type VisitorConstructor = (baseVisitor: TestVisitor<Report>, logger: Logger) => TestVisitor<Report>;

export class TestVisitorFactory {
    private reportersConstructors: Map<ReporterType, VisitorConstructor>;

    constructor(private logger: Logger) {
        this.reportersConstructors = new Map();
        this.reportersConstructors.set('standard', (baseVisitor, logger) => new LoggerTestReporterDecorator(baseVisitor, logger));
        this.reportersConstructors.set('TAP', (baseVisitor, logger) => new TapTestReporterDecorator(baseVisitor, logger));
    }

    public getRunner(reporterType: 'standard' | 'TAP') {
        let testRunnerVisitor: TestVisitor<Report> = new TestRunnerVisitor(process);

        const reporterConstructor = this.reportersConstructors.get(reporterType);

        if (!reporterConstructor)
            throw new Error(`The ${reporterType} reporter is not supported.`);

        testRunnerVisitor = reporterConstructor(testRunnerVisitor, this.logger);

        return testRunnerVisitor;
    }
}