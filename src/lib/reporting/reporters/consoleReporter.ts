import { ReporterVisitor } from './reporter';
import { CompositeReport } from '../report/compositeReport';
import { TestResult } from '../report/testResult';
import { Logger } from '../../logger/logger';
import { SuccessfulTestReport } from '../report/successfulTestReport';
import { FailedTestReport } from '../report/failedTestReport';
import { SkippedTestReport } from '../report/skippedTestReport';

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
            this.logger.warn('Some tests were skipped.');
            this.logger.increaseIndentation();

            for (const child of ignoredTests) {
                child.acceptReporter(this);
            }
        }

        this.logger.decreaseIndentation();
    }
}