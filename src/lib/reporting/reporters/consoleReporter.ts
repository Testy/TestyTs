import { ReporterVisitor } from './reporter';
import { CompositeReport } from '../report/compositeReport';
import { TestResult } from '../report/testResult';
import { Logger } from '../../logger/logger';
import { SuccessfulTestReport } from '../report/successfulTestReport';
import { FailedTestReport } from '../report/failedTestReport';
import { SkippedTestReport } from '../report/skippedTestReport';
import { RootReport } from '../report/rootReport';
import { Report } from '../report/report';

export class ConsoleReporter implements ReporterVisitor {

    constructor(private logger: Logger) { }

    public visitSuccesfulTestReport(report: SuccessfulTestReport) {
        this.logger.success(`√ ${report.name}`);
    }

    public visitFailedTestReport(report: FailedTestReport) {
        this.logger.failure(`x ${report.name} - ${report.message}`);
    }

    public visitSkippedTestReport(report: SkippedTestReport) {
        this.logger.info(report.name);
    }

    public visitCompositeReport(report: CompositeReport) {
        this.logger.info(report.name);
        this.logger.increaseIndentation();

        for (const child of report.getChildren().filter(x => x.result !== TestResult.Skipped)) {
            child.acceptReporter(this);
        }

        const ignoredTests = report.getChildren().filter(x => x.result === TestResult.Skipped);
        if (ignoredTests.length > 0) {
            this.logger.decreaseIndentation();
            this.logger.warn('\nSome tests were skipped.');
            this.logger.increaseIndentation();

            for (const child of ignoredTests) {
                child.acceptReporter(this);
            }
        }

        this.logger.decreaseIndentation();
    }

    public visitRootReport(report: RootReport) {
        this.logger.info('Tests started');
        this.visitCompositeReport(report);
        this.logger.info();

        const totalTests = report.numberOfTests;
        const successfulTests = report.numberOfSuccessfulTests;
        const skippedTests = report.numberOfSkippedTests;

        if (totalTests === successfulTests) {
            this.logger.success(`Test run successful.`);
        }
        else if (totalTests === successfulTests + skippedTests) {
            this.logger.warn(`Test run successful, but some tests were skipped.`);
        }
        else {
            this.logger.failure(`Test run failure.`);
        }

        this.reportStatistics(report);
    }

    private reportStatistics(report: Report) {
        const numberOfFailedTests = report.numberOfTests - report.numberOfSuccessfulTests - report.numberOfSkippedTests;
        this.logger.info(`${report.numberOfSuccessfulTests}/${report.numberOfTests} passed. ${numberOfFailedTests} failed. ${report.numberOfSkippedTests} skipped.`);
    }
}