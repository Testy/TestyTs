import { Logger } from '../../../logger/logger';
import { CompositeReport } from '../../../reporting/report/compositeReport';
import { FailedTestReport } from '../../../reporting/report/failedTestReport';
import { Report } from '../../../reporting/report/report';
import { TestResult } from '../../../reporting/report/testResult';
import { TestInstance } from '../../test';
import { TestSuiteInstance } from '../../testSuite';
import { TestVisitor } from '../testVisitor';
import { TestsVisitorDecorator } from './testsVisitorDecorator';
import { RootTestSuite } from '../../rootTestSuite';

export class LoggerTestReporterDecorator extends TestsVisitorDecorator<Report> {

    constructor(baseVisitor: TestVisitor<Report>, private logger: Logger) {
        super(baseVisitor);
    }

    public async visitTest(test: TestInstance): Promise<Report> {
        const report = await this.baseVisitTest(test);

        if (report.result === TestResult.Success) {
            this.logger.success(`√ ${test.name}`);
        }
        else if (report instanceof FailedTestReport) {
            this.logger.failure(`x ${test.name} - ${report.message}`);
        }
        else {
            this.logger.warn(`! ${test.name}`);
        }

        return report;
    }

    public async visitTestSuite(tests: TestSuiteInstance): Promise<Report> {
        this.logger.info(tests.name);
        this.logger.increaseIndentation();

        const returnValue = await this.baseVisitTestSuite(tests);

        this.logger.decreaseIndentation();

        return returnValue;
    }

    public async visitRootTestSuite(tests: RootTestSuite): Promise<CompositeReport> {
        const report = await this.visitTestSuite(tests) as CompositeReport;

        this.logger.info();
        this.printSummary(report);

        return report;
    }

    private printSummary(tests: CompositeReport) {
        const success = tests.numberOfSuccessfulTests;
        const failed = tests.numberOfTests - tests.numberOfSuccessfulTests;
        const skipped = tests.numberOfSkippedTests;
        const total = tests.numberOfTests;

        this.logger.info(`Summary: ${success}/${total} passed, ${failed}/${total} failed, ${skipped}/${total} skipped.`);
    }
}