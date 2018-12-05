import { TestsVisitor } from '../testVisitor';
import { Test } from '../../test';
import { TestSuite } from '../../testSuite';
import { Logger } from '../../../logger/logger';
import { Report } from '../../../reporting/report/report';
import { TestResult } from '../../../reporting/report/testResult';
import { FailedTestReport } from '../../../reporting/report/failedTestReport';
import { TestsVisitorDecorator } from './testsVisitorDecorator';

export class LoggerTestReporterDecorator extends TestsVisitorDecorator<Report> {

    constructor(baseVisitor: TestsVisitor<Report>, private logger: Logger) {
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

        return returnValue;
    }
}