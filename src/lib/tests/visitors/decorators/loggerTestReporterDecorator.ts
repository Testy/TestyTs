import { TestVisitor } from '../testVisitor';
import { Test } from '../../test';
import { TestSuite } from '../../testSuite';
import { Logger } from '../../../logger/logger';
import { Report } from '../../../reporting/report/report';
import { TestResult } from '../../../reporting/report/testResult';
import { FailedTestReport } from '../../../reporting/report/failedTestReport';
import { TestsVisitorDecorator } from './testsVisitorDecorator';

export class LoggerTestReporterDecorator extends TestsVisitorDecorator<Report> {

    constructor(baseVisitor: TestVisitor<Report>, private logger: Logger) {
        super(baseVisitor);
    }

    public async visitTest(test: Test): Promise<Report> {
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

    public async visitTestSuite(tests: TestSuite): Promise<Report> {
        this.logger.info(tests.name);
        this.logger.increaseIndentation();

        const returnValue = await this.baseVisitTestSuite(tests);

        this.logger.decreaseIndentation();

        if (tests instanceof RootTestSuite) {
            this.logger.info();
            this.printSummary(returnValue as CompositeReport);
        }

        return returnValue;
    }

    private printSummary(tests: CompositeReport) {
        const success = tests.numberOfSuccessfulTests;
        const failed = tests.numberOfTests - tests.numberOfSuccessfulTests;
        const skipped = tests.numberOfSkippedTests;
        const total = tests.numberOfTests;

        this.logger.info(`Summary: ${success}/${total} passed, ${failed}/${total} failed, ${skipped}/${total} skipped.`);
    }
}